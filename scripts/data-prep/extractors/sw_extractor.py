"""
Shafts & Winders Data Extractor

Parses S&W production CSV for:
  - Feed rate (tons/hr) actual vs target
  - Rock Winder availability

Note: The CSV may have data quality issues (Excel date serials in
wrong columns). This extractor handles known quirks.
"""
import csv
from pathlib import Path


def extract_sw_data(data_dir: Path, week: int) -> dict:
    """Extract Shafts & Winders production data."""
    patterns = [
        f"Shafts and Winders Production - Week{week}.csv",
        f"Shafts_and_Winders_Production_Week{week}.csv",
    ]

    filepath = None
    for pattern in patterns:
        p = data_dir / pattern
        if p.exists():
            filepath = p
            break

    if not filepath:
        print("  S&W production CSV: NOT FOUND")
        return {"found": False}

    print(f"  S&W production CSV: {filepath.name}")

    rows = []
    with open(filepath, "r") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        for row in reader:
            rows.append(row)

    if not rows:
        return {"found": True, "data": [], "summary": {}}

    # Extract feed rates and targets
    feed_rates = []
    targets = []
    rw_values = []

    for row in rows:
        # Try to extract numeric values - handle Excel serial number quirks
        for key in ["Feed Rate", "Actual Rate", "Feed Rate Target"]:
            val = row.get(key, "").strip()
            try:
                num = float(val)
                if key == "Actual Rate":
                    feed_rates.append(num)
                elif key == "Feed Rate Target":
                    targets.append(num)
            except (ValueError, TypeError):
                pass

        # RW availability
        rw = row.get("Delays (Hours)", "").strip()
        try:
            rw_values.append(float(rw))
        except (ValueError, TypeError):
            pass

    # Calculate averages
    avg_feed = round(sum(feed_rates) / len(feed_rates), 0) if feed_rates else 0
    avg_target = round(sum(targets) / len(targets), 0) if targets else 0

    print(f"  Feed Rate: {avg_feed} tons/hr (target: {avg_target})")
    print(f"  Raw data rows: {len(rows)}")
    print(f"  Note: S&W CSV may need manual verification for data quality")

    return {
        "found": True,
        "rawRows": rows,
        "feedRate": avg_feed,
        "feedRateTarget": avg_target,
        "fieldNames": fieldnames,
        "note": "S&W data often has quality issues. Verify against source Excel/images.",
    }
