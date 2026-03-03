import zipfile, xml.etree.ElementTree as ET, re, csv

SHIFT_START = 6 * 60    # 06:00 = 360 min from midnight
SHIFT_END   = 14 * 60   # 14:00 = 840 min
SHIFT_DUR   = SHIFT_END - SHIFT_START  # 480 min

def parse_hhmm(s):
    s = s.strip()
    if re.match(r'SOS', s, re.IGNORECASE): return SHIFT_START
    if re.match(r'EOS', s, re.IGNORECASE): return SHIFT_END
    m = re.match(r'(\d{1,2}):(\d{2})', s)
    if m: return int(m.group(1)) * 60 + int(m.group(2))
    return None

def calc_avail(remarks, is_unavailable):
    """
    Return (day_shift_frac, daily_frac) based on status and remarks.

    Rules (3-shift operation, only day-shift data available):
    - Not Available at EOS (red):  afternoon + night assumed 0%
        daily = (day_shift + 0 + 0) / 3 = day_shift / 3
    - Partial, fixed at EOS (green with downtime): afternoon + night assumed 100%
        daily = (day_shift + 100 + 100) / 3
    - Fully available (green, no downtime):
        daily = 100%
    """
    pattern = r'(?:SOS|(?:\d{1,2}:\d{2}))\s*[-]\s*(?:EOS|(?:\d{1,2}:\d{2}))'
    total_down = 0
    for m in re.finditer(pattern, remarks, re.IGNORECASE):
        parts = re.split(r'\s*[-]\s*', m.group(0), maxsplit=1)
        if len(parts) == 2:
            t_start = parse_hhmm(parts[0])
            t_end   = parse_hhmm(parts[1])
            if t_start is not None and t_end is not None:
                t_start = max(t_start, SHIFT_START)
                t_end   = min(t_end,   SHIFT_END)
                if t_end > t_start:
                    total_down += t_end - t_start

    if is_unavailable:
        # Still broken at EOS — other shifts also 0%
        if total_down == 0:
            day_frac = 0.0   # SOS-EOS or no parseable range = full shift down
        else:
            day_frac = max(0.0, (SHIFT_DUR - total_down) / SHIFT_DUR)
        daily_frac = day_frac / 3.0
    else:
        if total_down == 0:
            # Fully available all day
            day_frac   = 1.0
            daily_frac = 1.0
        else:
            # Fixed at EOS — afternoon + night = 100%
            day_frac   = max(0.0, (SHIFT_DUR - total_down) / SHIFT_DUR)
            daily_frac = (day_frac + 2.0) / 3.0

    return day_frac, daily_frac

def get_strings(zf):
    try:
        with zf.open('xl/sharedStrings.xml') as f:
            root = ET.parse(f).getroot()
        ns = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'
        out = []
        for si in root.findall(f'.//{{{ns}}}si'):
            out.append(''.join(t.text or '' for t in si.iter(f'{{{ns}}}t')))
        return out
    except:
        return []

def get_sheet_path(zf, name):
    ns_r   = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    ns_rel = 'http://schemas.openxmlformats.org/package/2006/relationships'
    ns_m   = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'
    with zf.open('xl/workbook.xml') as f:
        wb = ET.parse(f).getroot()
    with zf.open('xl/_rels/workbook.xml.rels') as f:
        rels = {r.get('Id'): r.get('Target')
                for r in ET.parse(f).getroot().findall(f'{{{ns_rel}}}Relationship')}
    for s in wb.findall(f'.//{{{ns_m}}}sheet'):
        if s.get('name') == name:
            return f"xl/{rels[s.get(f'{{{ns_r}}}id')]}"

def read_cells(zf, path):
    shared = get_strings(zf)
    ns = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'
    with zf.open(path) as f:
        root = ET.parse(f).getroot()
    cells = {}
    for row in root.findall(f'.//{{{ns}}}row'):
        rn = int(row.get('r', 0))
        for cell in row.findall(f'{{{ns}}}c'):
            m2 = re.match(r'([A-Z]+)(\d+)', cell.get('r', ''))
            if not m2: continue
            t = cell.get('t')
            v = cell.find(f'{{{ns}}}v')
            if v is None: continue
            val = v.text
            if t == 's':
                try: val = shared[int(val)]
                except: pass
            cells[(rn, m2.group(1))] = val
    return cells

daily_files = [
    ('Monday',    'Monday Utility Section 23-02-2026',    'Utility TMM Breakdown Report - 23022026.xlsx', '23 Feb 2026'),
    ('Tuesday',   'Tuesday Utility Section 24-02-2026',   'Utility TMM Breakdown Report - 24022026.xlsx', '24 Feb 2026'),
    ('Wednesday', 'Wednesday Utility Section 25-02-2026', 'Utility TMM Breakdown Report - 25022026.xlsx', '25 Feb 2026'),
    ('Thursday',  'Thursday Utility Section 26-02-2026',  'Utility TMM Breakdown Report - 26022026.xlsx', '26 Feb 2026'),
    ('Friday',    'Friday Utility Section 27-02-2026',    'Utility TMM Breakdown Report - 27022026.xlsx', '27 Feb 2026'),
]

