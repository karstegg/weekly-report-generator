"""
Utility Section Data Extractor

Parses Utility_Section_Weekly_Availability CSV for slides 14-16.

Key rules:
  - Exclude Bobcats (BB0002, BB0006)
  - Exclude Training/Traimming vehicles
  - Only 12 tracked areas
  - Logistics = Engineering department (NOT Mining)
"""
import csv
from pathlib import Path


TRACKED_AREAS = {
    "Plant Fitter", "Explosive", "Exploisive",  # handle misspelling
    "BEV", "X Cut", "Hyd Fitter", "Electricians",
    "Main West", "Mechanics", "Central", "Utility TMM",
    "Boilermaker", "Logistics",
}

EXCLUDED_AREAS = {
    "Training Center", "Traimming", "Training",
}

DEPARTMENT_MAP = {
    "Plant Fitter": "Plant",
    "Explosive": "Mining", "Exploisive": "Mining",
    "X Cut": "Mining",
    "Main West": "Mining",
    "Central": "Mining",
    "BEV": "Engineering",
    "Hyd Fitter": "Engineering",
    "Electricians": "Engineering",
    "Mechanics": "Engineering",
    "Utility TMM": "Engineering",
    "Boilermaker": "Engineering",
    "Logistics": "Engineering",
}


def normalize_area(area: str) -> str:
    """Normalize area name for misspellings."""
    if area == "Exploisive":
        return "Explosive"
    return area


def extract_utility_data(data_dir: Path, week: int) -> dict:
    """Extract utility section weekly availability data."""
    patterns = [
        f"Utility_Section_Weekly_Availability_Week{week}.csv",
        f"Utility Section Weekly Availability Week{week}.csv",
    ]

    filepath = None
    for pattern in patterns:
        p = data_dir / pattern
        if p.exists():
            filepath = p
            break

    if not filepath:
        print("  Utility CSV: NOT FOUND")
        return {"found": False}

    print(f"  Utility CSV: {filepath.name}")

    rows = []
    with open(filepath, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)

    # Filter to tracked areas only
    tracked_rows = []
    excluded_count = 0
    for row in rows:
        area = row.get("Area_Owner", "").strip()
        if area in EXCLUDED_AREAS:
            excluded_count += 1
            continue
        if area in TRACKED_AREAS:
            tracked_rows.append(row)

    print(f"  Total areas: {len(rows)}, Tracked: {len(tracked_rows)}, Excluded: {excluded_count}")

    # Build daily tracking data
    daily_tracking = []
    total_available = 0
    total_units = 0

    for row in tracked_rows:
        area = normalize_area(row.get("Area_Owner", "").strip())
        weekly_avg = float(row.get("Weekly_Avg_Pct", 0))

        day_data = {}
        for day_num, day_name in enumerate(["mon", "tue", "wed", "thu", "fri"], 1):
            avail = int(row.get(f"Day{day_num}_Available", 0))
            total = int(row.get(f"Day{day_num}_Total", 0))
            color = row.get(f"Day{day_num}_Color", "green").strip()
            day_data[day_name] = {
                "available": avail,
                "total": total,
                "color": color,
            }
            total_available += avail
            total_units += total

        daily_tracking.append({
            "area": area,
            **day_data,
            "weeklyAvg": weekly_avg,
        })

    # Calculate fleet status (using Friday's data as representative)
    friday_available = sum(r["mon"]["available"] for r in daily_tracking)
    friday_total = sum(r["mon"]["total"] for r in daily_tracking)
    friday_unavailable = friday_total - friday_available

    # Build area summary
    area_summary = []
    for row in tracked_rows:
        area = normalize_area(row.get("Area_Owner", "").strip())
        dept = DEPARTMENT_MAP.get(area, "Unknown")

        # Use Friday (Day1) for snapshot
        avail = int(row.get("Day1_Available", 0))
        total = int(row.get("Day1_Total", 0))
        unavail = total - avail

        area_summary.append({
            "area": area,
            "department": dept,
            "total": total,
            "unavailable": unavail,
        })

    overall_pct = round((total_available / total_units * 100), 0) if total_units > 0 else 0
    print(f"  Overall fleet availability: {overall_pct}%")
    print(f"  Available: {friday_available}, Unavailable: {friday_unavailable}")

    return {
        "found": True,
        "fleetStatus": {
            "available": friday_available,
            "unavailable": friday_unavailable,
        },
        "overallPercentage": overall_pct,
        "dailyTracking": daily_tracking,
        "areaSummary": area_summary,
    }
