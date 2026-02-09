"""
BEV Data Extractor

Parses BEV-specific CSVs:
  - Unit availability (DTe + FLe in same file, no headers)
  - Delays/breakdowns (hierarchical format, no headers)
  - Monthly and weekly trend data
"""
import csv
from pathlib import Path
import re


def parse_percentage(val: str) -> float:
    """Parse percentage string like '100.00%' to float."""
    if not val:
        return 0.0
    cleaned = val.strip().replace("%", "")
    try:
        return float(cleaned)
    except ValueError:
        return 0.0


def extract_unit_availability(data_dir: Path, week: int) -> dict:
    """
    Parse BEV unit availability CSVs.
    DTe and FLe files are identical - contain both fleet types.
    No header row. Format: FleetType, UnitID, Availability%
    """
    # Try DTe file first (contains both DTe and FLe)
    patterns = [
        f"N3 BEV DTe Availability by Unit - Week{week}.csv",
        f"N3 BEV FLe Availability by Unit - Week{week}.csv",
    ]

    filepath = None
    for pattern in patterns:
        p = data_dir / pattern
        if p.exists():
            filepath = p
            break

    if not filepath:
        print("    Unit availability: NOT FOUND")
        return {"dt": [], "fl": []}

    print(f"    Unit availability: {filepath.name}")
    dt_units = []
    fl_units = []

    with open(filepath, "r") as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) < 3:
                continue
            fleet_type = row[0].strip()
            unit_id = row[1].strip()
            avail = parse_percentage(row[2])

            entry = {"id": unit_id, "availability": round(avail, 2)}
            if fleet_type == "DTe":
                dt_units.append(entry)
            elif fleet_type == "FLe":
                fl_units.append(entry)

    # Calculate averages
    dt_avg = round(sum(u["availability"] for u in dt_units) / len(dt_units), 0) if dt_units else 0
    fl_avg = round(sum(u["availability"] for u in fl_units) / len(fl_units), 0) if fl_units else 0

    print(f"    DT BEV: {len(dt_units)} units, avg {dt_avg}%")
    print(f"    FL BEV: {len(fl_units)} units, avg {fl_avg}%")

    return {
        "dt": {"units": dt_units, "average": dt_avg},
        "fl": {"units": fl_units, "average": fl_avg},
    }


def extract_delays(data_dir: Path, fleet_prefix: str, week: int) -> list:
    """
    Parse BEV delays CSV. Hierarchical format with no headers.
    Returns list of breakdown entries with type, machineId, comment, hours.
    """
    patterns = [
        f"N3 BEV {fleet_prefix} Delays - Week{week}.csv",
    ]

    filepath = None
    for pattern in patterns:
        p = data_dir / pattern
        if p.exists():
            filepath = p
            break

    if not filepath:
        print(f"    {fleet_prefix} delays: NOT FOUND")
        return []

    print(f"    {fleet_prefix} delays: {filepath.name}")
    entries = []
    current_unit = None
    current_fleet = fleet_prefix

    with open(filepath, "r") as f:
        reader = csv.reader(f)
        for row in reader:
            if not row:
                continue

            # Clean empty strings from row
            row = [cell.strip() for cell in row]

            # Detect new unit: first cell is fleet type (DTe/FLe)
            if row[0] in ("DTe", "FLe"):
                current_fleet = row[0]
                current_unit = row[1] if len(row) > 1 else current_unit
                # Rest of row may contain delay data
                if len(row) >= 5:
                    comment = row[3] if row[3] else row[2]
                    try:
                        hours = float(row[-1])
                    except (ValueError, IndexError):
                        hours = 0
                    entries.append({
                        "type": current_fleet,
                        "machineId": current_unit,
                        "comment": comment,
                        "hours": hours,
                    })
            elif row[0].startswith("/Equipment"):
                # Category path line - may have hours at end
                comment_parts = [p for p in row if p and not p.startswith("/")]
                try:
                    hours = float(row[-1])
                    comment = " ".join(comment_parts[:-1]) if len(comment_parts) > 1 else row[0].split("/")[-1]
                except (ValueError, IndexError):
                    hours = 0
                    comment = " ".join(comment_parts) if comment_parts else row[0].split("/")[-1]

                if hours > 0 and current_unit:
                    entries.append({
                        "type": current_fleet,
                        "machineId": current_unit,
                        "comment": comment,
                        "hours": round(hours, 2),
                    })
            else:
                # Description + hours line
                try:
                    hours = float(row[-1])
                    comment = " ".join(row[:-1]) if len(row) > 1 else row[0]
                except (ValueError, IndexError):
                    continue

                if hours > 0 and current_unit:
                    entries.append({
                        "type": current_fleet,
                        "machineId": current_unit,
                        "comment": comment,
                        "hours": round(hours, 2),
                    })

    # Sort by hours descending and take top 15
    entries.sort(key=lambda x: x["hours"], reverse=True)
    print(f"    {fleet_prefix} delays: {len(entries)} entries (top 15 used)")
    return entries[:15]