all_breakdowns      = []
all_availability    = []
last_day_breakdowns = []

for day_name, label, fname, sheet_name in daily_files:
    with zipfile.ZipFile(fname) as zf:
        path  = get_sheet_path(zf, sheet_name)
        cells = read_cells(zf, path)

    # Right-side summary block (rows 3-20, columns H-K)
    type_rows = []
    for r in range(3, 20):
        vtype = cells.get((r, 'H'), '').strip()
        total = cells.get((r, 'I'), '').strip()
        bkdn  = cells.get((r, 'J'), '').strip()
        avail = cells.get((r, 'K'), '').strip()
        if vtype and total and bkdn:
            try:
                type_rows.append({
                    'type':       vtype,
                    'total':      int(float(total)),
                    'bkdn':       int(float(bkdn)),
                    'avail_orig': round(float(avail) * 100, 1) if avail else 0,
                })
            except:
                pass

    # All individual vehicle rows (col A = sequential number, col C = TMM No)
    vehicles = []
    for r in range(3, 200):
        num    = cells.get((r, 'A'), '').strip()
        tmm    = cells.get((r, 'C'), '').strip()
        owner  = cells.get((r, 'B'), '').strip()
        status = cells.get((r, 'D'), '').strip()
        remark = cells.get((r, 'E'), '').strip()
        oem    = cells.get((r, 'F'), '').strip()
        if not tmm or not re.match(r'^\d+$', num):
            continue
        is_unavail = 'not available' in status.lower()
        day_frac, daily_frac = calc_avail(remark, is_unavail)
        vehicles.append({
            'tmm': tmm, 'owner': owner, 'status': status,
            'remark': remark, 'oem': oem,
            'is_unavail': is_unavail, 'day_frac': day_frac, 'daily_frac': daily_frac,
        })

    total_veh     = len(vehicles)
    sum_avail     = sum(v['daily_frac'] for v in vehicles)
    corrected_pct = round(sum_avail / total_veh * 100, 1) if total_veh else 0
    full_breakdowns = sum(1 for v in vehicles if v['is_unavail'])

    print(f"\n{label}")
    print(f"  Vehicles: {total_veh}  |  Full breakdowns: {full_breakdowns}  |  Corrected availability: {corrected_pct}%")

    # Breakdowns + partial entries
    for v in vehicles:
        if v['is_unavail']:
            row = [label, v['owner'], v['tmm'], '', 'Not Available', v['remark'], v['oem']]
            all_breakdowns.append(row)
            if day_name == 'Friday':
                last_day_breakdowns.append(row)
            print(f"  NOT AVAIL : {v['tmm']} ({v['owner']}) — {v['remark'][:65]}")
        elif v['day_frac'] < 1.0 and v['remark'].strip():
            pct = round(v['day_frac'] * 100, 1)
            row = [label, v['owner'], v['tmm'], '', f'Partial ({pct}%)', v['remark'], v['oem']]
            all_breakdowns.append(row)
            if day_name == 'Friday':
                last_day_breakdowns.append(row)
            print(f"  PARTIAL {pct:5.1f}%: {v['tmm']} ({v['owner']}) — {v['remark'][:65]}")

    # Availability CSV rows
    for t in type_rows:
        if t['type'] == 'TOTAL':
            all_availability.append([label, 'TOTAL', total_veh, full_breakdowns, corrected_pct])
        else:
            all_availability.append([label, t['type'], t['total'], t['bkdn'], t['avail_orig']])

print(f"\n\nSummary: {len(all_breakdowns)} breakdown/partial entries | {len(all_availability)} availability rows")

with open('Utility_Section_All_Breakdowns_Week35.csv', 'w', newline='', encoding='utf-8') as f:
    csv.writer(f).writerows(
        [['Date', 'Area_Owner', 'TMM_No', 'Model', 'Status', 'Remarks', 'OEM_Assistance']]
        + all_breakdowns)

with open('Utility_Section_Current_Status_Week35.csv', 'w', newline='', encoding='utf-8') as f:
    csv.writer(f).writerows(
        [['Date', 'Area_Owner', 'TMM_No', 'Model', 'Status', 'Remarks', 'OEM_Assistance']]
        + last_day_breakdowns)

with open('Utility_Section_Weekly_Availability_Week35.csv', 'w', newline='', encoding='utf-8') as f:
    csv.writer(f).writerows(
        [['Date', 'Vehicle_Type', 'Total', 'Breakdowns', 'Availability_Pct']]
        + all_availability)

print("CSVs written.")
