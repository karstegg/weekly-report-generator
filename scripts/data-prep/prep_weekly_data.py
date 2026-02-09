#!/usr/bin/env python3
"""
Weekly Report Data Prep - Master Orchestrator

Processes raw data files (Excel, PPTX, text, CSV) from data-extract/
and generates clean CSVs ready for the report generator.

Usage:
    python scripts/data-prep/prep_weekly_data.py <week_number>

This script:
1. Extracts HEAL data from text files and PPTX
2. Parses site weekly availability CSVs
3. Parses BEV unit-level CSVs and delays
4. Parses S&W production CSV
5. Parses utility section CSV
6. Extracts supplementary data from Excel workbooks
7. Outputs a JSON summary of all extracted data

The JSON output can then be used to update reportData.ts.
"""
import sys
import json
import os
from pathlib import Path

# Add scripts dir to path
sys.path.insert(0, str(Path(__file__).parent))

from extractors.heal_extractor import extract_heal_data
from extractors.site_availability import extract_site_availability
from extractors.bev_extractor import extract_bev_data
from extractors.sw_extractor import extract_sw_data
from extractors.utility_extractor import extract_utility_data
from extractors.excel_extractor import extract_excel_supplements


def main():
    if len(sys.argv) < 2:
        print("Usage: python prep_weekly_data.py <week_number>")
        sys.exit(1)

    week = int(sys.argv[1])
    data_dir = Path(__file__).parent.parent.parent / "data-extract"

    if not data_dir.exists():
        print(f"Error: data-extract directory not found at {data_dir}")
        sys.exit(1)

    print(f"=== Weekly Report Data Prep - Week {week} ===\n")

    results = {}

    # 1. HEAL data
    print("--- HEAL Data ---")
    results["heal"] = extract_heal_data(data_dir, week)

    # 2. Site availability (Gloria, N2, N3)
    print("\n--- Site Availability ---")
    for site in ["Gloria", "N2", "N3"]:
        print(f"\n  [{site}]")
        results[site.lower()] = extract_site_availability(data_dir, site, week)

    # 3. BEV data
    print("\n--- BEV Data ---")
    results["bev"] = extract_bev_data(data_dir, week)

    # 4. S&W data
    print("\n--- Shafts & Winders ---")
    results["shaftsAndWinders"] = extract_sw_data(data_dir, week)

    # 5. Utility data
    print("\n--- Utility Section ---")
    results["utility"] = extract_utility_data(data_dir, week)

    # 6. Excel supplements
    print("\n--- Excel Supplements ---")
    results["excel_supplements"] = extract_excel_supplements(data_dir, week)

    # Output JSON
    output_path = data_dir / f"extracted_data_week{week}.json"
    with open(output_path, "w") as f:
        json.dump(results, f, indent=2, default=str)

    print(f"\n=== Complete ===")
    print(f"Extracted data written to: {output_path}")
    print(f"Use this data to update src/data/reportData.ts")

    return results


if __name__ == "__main__":
    main()
