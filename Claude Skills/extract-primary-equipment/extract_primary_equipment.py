#!/usr/bin/env python3
"""
Primary Equipment Daily Availability Extraction Script
Extracts daily availability data and breakdown comments from mining site Excel files
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


def col_letter_to_num(col_str):
    """Convert Excel column letters to number"""
    result = 0
    for char in col_str:
        result = result * 26 + (ord(char) - ord('A') + 1)
    return result


def find_excel_file(site, week_number):
    """Find the Excel file for a specific site and week"""
    patterns = {
        'gloria': f'Week {week_number}/Gloria Eng Report *.xlsx',
        'n2': f'Week {week_number}/Nch2 Weekly Report *.xlsx',
        'n3': f'Week {week_number}/N3 Eng Report Week *.xlsx'
    }

    if site.lower() not in patterns:
        return None

    files = glob.glob(patterns[site.lower()])
    if files:
        return files[0]
    return None


def find_sheet_and_range(zip_file, site):
    """Find the correct sheet and data range for a site"""
    sheet_names = {
        'gloria': 'weekly report',
        'n2': 'Eng Weekly report',
        'n3': 'Weekly report'
    }

    ranges = {
        'gloria': (45, 51),  # rows
        'n2': (42, 48),
        'n3': (43, 51)
    }

    target_sheet = sheet_names.get(site.lower())
    if not target_sheet:
        return None, None

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
            # Try both with and without namespace
            ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
                  'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}

            for sheet in wb_root.findall('main:sheets/main:sheet', ns):
                sheet_name = sheet.get('name')
                if sheet_name and sheet_name.lower() == target_sheet.lower():
                    rel_id = sheet.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
                    if rel_id and rel_id in rels:
                        sheet_path = f'xl/{rels[rel_id]}'
                        start_row, end_row = ranges[site.lower()]
                        return sheet_path, (start_row, end_row)
    except Exception as e:
        print(f"DEBUG: Error in find_sheet_and_range: {e}", file=sys.stderr)

    return None, None


def read_equipment_data(zip_file, sheet_path, row_range, site):
    """Read equipment availability data from Excel sheet"""
    shared_strings = get_shared_strings(zip_file)
    start_row, end_row = row_range

    with zip_file.open(sheet_path) as sheet_f:
        root = ET.parse(sheet_f).getroot()
        ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

        # Build cells dictionary
        cells_dict = {}
        for row in root.findall('.//main:row', ns):
            row_num = int(row.get('r', '0'))
            for cell in row.findall('main:c', ns):
                cell_ref = cell.get('r', '')
                match = re.match(r'([A-Z]+)(\d+)', cell_ref)
                if match:
                    col_letter = match.group(1)
                    col_num = col_letter_to_num(col_letter)
                    cell_row = int(match.group(2))

                    cell_type = cell.get('t')
                    value_elem = cell.find('main:v', ns)
                    value = ''

                    if value_elem is not None:
                        val = value_elem.text
                        if cell_type == 's':
                            try:
                                value = shared_strings[int(val)]
                            except Exception:
                                value = val
                        else:
                            value = val

                    cells_dict[(cell_row, col_num)] = value

        # Extract data rows (skip header row)
        equipment_data = []
        for row in range(start_row + 1, end_row + 1):
            equipment = cells_dict.get((row, 1), '')  # Column A
            fri = cells_dict.get((row, 2), '')  # Column B
            mon = cells_dict.get((row, 3), '')  # Column C
            tue = cells_dict.get((row, 4), '')  # Column D
            wed = cells_dict.get((row, 5), '')  # Column E
            thu = cells_dict.get((row, 6), '')  # Column F
            ave = cells_dict.get((row, 7), '')  # Column G
            comments = cells_dict.get((row, 8), '')  # Column H

            # Convert shared string IDs to actual text for comments
            if comments and comments.isdigit():
                try:
                    string_idx = int(comments)
                    # Gloria files have corrupted shared string references (off by 7)
                    # If index is out of bounds, try subtracting 7
                    if string_idx >= len(shared_strings) and string_idx - 7 >= 0:
                        string_idx = string_idx - 7
                    comments = shared_strings[string_idx]
                except (ValueError, IndexError):
                    pass

            if equipment:  # Only include if equipment name exists
                equipment_data.append({
                    'equipment': equipment,
                    'fri': fri,
                    'mon': mon,
                    'tue': tue,
                    'wed': wed,
                    'thu': thu,
                    'ave': ave,
                    'comments': comments
                })

        return equipment_data


def convert_to_percentage(value):
    """Convert decimal to percentage string"""
    try:
        float_val = float(value)
        # Handle cases where value might already be percentage
        if float_val > 1:
            float_val = float_val / 100
        percentage = float_val * 100
        return f"{percentage:.1f}%"
    except (ValueError, TypeError):
        return ""


def extract_equipment_data(site, week_number):
    """Main extraction function"""

    # Find Excel file
    excel_file = find_excel_file(site, week_number)
    if not excel_file:
        print(f"ERROR: Excel file not found for {site} Week {week_number}", file=sys.stderr)
        return False

    print(f"\n{'='*70}")
    print(f"EXTRACTING PRIMARY EQUIPMENT DAILY AVAILABILITIES")
    print(f"Site: {site.upper()}, Week: {week_number}")
    print("="*70 + "\n")

    try:
        with zipfile.ZipFile(excel_file, 'r') as zf:
            # Find sheet and range
            sheet_path, row_range = find_sheet_and_range(zf, site)
            if not sheet_path:
                print(f"ERROR: Could not find data sheet for {site}", file=sys.stderr)
                return False

            print(f"Reading from: {excel_file}")
            print(f"Sheet: {sheet_path}\n")

            # Read equipment data
            equipment_data = read_equipment_data(zf, sheet_path, row_range, site)

            if not equipment_data:
                print("ERROR: No equipment data found", file=sys.stderr)
                return False

            # Create output file
            week_folder = f"Week {week_number}"
            os.makedirs(week_folder, exist_ok=True)

            # Format output filename
            site_name = site.capitalize()
            output_filename = f"{site_name} Primary Equipment Daily Availabilities - Week{week_number}.csv"
            output_path = os.path.join(week_folder, output_filename)

            # Write CSV
            print(f"Writing {len(equipment_data)} equipment rows to CSV...\n")

            with open(output_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)

                # Header row
                writer.writerow(['Equipment', 'Friday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Average', 'Breakdowns - Comments'])

                # Data rows
                for row in equipment_data:
                    writer.writerow([
                        row['equipment'],
                        convert_to_percentage(row['fri']),
                        convert_to_percentage(row['mon']),
                        convert_to_percentage(row['tue']),
                        convert_to_percentage(row['wed']),
                        convert_to_percentage(row['thu']),
                        convert_to_percentage(row['ave']),
                        row['comments'].strip()
                    ])

            print(f"{'='*70}")
            print("EXTRACTION COMPLETE!")
            print("="*70 + "\n")
            print(f"Successfully created CSV file: {output_filename}\n")
            print(f"Location: {output_path}\n")
            print(f"Equipment entries: {len(equipment_data)}")
            print("\nData includes:")
            print("  - Daily availability percentages (Fri-Thu)")
            print("  - Weekly average availability")
            print("  - Breakdown comments for context on low availability")
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
        description='Extract Primary Equipment Daily Availabilities from mining site Excel files',
        epilog='Examples:\n  python3 extract_primary_equipment.py --site=gloria --week=16\n  python3 extract_primary_equipment.py gloria 16',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        '--site',
        type=str,
        required=False,
        choices=['gloria', 'n2', 'n3'],
        help='Mining site (gloria, n2, or n3)'
    )
    parser.add_argument(
        '--week',
        type=int,
        required=False,
        help='Week number to extract'
    )
    parser.add_argument(
        'site_positional',
        nargs='?',
        type=str,
        help='Site name (positional)'
    )
    parser.add_argument(
        'week_positional',
        nargs='?',
        type=int,
        help='Week number (positional)'
    )

    args = parser.parse_args()

    # Determine site and week from either named or positional arguments
    site = args.site or args.site_positional
    week = args.week or args.week_positional

    if not site or not week:
        parser.print_help()
        sys.exit(1)

    if site.lower() not in ['gloria', 'n2', 'n3']:
        print(f"ERROR: Invalid site '{site}'. Must be gloria, n2, or n3", file=sys.stderr)
        sys.exit(1)

    # Run extraction
    success = extract_equipment_data(site, week)
    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
