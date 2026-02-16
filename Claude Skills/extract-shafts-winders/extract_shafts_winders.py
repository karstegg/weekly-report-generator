#!/usr/bin/env python3
"""
Shafts & Winders Data Extraction Script
Extracts production and availability data from S&W engineering Excel files
"""

import argparse
import sys
import os
import zipfile
import xml.etree.ElementTree as ET
import csv
import re
import glob
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


def num_to_col_letter(num):
    """Convert column number to letters"""
    result = ""
    while num > 0:
        num -= 1
        result = chr(num % 26 + ord('A')) + result
        num //= 26
    return result


def find_excel_file(week_number):
    """Find the Shafts & Winders Excel file"""
    pattern = f'Week {week_number}/Weekly Report  Shafts and Winders 2025_*_*-*Oct2025.xlsx'
    files = glob.glob(pattern)
    if files:
        return files[0]

    # Fallback - try broader pattern
    pattern2 = f'Week {week_number}/*Shafts*Winders*.xlsx'
    files = glob.glob(pattern2)
    if files:
        return files[0]

    return None


def find_sw_eng_sheet(zip_file):
    """Find the S&W_Eng sheet"""
    try:
        with zip_file.open('xl/_rels/workbook.xml.rels') as rels_f:
            rels_root = ET.parse(rels_f).getroot()
            rels = {}
            for r in rels_root.findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                rel_id = r.get('Id')
                target = r.get('Target')
                if rel_id and target:
                    rels[rel_id] = target

        with zip_file.open('xl/workbook.xml') as f:
            wb_root = ET.parse(f).getroot()
            ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
                  'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}

            for sheet in wb_root.findall('main:sheets/main:sheet', ns):
                sheet_name = sheet.get('name')
                if sheet_name and 'S&W_Eng' in sheet_name:
                    rel_id = sheet.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
                    if rel_id and rel_id in rels:
                        sheet_path = f'xl/{rels[rel_id]}'
                        return sheet_path
    except Exception as e:
        print(f"DEBUG: Error in find_sw_eng_sheet: {e}", file=sys.stderr)

    return None


def read_sheet_cells(zip_file, sheet_path):
    """Read all cells from sheet and return dictionary"""
    shared_strings = get_shared_strings(zip_file)

    with zip_file.open(sheet_path) as sheet_f:
        root = ET.parse(sheet_f).getroot()
        ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

        cells_dict = {}
        for row in root.findall('.//main:row', ns):
            row_num = int(row.get('r', '0'))
            for cell in row.findall('main:c', ns):
                cell_ref = cell.get('r', '')
                match = re.match(r'([A-Z]+)(\d+)', cell_ref)
                if match:
                    col_letter = match.group(1)
                    cell_row = int(match.group(2))

                    cell_type = cell.get('t')
                    value_elem = cell.find('main:v', ns)
                    value = ''

                    if value_elem is not None:
                        val = value_elem.text
                        if cell_type == 's':
                            try:
                                idx = int(val)
                                value = shared_strings[idx]
                            except Exception:
                                value = val
                        else:
                            value = val

                    cells_dict[(cell_row, col_letter)] = value

        return cells_dict


def format_percentage(value):
    """Format value as percentage with 2 decimal places"""
    try:
        float_val = float(value)
        return f"{float_val:.2f}%"
    except (ValueError, TypeError):
        return ""


def find_availability_section(cells_dict):
    """
    Search for availability section by finding the 'DAY' header.
    Returns the row number where availability data starts (2 rows below 'DAY' header).

    Args:
        cells_dict: Dictionary of cell values with (row, col) keys

    Returns:
        Row number for availability data, or None if not found
    """
    # Search reasonable range for "DAY" header in column A
    for row in range(120, 180):
        cell_value = cells_dict.get((row, 'A'), '')
        if isinstance(cell_value, str) and cell_value.upper().strip() == 'DAY':
            # Found "DAY" header row
            # Data is typically 2 rows below (row+2)
            # Row structure: DAY (header), DATE (subheader), DATA (actual values)
            return row + 2

    # Fallback: if not found, return None
    return None


