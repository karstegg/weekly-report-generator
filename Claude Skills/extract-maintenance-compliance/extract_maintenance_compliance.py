#!/usr/bin/env python3
"""
Weekly Maintenance Compliance Extraction Script
Extracts maintenance compliance data from mining site Excel files
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


def find_compliance_sheet(zip_file, site):
    """Find the Compliance Report sheet for a site"""
    sheet_names = {
        'gloria': 'Compliance Report',
        'n2': 'Compliance report',
        'n3': 'Compliance Report'
    }

    row_ranges = {
        'gloria': (6, 13),
        'n2': (6, 13),
        'n3': (6, 20)
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
            ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
                  'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}

            for sheet in wb_root.findall('main:sheets/main:sheet', ns):
                sheet_name = sheet.get('name')
                if sheet_name and sheet_name.lower() == target_sheet.lower():
                    rel_id = sheet.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
                    if rel_id and rel_id in rels:
                        sheet_path = f'xl/{rels[rel_id]}'
                        start_row, end_row = row_ranges[site.lower()]
                        return sheet_path, (start_row, end_row)
    except Exception as e:
        print(f"DEBUG: Error in find_compliance_sheet: {e}", file=sys.stderr)

    return None, None


def read_compliance_data(zip_file, sheet_path, row_range, site):
    """Read maintenance compliance data from Excel sheet"""
    shared_strings = get_shared_strings(zip_file)
    start_row, end_row = row_range

    # Define column mappings for each site
    col_mappings = {
        'gloria': {'fleet': 'B', 'planned': 'E', 'actual': 'G', 'compliance': 'I', 'target': 'K', 'reason': 'M'},
        'n2': {'fleet': 'B', 'planned': 'C', 'actual': 'D', 'compliance': 'E', 'target': 'F', 'reason': 'L'},
        'n3': {'fleet': 'B', 'planned': 'E', 'actual': 'G', 'compliance': 'I', 'target': 'K', 'reason': 'M'}
    }

    cols = col_mappings.get(site.lower(), col_mappings['gloria'])

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
                    cell_row = int(match.group(2))

                    cell_type = cell.get('t')
                    value_elem = cell.find('main:v', ns)
                    value = ''

                    if value_elem is not None:
                        val = value_elem.text
                        if cell_type == 's':
                            try:
                                string_idx = int(val)
                                # Gloria files have corrupted shared string references (off by 7)
                                if string_idx >= len(shared_strings) and string_idx - 7 >= 0:
                                    string_idx = string_idx - 7
                                value = shared_strings[string_idx]
                            except Exception:
                                value = val
                        else:
                            value = val

                    cells_dict[(cell_row, col_letter)] = value

        # Extract data rows (skip header row)
        compliance_data = []
        for row in range(start_row + 1, end_row + 1):
            fleet = cells_dict.get((row, cols['fleet']), '')

            # Stop if we hit an empty fleet row (end of data)
            if not fleet or fleet.strip() == '':
                continue

            planned = cells_dict.get((row, cols['planned']), '')
            actual = cells_dict.get((row, cols['actual']), '')
            compliance = cells_dict.get((row, cols['compliance']), '')
            target = cells_dict.get((row, cols['target']), '')
            reason = cells_dict.get((row, cols['reason']), '')

            compliance_data.append({
                'fleet': fleet,
                'planned': planned,
                'actual': actual,
                'compliance': compliance,
                'target': target,
                'reason': reason
            })

        return compliance_data


def format_compliance_percentage(compliance_val):
    """Format compliance value as percentage"""
    try:
        float_val = float(compliance_val)
        # Handle values already in percentage format (> 1)
        if float_val > 1:
            float_val = float_val / 100
        percentage = float_val * 100
        return f"{percentage:.1f}%"
    except (ValueError, TypeError):
        # Return as-is if it's an error or text value
        return str(compliance_val) if compliance_val else ""


def extract_compliance_data(site, week_number):
    """Main extraction function"""

    # Find Excel file
    excel_file = find_excel_file(site, week_number)
    if not excel_file:
        print(f"ERROR: Excel file not found for {site} Week {week_number}", file=sys.stderr)
        return False

    print(f"\n{'='*70}")
    print(f"EXTRACTING WEEKLY MAINTENANCE COMPLIANCE")
    print(f"Site: {site.upper()}, Week: {week_number}")
    print("="*70 + "\n")

    try:
        with zipfile.ZipFile(excel_file, 'r') as zf:
            # Find sheet and range
            sheet_path, row_range = find_compliance_sheet(zf, site)
            if not sheet_path:
                print(f"ERROR: Could not find Compliance sheet for {site}", file=sys.stderr)
                return False

            print(f"Reading from: {excel_file}")
            print(f"Sheet: {sheet_path}\n")

            # Read compliance data
            compliance_data = read_compliance_data(zf, sheet_path, row_range, site)

            if not compliance_data:
                print("ERROR: No compliance data found", file=sys.stderr)
                return False

            # Create output file
            week_folder = f"Week {week_number}"
            os.makedirs(week_folder, exist_ok=True)

            # Format output filename
            site_name = site.capitalize()
            output_filename = f"{site_name} Maintenance Compliance - Week{week_number}.csv"
            output_path = os.path.join(week_folder, output_filename)

            # Write CSV
            print(f"Writing {len(compliance_data)} fleet rows to CSV...\n")

            with open(output_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)

                # Header row
                writer.writerow(['Fleet', 'Planned', 'Actual', 'Compliance', 'Target', 'Compliance %', 'Reasons for Non-Compliance'])

                # Data rows
                for row in compliance_data:
                    compliance_pct = format_compliance_percentage(row['compliance'])
                    writer.writerow([
                        row['fleet'],
                        row['planned'],
                        row['actual'],
                        row['compliance'],
                        row['target'],
                        compliance_pct,
                        row['reason'].strip() if row['reason'] else ''
                    ])

            print(f"{'='*70}")
            print("EXTRACTION COMPLETE!")
            print("="*70 + "\n")
            print(f"Successfully created CSV file: {output_filename}\n")
            print(f"Location: {output_path}\n")
            print(f"Fleet entries: {len(compliance_data)}")
            print("\nData includes:")
            print("  - Fleet/Equipment names")
            print("  - Planned vs Actual service counts")
            print("  - Schedule compliance metrics")
            print("  - Compliance target and actual %")
            print("  - Detailed reasons for non-compliance")
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
        description='Extract Weekly Maintenance Compliance from mining site Excel files',
        epilog='Examples:\n  python3 extract_maintenance_compliance.py --site=gloria --week=16\n  python3 extract_maintenance_compliance.py gloria 16',
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
    success = extract_compliance_data(site, week)
    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
