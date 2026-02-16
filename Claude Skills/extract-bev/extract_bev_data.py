#!/usr/bin/env python3
"""
BEV Data Extraction Script
Extracts Battery Electric Vehicle data from BEV_Dataset.xlsx to CSV files
"""

import argparse
import sys
import os
import zipfile
import xml.etree.ElementTree as ET
import csv
from pathlib import Path

# Configure UTF-8 encoding for console output (prevent charmap errors)
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')


def find_weekly_reports_root():
    """Auto-detect Weekly Reports root directory from any execution location"""
    current = os.getcwd()

    # Check if we're already in Weekly Reports directory
    if os.path.basename(current) == "Weekly Reports":
        return current

    # Check if we're in a skill subdirectory
    if ".claude" in current and "skills" in current:
        # Go up to Weekly Reports root
        parts = current.split(os.sep)
        try:
            idx = parts.index("Weekly Reports")
            return os.sep.join(parts[:idx+1])
        except ValueError:
            pass

    # Last resort: search parent directories for Week 1 folder
    test_path = current
    for _ in range(5):  # Check up to 5 levels up
        if os.path.exists(os.path.join(test_path, "Week 1")):
            return test_path
        test_path = os.path.dirname(test_path)

    return None


# Change to correct working directory at script start
weekly_reports_root = find_weekly_reports_root()
if weekly_reports_root:
    os.chdir(weekly_reports_root)
else:
    print("ERROR: Could not find Weekly Reports root directory", file=sys.stderr)
    print("This script must be run from within the Weekly Reports directory tree", file=sys.stderr)
    sys.exit(1)


def get_shared_strings(zip_file):
    """Extract shared strings from Excel file"""
    try:
        with zip_file.open('xl/sharedStrings.xml') as f:
            root = ET.parse(f).getroot()
            strings = []
            for si in root.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
                t_elem = si.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
                if t_elem is not None:
                    strings.append(t_elem.text)
            return strings
    except Exception:
        return []


def read_excel_sheet_values(zip_file, sheet_path, is_delays=False):
    """Read sheet with proper cell values and formatting"""
    shared_strings = get_shared_strings(zip_file)

    with zip_file.open(sheet_path) as f:
        root = ET.parse(f).getroot()
        ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

        rows_data = []
        for row in root.findall('.//main:row', ns):
            row_data = []
            for cell in row.findall('main:c', ns):
                cell_type = cell.get('t')
                value_elem = cell.find('main:v', ns)

                if value_elem is not None:
                    value = value_elem.text
                    if cell_type == 's':
                        try:
                            value = shared_strings[int(value)]
                        except Exception:
                            pass
                    else:
                        try:
                            value = float(value)
                            # Don't convert delays to percentage - keep as hours
                            if not is_delays:
                                value = f"{value:.2%}"
                            else:
                                # Keep as numeric hours with 2 decimal places
                                if value == int(value):
                                    value = str(int(value))
                                else:
                                    value = f"{value:.2f}"
                        except Exception:
                            pass
                    row_data.append(str(value))
                else:
                    row_data.append('')
            if row_data:
                rows_data.append(row_data)

        return rows_data


def save_csv(filename, data, skip_header_rows=3):
    """Save data to CSV file, skipping metadata rows"""
    try:
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            # Skip metadata rows (ProdYear, headers), write data rows
            for row in data[skip_header_rows:]:
                writer.writerow(row)
        return True
    except Exception as e:
        print(f"Error saving {filename}: {e}", file=sys.stderr)
        return False


