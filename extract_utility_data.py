import pandas as pd
import json
from datetime import datetime

# Utility Performance files (Monday-Friday)
utility_files = [
    ('data/week33/Utility Performance/Breakdown report - Utility Section 09-02-2026.xlsx', 'Mon'),
    ('data/week33/Utility Performance/Breakdown report - Utility Section 10-02-2026.xlsx', 'Tue'),
    ('data/week33/Utility Performance/Breakdown report - Utility Section 11-02-2026.xlsx', 'Wed'),
    ('data/week33/Utility Performance/Breakdown report - Utility Section 12-02-2026.xlsx', 'Thu'),
    ('data/week33/Utility Performance/Breakdown report - Utility Section 13-02-2026.xlsx', 'Fri'),
]

daily_data = {}
all_breakdowns = []
friday_status = {}

for file_path, day in utility_files:
    print(f"\n{'='*80}")
    print(f"Processing {day}: {file_path}")
    print('='*80)
    
    try:
        df = pd.read_excel(file_path, header=None)
        
        # Find the data section (look for "Area/Owner" header)
        header_row = None
        for idx, row in df.iterrows():
            if pd.notna(row[1]) and 'Area' in str(row[1]):
                header_row = idx
                break
        
        if header_row is None:
            print(f"Could not find header row in {file_path}")
            continue
        
        # Extract data starting from header row
        data_df = df.iloc[header_row+1:].copy()
        data_df.columns = df.iloc[header_row].values
        
        # Count available and unavailable by area
        area_counts = {}
        
        for idx, row in data_df.iterrows():
            area = row.get('Area/Owner', row.get(df.iloc[header_row, 1]))
            status = row.get('Status', row.get(df.iloc[header_row, 4]))
            tmm_no = row.get('TMM No.', row.get(df.iloc[header_row, 3]))
            model = row.get('Model', row.get(df.iloc[header_row, 5]))
            
            if pd.isna(area) or str(area).strip() == '':
                continue
            
            area = str(area).strip()
            
            if area not in area_counts:
                area_counts[area] = {'available': 0, 'unavailable': 0, 'total': 0}
            
            area_counts[area]['total'] += 1
            
            if pd.notna(status):
                status_str = str(status).strip().lower()
                if 'not available' in status_str or 'unavailable' in status_str:
                    area_counts[area]['unavailable'] += 1
                    
                    # Collect breakdown details
                    if pd.notna(tmm_no) and pd.notna(model):
                        breakdown = {
                            'area': area,
                            'tmmNo': str(tmm_no).strip(),
                            'model': str(model).strip(),
                            'day': day,
                            'status': status_str
                        }
                        all_breakdowns.append(breakdown)
                        
                        # Store Friday status for current status slide
                        if day == 'Fri':
                            if area not in friday_status:
                                friday_status[area] = []
                            friday_status[area].append({
                                'unit': str(tmm_no).strip(),
                                'reason': status_str
                            })
                else:
                    area_counts[area]['available'] += 1
        
        daily_data[day] = area_counts
        
        print(f"\n{day} Summary:")
        for area, counts in area_counts.items():
            print(f"  {area}: {counts['available']}/{counts['total']} available ({counts['unavailable']} unavailable)")
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

# Aggregate data for reportData.ts format
print("\n" + "="*80)
print("AGGREGATED UTILITY DATA FOR REPORTDATA.TS")
print("="*80)

# Calculate weekly averages per area
areas = set()
for day_data in daily_data.values():
    areas.update(day_data.keys())

daily_tracking = []
total_available = 0
total_unavailable = 0

for area in sorted(areas):
    area_tracking = {'area': area}
    
    for day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']:
        if day in daily_data and area in daily_data[day]:
            avail = daily_data[day][area]['available']
            total = daily_data[day][area]['total']
            unavail = daily_data[day][area]['unavailable']
            
            # Determine color
            pct = (avail / total * 100) if total > 0 else 0
            if pct >= 85:
                color = 'green'
            elif pct >= 80:
                color = 'yellow'
            else:
                color = 'red'
            
            area_tracking[day.lower()] = {
                'available': avail,
                'total': total,
                'color': color
            }
            
            if day == 'Fri':
                total_available += avail
                total_unavailable += unavail
        else:
            area_tracking[day.lower()] = {'available': 0, 'total': 0, 'color': 'red'}
    
    # Calculate weekly average
    week_total = sum([daily_data[d][area]['total'] for d in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] if d in daily_data and area in daily_data[d]])
    week_avail = sum([daily_data[d][area]['available'] for d in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] if d in daily_data and area in daily_data[d]])
    
    weekly_avg = (week_avail / week_total * 100) if week_total > 0 else 0
    area_tracking['weeklyAvg'] = round(weekly_avg, 1)
    
    daily_tracking.append(area_tracking)

# Prepare breakdown summary (top issues)
breakdown_summary = []
breakdown_counts = {}

for bd in all_breakdowns:
    key = f"{bd['tmmNo']}_{bd['area']}"
    if key not in breakdown_counts:
        breakdown_counts[key] = bd
        breakdown_counts[key]['days'] = 1
    else:
        breakdown_counts[key]['days'] += 1

# Get top 5 breakdowns by frequency
top_breakdowns = sorted(breakdown_counts.values(), key=lambda x: x['days'], reverse=True)[:5]

for bd in top_breakdowns:
    breakdown_summary.append({
        'area': bd['area'],
        'tmmNo': bd['tmmNo'],
        'model': bd['model'],
        'description': bd['status'],
        'remarks': f"Down for {bd['days']} day(s) this week"
    })

# Prepare current status (Friday)
area_status = []
for area in sorted(friday_status.keys()):
    area_status.append({
        'area': area,
        'unavailable': len(friday_status[area]),
        'details': friday_status[area]
    })

utility_data = {
    'fleetStatus': {
        'available': total_available,
        'unavailable': total_unavailable
    },
    'dailyTracking': daily_tracking,
    'breakdowns': breakdown_summary,
    'oemAssistanceRequired': sum(1 for bd in breakdown_summary if 'oem' in bd['description'].lower()),
    'utilitySectionCurrentStatus': {
        'totalUnavailable': total_unavailable,
        'areaStatus': area_status
    }
}

print("\nUtility Data Summary:")
print(json.dumps(utility_data, indent=2))

# Save to file
with open('utility_week33_data.json', 'w') as f:
    json.dump(utility_data, f, indent=2)

print("\n" + "="*80)
print("Data saved to utility_week33_data.json")
print("="*80)
