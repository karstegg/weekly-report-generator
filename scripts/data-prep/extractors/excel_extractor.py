"""
Excel Workbook Supplement Extractor

Extracts additional data from site engineering Excel reports that
may not be available in CSVs:
  - Production totals (ROM/Product tons)
  - Safety stats
  - LDV/UV fleet status
  - Service quality data

Files:
  - "Gloria Eng Report Week DD-DD MMM YYYY.xlsx"
  - "Nch2 Weekly Report DD MMM YYYY.xlsx"
"""
from pathlib import Path

try:
    import openpyxl
    HAS_OPENPYXL = True
except ImportError:
    HAS_OPENPYXL = False

try:
    import pandas as pd
    HAS_PANDAS = True
except ImportError:
    HAS_PANDAS = False


def extract_excel_supplements(data_dir: Path, week: int) -> dict:
    """Extract supplementary data from Excel workbooks."""
    if not HAS_PANDAS:
        print("  pandas not installed, skipping Excel extraction")
        return {}

    results = {}

    # Find Excel files
    excel_files = list(data_dir.glob("*.xlsx"))
    if not excel_files:
        print("  No Excel files found")
        return results

    for filepath in excel_files:
        print(f"  Processing: {filepath.name}")

        # Determine site from filename
        name_lower = filepath.name.lower()
        if "gloria" in name_lower:
            site = "gloria"
        elif "nch2" in name_lower or "n2" in name_lower or "nchwaning 2" in name_lower:
            site = "n2"
        elif "nch3" in name_lower or "n3" in name_lower or "nchwaning 3" in name_lower:
            site = "n3"
        else:
            print(f"    Unknown site, skipping")
            continue

        try:
            xl = pd.ExcelFile(filepath)
            sheet_names = xl.sheet_names
            print(f"    Sheets: {sheet_names}")

            site_data = {"sheets": sheet_names, "filename": filepath.name}

            # Try to extract compliance data
            for sheet in sheet_names:
                if "compliance" in sheet.lower():
                    try:
                        df = pd.read_excel(filepath, sheet_name=sheet, header=1)
                        # Clean column names
                        df.columns = [str(c).strip() for c in df.columns]
                        site_data["compliance"] = df.head(20).to_dict("records")
                        print(f"    Extracted compliance: {len(df)} rows")
                    except Exception as e:
                        print(f"    Error reading {sheet}: {e}")

            # Try to extract utility/fermel data
            for sheet in sheet_names:
                if "fermel" in sheet.lower() or "toyota" in sheet.lower() or "underground" in sheet.lower():
                    try:
                        df = pd.read_excel(filepath, sheet_name=sheet, header=1)
                        df.columns = [str(c).strip() for c in df.columns]
                        site_data["utilityVehicles"] = df.head(50).to_dict("records")
                        print(f"    Extracted utility vehicles: {len(df)} rows")
                    except Exception as e:
                        print(f"    Error reading {sheet}: {e}")

            # Try to extract weekly report summary
            for sheet in sheet_names:
                if "weekly report" in sheet.lower() or "eng weekly" in sheet.lower():
                    try:
                        df = pd.read_excel(filepath, sheet_name=sheet)
                        # Take first 30 rows as summary
                        site_data["weeklySummary"] = df.head(30).to_dict("records")
                        print(f"    Extracted weekly summary")
                    except Exception as e:
                        print(f"    Error reading {sheet}: {e}")

            results[site] = site_data

        except Exception as e:
            print(f"    Error processing {filepath.name}: {e}")

    return results