def extract_sw_data(week_number):
    """Main extraction function"""

    # Find Excel file
    excel_file = find_excel_file(week_number)
    if not excel_file:
        print(f"ERROR: Excel file not found for Shafts & Winders Week {week_number}", file=sys.stderr)
        return False

    print(f"\n{'='*70}")
    print(f"EXTRACTING SHAFTS & WINDERS DATA")
    print(f"Week: {week_number}")
    print("="*70 + "\n")

    try:
        with zipfile.ZipFile(excel_file, 'r') as zf:
            # Find sheet
            sheet_path = find_sw_eng_sheet(zf)
            if not sheet_path:
                print(f"ERROR: Could not find S&W_Eng sheet", file=sys.stderr)
                return False

            print(f"Reading from: {excel_file}")
            print(f"Sheet: {sheet_path}\n")

            # Read all cells
            cells_dict = read_sheet_cells(zf, sheet_path)

            # Extract production data (A151:J163)
            print("Extracting production data (Tons/Hr)...")
            production_data = []

            # Days of week
            days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
            day_cols = ['B', 'C', 'D', 'E', 'F', 'G', 'H']

            for i, day in enumerate(days):
                col = day_cols[i]

                date_val = cells_dict.get((151, col), '')
                feed_rate = cells_dict.get((152, col), '')
                target_rate = cells_dict.get((153, col), '')
                actual_rate = cells_dict.get((154, col), '')
                delays = cells_dict.get((159, col), '')
                tons_hoisted = cells_dict.get((162, col), '')
                hrs_to_hoist = cells_dict.get((161, col), '')

                production_data.append({
                    'day': day,
                    'date': date_val,
                    'feed_rate': feed_rate,
                    'target_rate': target_rate,
                    'actual_rate': actual_rate,
                    'tons_hoisted': tons_hoisted,
                    'hrs_to_hoist': hrs_to_hoist,
                    'delays': delays
                })

            # Add week average row
            week_date = cells_dict.get((151, 'E'), '')  # Use Monday as reference for week
            production_data.append({
                'day': 'Week Average',
                'date': week_date,
                'feed_rate': cells_dict.get((152, 'I'), ''),
                'target_rate': cells_dict.get((153, 'J'), ''),
                'actual_rate': cells_dict.get((154, 'J'), ''),
                'tons_hoisted': cells_dict.get((162, 'I'), ''),
                'hrs_to_hoist': cells_dict.get((161, 'I'), ''),
                'delays': cells_dict.get((159, 'I'), '')
            })

            # Extract availability data (dynamic row detection)
            print("Extracting availability data...")
            availability_data = []

            # Find availability section dynamically
            avail_row = find_availability_section(cells_dict)

            if avail_row:
                print(f"  Found availability data at row {avail_row}")
                # Get equipment name (usually shows a time or equipment ID)
                equipment_name = cells_dict.get((avail_row, 'A'), '')

                # Default to "RW" (Rock Winder) if name is empty or looks like a time value
                if not equipment_name or ':' in str(equipment_name):
                    equipment_name = 'RW'

                av_row = {
                    'equipment': equipment_name,
                    'friday': cells_dict.get((avail_row, 'B'), ''),
                    'saturday': cells_dict.get((avail_row, 'C'), ''),
                    'sunday': cells_dict.get((avail_row, 'D'), ''),
                    'monday': cells_dict.get((avail_row, 'E'), ''),
                    'tuesday': cells_dict.get((avail_row, 'F'), ''),
                    'wednesday': cells_dict.get((avail_row, 'G'), ''),
                    'thursday': cells_dict.get((avail_row, 'H'), ''),
                    'weekly_avg': cells_dict.get((avail_row, 'I'), ''),
                    'target': cells_dict.get((avail_row + 1, 'I'), '')  # Target is one row below
                }
                availability_data.append(av_row)
            else:
                print("  ⚠ Warning: Could not find availability section (searched rows 120-180)")
                print("  ℹ Availability CSV will contain headers only")

            # Create output files
            week_folder = f"Week {week_number}"
            os.makedirs(week_folder, exist_ok=True)

            # Write production CSV
            prod_filename = f"Shafts and Winders Production - Week{week_number}.csv"
            prod_path = os.path.join(week_folder, prod_filename)

            print(f"Writing production data ({len(production_data)} rows)...\n")

            with open(prod_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(['Day', 'Date', 'Feed Rate', 'Feed Rate Target', 'Actual Rate', 'Tons Hoisted', 'Hours to Hoist', 'Delays (Hours)'])

                for row in production_data:
                    # Format numeric values
                    feed_rate = f"{float(row['feed_rate']):.2f}" if row['feed_rate'] else ""
                    target_rate = f"{float(row['target_rate']):.2f}" if row['target_rate'] else ""
                    actual_rate = f"{float(row['actual_rate']):.2f}" if row['actual_rate'] else ""
                    tons_hoisted = f"{float(row['tons_hoisted']):.2f}" if row['tons_hoisted'] else ""
                    hrs_to_hoist = f"{float(row['hrs_to_hoist']):.2f}" if row['hrs_to_hoist'] else ""
                    delays = f"{float(row['delays']):.2f}" if row['delays'] else ""

                    writer.writerow([
                        row['day'],
                        row['date'],
                        feed_rate,
                        target_rate,
                        actual_rate,
                        tons_hoisted,
                        hrs_to_hoist,
                        delays
                    ])

            # Write availability CSV
            avail_filename = f"Shafts and Winders Availability - Week{week_number}.csv"
            avail_path = os.path.join(week_folder, avail_filename)

            print(f"Writing availability data ({len(availability_data)} rows)...\n")

            with open(avail_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(['Equipment', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Weekly Average', 'Target'])

                for row in availability_data:
                    writer.writerow([
                        row['equipment'],
                        format_percentage(row['friday']),
                        format_percentage(row['saturday']),
                        format_percentage(row['sunday']),
                        format_percentage(row['monday']),
                        format_percentage(row['tuesday']),
                        format_percentage(row['wednesday']),
                        format_percentage(row['thursday']),
                        format_percentage(row['weekly_avg']),
                        format_percentage(row['target'])
                    ])

            print(f"{'='*70}")
            print("EXTRACTION COMPLETE!")
            print("="*70 + "\n")
            print(f"Successfully created CSV files in {week_folder}/:\n")
            print(f"  1. {prod_filename}")
            print(f"  2. {avail_filename}\n")
            print("Production data includes:")
            print("  - Daily and weekly average feed rates (tons/hr)")
            print("  - Actual production rates achieved")
            print("  - Total tons hoisted per day")
            print("  - Hours available for hoisting")
            print("  - System delays (downtime hours)")
            print("\nAvailability data includes:")
            print("  - Daily equipment availability percentages")
            print("  - Weekly average availability")
            print("  - Target availability (95%)")
            print()

            return True

    except FileNotFoundError as e:
        print(f"ERROR: File not found - {e}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"ERROR: Extraction failed - {e}", file=sys.stderr)
        return False


def main():
    parser = argparse.ArgumentParser(
        description='Extract Shafts & Winders production and availability data',
        epilog='Examples:\n  python3 extract_shafts_winders.py --week=16\n  python3 extract_shafts_winders.py 16',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        '--week',
        type=int,
        required=False,
        help='Week number to extract'
    )
    parser.add_argument(
        'week_positional',
        nargs='?',
        type=int,
        help='Week number (positional)'
    )

    args = parser.parse_args()

    # Determine week from either named or positional argument
    week = args.week or args.week_positional

    if not week:
        parser.print_help()
        sys.exit(1)

    # Run extraction
    success = extract_sw_data(week)
    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
