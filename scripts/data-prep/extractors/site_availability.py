"""
Site Availability Extractor

Parses weekly availability, maintenance compliance, and daily availability CSVs
for each site (Gloria, N2, N3).

Handles the per-site schema differences:
  - Gloria: Has Week31_Value column
  - N2: Has Category column, decimal percentages
  - N3: Simple format
"""
import csv
from pathlib import Path
import re


def parse_percentage(val: str) -> float:
    """Parse percentage string like '85%' or '82.31%' to float."""
    if not val:
        return 0.0
    cleaned = val.strip().replace("%", "")
    try:
        return float(cleaned)
    except ValueError:
        return 0.0


def extract_weekly_availability(data_dir: Path, site: str, week: int) -> dict:
    """Parse site weekly availability CSV."""
    patterns = [
        f"{site}_Weekly_Availability_Week{week}.csv",
        f"{site} Weekly Availability Week{week}.csv",
    ]

    for pattern in patterns:
        filepath = data_dir / pattern
        if filepath.exists():
            print(f"    Weekly availability: {filepath.name}")
            rows = []
            with open(filepath, "r") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    fleet = row.get("Fleet", "").strip()
                    weekly_avg = row.get("Weekly_Average", row.get("Weekly Average", ""))
                    color = row.get("Color", "").strip()
                    status = row.get("Status", "").strip()
                    target = row.get("Target", "85%")

                    rows.append({
                        "fleet": fleet,
                        "weeklyAverage": parse_percentage(weekly_avg),
                        "target": parse_percentage(target),
                        "color": color,
                        "status": status,
                    })
            return {"found": True, "data": rows}

    print(f"    Weekly availability: NOT FOUND")
    return {"found": False, "data": []}


def extract_maintenance_compliance(data_dir: Path, site: str, week: int) -> dict:
    """Parse site maintenance compliance CSV."""
    patterns = [
        f"{site} Maintenance Compliance - Week{week}.csv",
        f"{site}_Maintenance_Compliance_Week{week}.csv",
    ]

    for pattern in patterns:
        filepath = data_dir / pattern
        if filepath.exists():
            print(f"    Maintenance compliance: {filepath.name}")
            rows = []
            with open(filepath, "r") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    fleet = row.get("Fleet", "").strip()
                    compliance_pct = row.get("Compliance %", "").strip()
                    reasons = row.get("Reasons for Non-Compliance", "").strip()

                    rows.append({
                        "fleet": fleet,
                        "compliancePct": compliance_pct,
                        "reasons": reasons,
                    })
            return {"found": True, "data": rows}

    print(f"    Maintenance compliance: NOT FOUND")
    return {"found": False, "data": []}


def extract_daily_availabilities(data_dir: Path, site: str, week: int) -> dict:
    """Parse site primary equipment daily availabilities CSV."""
    patterns = [
        f"{site} Primary Equipment Daily Availabilities - Week{week}.csv",
        f"{site}_Primary_Equipment_Daily_Availabilities_Week{week}.csv",
    ]

    for pattern in patterns:
        filepath = data_dir / pattern
        if filepath.exists():
            print(f"    Daily availabilities: {filepath.name}")
            rows = []
            with open(filepath, "r") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    equipment = row.get("Equipment", "").strip()
                    if not equipment:
                        continue

                    avg = row.get("Average", "").strip()
                    breakdowns = row.get("Breakdowns - Comments", "").strip()

                    rows.append({
                        "equipment": equipment,
                        "average": parse_percentage(avg),
                        "breakdowns": breakdowns,
                    })
            return {"found": True, "data": rows}

    print(f"    Daily availabilities: NOT FOUND")
    return {"found": False, "data": []}


def extract_site_availability(data_dir: Path, site: str, week: int) -> dict:
    """Extract all availability data for a site."""
    result = {
        "site": site,
        "weeklyAvailability": extract_weekly_availability(data_dir, site, week),
        "maintenanceCompliance": extract_maintenance_compliance(data_dir, site, week),
        "dailyAvailabilities": extract_daily_availabilities(data_dir, site, week),
    }

    # Extract key metrics
    weekly = result["weeklyAvailability"]["data"]
    if weekly:
        overall = next((r for r in weekly if r["fleet"] == "Overall"), None)
        if overall:
            result["overallAverage"] = overall["weeklyAverage"]
            result["overallColor"] = overall["color"]

        # Build availability array for reportData.ts
        fleet_map = {"DT": "DT", "FL": "FL", "HD": "HD", "RT": "RT", "SR": "SR"}
        availability = []
        for row in weekly:
            fleet = row["fleet"]
            if fleet in fleet_map:
                availability.append({
                    "label": fleet_map[fleet],
                    "percentage": row["weeklyAverage"],
                    "target": row["target"],
                })
        result["availability"] = availability

    # Extract breakdown details from daily availabilities
    daily = result["dailyAvailabilities"]["data"]
    breakdowns = []
    for row in daily:
        if row["breakdowns"] and row["average"] < 85:
            breakdowns.append({
                "equipment": row["equipment"],
                "details": [b.strip() for b in row["breakdowns"].split(",") if b.strip()],
                "average": row["average"],
            })
    result["keyBreakdowns"] = sorted(breakdowns, key=lambda x: x["average"])

    return result