def extract_bev_data(week_number):
    """Main extraction function"""

    # Check if BEV_Dataset.xlsx exists
    bev_file = "BEV_Dataset.xlsx"
    if not os.path.exists(bev_file):
        print(f"ERROR: {bev_file} not found in current directory", file=sys.stderr)
        return False

    # Create Week folder if it doesn't exist
    week_folder = f"Week {week_number}"
    os.makedirs(week_folder, exist_ok=True)

    # Sheet mappings to output files
    sheet_mappings = {
        'Availaibility-week': (
            f'N3 BEV DTe Weekly Availabilities - Week{week_number}.csv',
            f'N3 BEV FLe Weekly Availabilities - Week{week_number}.csv'
        ),
        'Availaibility-month': (
            f'N3 BEV DTe Monthly Availabilities - Week{week_number}.csv',
            f'N3 BEV FLe Monthly Availabilities - Week{week_number}.csv'
        ),
        'Availability-perunit_Crnt wk': (
            f'N3 BEV DTe Availability by Unit - Week{week_number}.csv',
            f'N3 BEV FLe Availability by Unit - Week{week_number}.csv'
        ),
        'Delays_DTe_Current Week': (
            f'N3 BEV DTe Delays - Week{week_number}.csv',
            None
        ),
        'Delays_FLe_Current Week': (
            None,
            f'N3 BEV FLe Delays - Week{week_number}.csv'
        ),
    }

    print(f"\n{'='*70}")
    print(f'EXTRACTING BEV DATA FOR WEEK {week_number}')
    print("="*70 + "\n")

    try:
        with zipfile.ZipFile(bev_file, 'r') as zf:
            # Get sheet names and paths
            with zf.open('xl/workbook.xml') as f:
                wb_root = ET.parse(f).getroot()
                with zf.open('xl/_rels/workbook.xml.rels') as rels_f:
                    rels_root = ET.parse(rels_f).getroot()
                    rels = {r.get('Id'): r.get('Target')
                           for r in rels_root.findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship')}

            files_created = []

            for sheet_elem in wb_root.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheets/{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet'):
                sheet_name = sheet_elem.get('name')
                if sheet_name not in sheet_mappings:
                    continue

                rel_id = sheet_elem.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
                sheet_path = f'xl/{rels[rel_id]}'

                is_delays = 'Delays' in sheet_name
                data = read_excel_sheet_values(zf, sheet_path, is_delays=is_delays)

                dte_file, fle_file = sheet_mappings[sheet_name]

                print(f"Processing: {sheet_name}")

                if dte_file:
                    output_path = os.path.join(week_folder, dte_file)
                    if save_csv(output_path, data):
                        print(f"  Saved: {dte_file}")
                        files_created.append(dte_file)

                if fle_file:
                    output_path = os.path.join(week_folder, fle_file)
                    if save_csv(output_path, data):
                        print(f"  Saved: {fle_file}")
                        files_created.append(fle_file)

            print(f"\n{'='*70}")
            print("EXTRACTION COMPLETE!")
            print("="*70 + "\n")

            if len(files_created) == 8:
                print(f"Successfully created {len(files_created)} CSV files in {week_folder}/:\n")
                for f in sorted(files_created):
                    print(f"  ✓ {f}")
                print()
                return True
            else:
                print(f"WARNING: Only {len(files_created)} of 8 expected files created", file=sys.stderr)
                return False

    except FileNotFoundError as e:
        print(f"ERROR: Excel sheet not found - {e}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"ERROR: Extraction failed - {e}", file=sys.stderr)
        return False


def main():
    parser = argparse.ArgumentParser(
        description='Extract BEV data from BEV_Dataset.xlsx to CSV files',
        epilog='Example: python3 extract_bev_data.py --week=16'
    )
    parser.add_argument(
        '--week',
        type=int,
        required=False,
        help='Week number to extract (e.g., 16)'
    )
    parser.add_argument(
        'week_positional',
        nargs='?',
        type=int,
        help='Week number (positional argument)'
    )

    args = parser.parse_args()

    # Determine week number from either --week or positional argument
    week_number = args.week or args.week_positional

    if not week_number:
        parser.print_help()
        sys.exit(1)

    # Run extraction
    success = extract_bev_data(week_number)
    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