def extract_weekly_trend(data_dir: Path, week: int) -> list:
    """Parse BEV weekly trend data (DTe and FLe columns)."""
    patterns = [
        f"N3 BEV DTe Weekly Availabilities - Week{week}.csv",
        f"N3 BEV FLe Weekly Availabilities - Week{week}.csv",
    ]

    filepath = None
    for pattern in patterns:
        p = data_dir / pattern
        if p.exists():
            filepath = p
            break

    if not filepath:
        return []

    print(f"    Weekly trend: {filepath.name}")
    rows = []
    with open(filepath, "r") as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) < 3:
                continue
            week_label = row[0].strip()
            date = row[1].strip()
            dt_val = parse_percentage(row[2]) if len(row) > 2 else 0
            fl_val = parse_percentage(row[3]) if len(row) > 3 else 0
            rows.append({
                "week": week_label,
                "date": date,
                "dtAvailability": dt_val,
                "flAvailability": fl_val,
            })

    return rows


def extract_bev_data(data_dir: Path, week: int) -> dict:
    """Extract all BEV data."""
    unit_avail = extract_unit_availability(data_dir, week)
    dt_delays = extract_delays(data_dir, "DTe", week)
    fl_delays = extract_delays(data_dir, "FLe", week)
    weekly_trend = extract_weekly_trend(data_dir, week)

    # Build breakdown summaries (only units <85%)
    dt_breakdowns = []
    if unit_avail["dt"]:
        for unit in unit_avail["dt"]["units"]:
            if unit["availability"] < 85:
                # Find delay details for this unit
                unit_delays = [d for d in dt_delays if d["machineId"] == unit["id"]]
                top_issue = unit_delays[0]["comment"] if unit_delays else "Breakdown"
                dt_breakdowns.append(
                    f"{unit['id']} {top_issue} (av={unit['availability']}%)."
                )

    fl_breakdowns = []
    if unit_avail["fl"]:
        for unit in unit_avail["fl"]["units"]:
            if unit["availability"] < 85:
                unit_delays = [d for d in fl_delays if d["machineId"] == unit["id"]]
                top_issue = unit_delays[0]["comment"] if unit_delays else "Breakdown"
                fl_breakdowns.append(
                    f"{unit['id']} {top_issue} (av={unit['availability']}%)."
                )

    return {
        "unitAvailability": unit_avail,
        "dtDelays": dt_delays,
        "flDelays": fl_delays,
        "weeklyTrend": weekly_trend,
        "dtBreakdownSummary": dt_breakdowns,
        "flBreakdownSummary": fl_breakdowns,
        "dtAverage": unit_avail["dt"]["average"] if unit_avail["dt"] else 0,
        "flAverage": unit_avail["fl"]["average"] if unit_avail["fl"] else 0,
    }
