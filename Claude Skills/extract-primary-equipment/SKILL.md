---
name: extract-primary-equipment
description: Extract Primary Equipment Daily Availabilities from mining site Excel reports (Gloria, N2, N3) to standardized CSV files. Captures daily availability percentages (Fri-Thu), weekly averages, and detailed breakdown comments explaining reasons for low availability. Use when preparing weekly equipment availability data.
---

# Primary Equipment Daily Availability Extraction Skill

Automates extraction of daily equipment availability data from mining engineering Excel reports into standardized CSV format with comprehensive breakdown analysis for weekly reporting.

## When to Use This Skill

- Extract equipment daily availability data for weekly reports
- User requests "extract primary equipment", "equipment availability", or "daily availabilities"
- Preparing data for N2, N3, or Gloria site analysis
- Need to generate daily availability CSV files with breakdown context

## Usage

```
/extract-primary-equipment --site=gloria --week=16
/extract-primary-equipment --site=n2 --week=16
/extract-primary-equipment --site=n3 --week=16
```

Shorthand:
```
/extract-primary-equipment gloria 16
/extract-primary-equipment n2 16
/extract-primary-equipment n3 16
```

## Prerequisites

**Before running extraction:**

1. ✅ Verify Excel file exists for target site in `Week X/` folder
2. ✅ Excel files must be closed (not open in Excel)
3. ✅ Expected file names:
   - **Gloria:** `Gloria Eng Report Week *-* * 20*.xlsx`
   - **N2:** `Nch2 Weekly Report * * 20*.xlsx`
   - **N3:** `N3 Eng Report Week * * -* * 20*.xlsx`

   **Note:** Year will be 2025 or 2026 depending on fiscal calendar week.

## Data Extraction

The bundled Python script (`extract_primary_equipment.py`) performs:

1. **Auto-detects** correct Excel file and worksheet for target site
2. **Reads** equipment daily availability data from known ranges
3. **Extracts** breakdowns/comments column for context on low availability
4. **Transforms** decimal values to percentages (0.93 → 93.0%)
5. **Handles variations** across different site file structures
6. **Generates** standardized CSV in `Week X/` folder
7. **Validates** all data captured successfully

## Output Files

Generated in `Week {N}/` directory:

**Format:** `{Site} Primary Equipment Daily Availabilities - Week{N}.csv`

Examples:
- `Gloria Primary Equipment Daily Availabilities - Week16.csv`
- `N2 Primary Equipment Daily Availabilities - Week16.csv`
- `N3 Primary Equipment Daily Availabilities - Week16.csv`

## CSV Structure & Content

All sites output consistent format:

```
Equipment,Friday,Monday,Tuesday,Wednesday,Thursday,Average,Breakdowns - Comments
Equipment1,90%,85%,88%,92%,87%,88.4%,"Equipment detail, specific issue location or component"
Equipment2,95%,93%,91%,94%,92%,93.0%,
Equipment3,75%,82%,80%,78%,81%,79.2%,"Multiple issues: Issue1; Issue2 location; Issue3 component"
```

### Breakdown Comments Details

**What's captured:**
- Equipment ID/model number (e.g., "DT120", "HD62")
- Specific issue (e.g., "overspeeding", "engine warning", "water & oil mix")
- Location/context if available (e.g., "@Battery Bay", "@SWD", "at Barloworld")
- Related equipment if applicable

**Format:**
- Semicolon-separated for multiple issues on same day
- Empty if no breakdown recorded
- Preserves original text from Excel for full context

**Examples:**
- `"HD0060 Propshaft"` - Single issue with equipment ID
- `"DT120 overspeeding issue; DT128 aircon"` - Multiple equipment issues
- `"HD62 water & oil mixed, HD52 Engine light warning, HD56 Waiting for ECU"` - Complex issues with multiple units
- `"FL82 SWD box, FL91 Firesupp, FL101 Firesupp"` - Recurring issues across fleet
- (empty) - No breakdowns recorded for that day

## Site-Specific Data Locations

### Gloria
**File:** Gloria Eng Report Week *-* * 20*.xlsx
**Sheet:** "weekly report"
**Range:** A45:H51 (headers at row 45)

**Equipment Types:** HD, RT, SR, DT Diesel, FL Diesel (5 rows)

**Column Mapping:**
- A = Equipment name
- B = Friday
- C = Monday
- D = Tuesday
- E = Wednesday
- F = Thursday
- G = Average
- H = Breakdowns/Comments

### N2
**File:** Nch2 Weekly Report * * 20*.xlsx
**Sheet:** "Eng Weekly report"
**Range:** A42:H48 (headers at row 42)

**Equipment Types:** DT, FL, HD, RT, SR (5 rows)

**Column Mapping:**
- A = Equipment name
- B = Friday
- C = Monday
- D = Tuesday
- E = Wednesday
- F = Thur (note: "Thur" not "Thursday")
- G = Average
- H = Breakdowns/Comments

**Note:** Day header says "Thur" instead of "Thu" - script handles this variation

### N3
**File:** N3 Eng Report Week * * -* * 20*.xlsx
**Sheet:** "Weekly report"
**Range:** A43:H51 (headers at row 43)

**Equipment Types:** HD, RT, SR, DT Diesel, FL Diesel, DT batteries, FL Batteries (8 rows)

**Column Mapping:**
- A = Equipment name
- B = Friday
- C = Monday
- D = Tuesday
- E = Wednesday
- F = Thu
- G = Average
- H = Breakdowns/Comments

## Example Outputs

### Gloria Example
```
Equipment,Friday,Monday,Tuesday,Wednesday,Thursday,Average,Breakdowns - Comments
HD,90.0%,90.0%,91.0%,69.0%,82.0%,84.4%,"HD0060 Propshaft"
RT,94.0%,90.0%,98.0%,96.0%,89.0%,93.4%,
SR,75.0%,91.0%,98.0%,98.0%,90.0%,90.4%,
DT Diesel,59.0%,71.0%,82.0%,70.0%,75.0%,71.4%,"DT0152 Line boring; DT0105 Necrospec"
FL Diesel,81.0%,85.0%,100.0%,98.0%,89.0%,90.6%,
```

### N2 Example
```
Equipment,Friday,Monday,Tuesday,Wednesday,Thursday,Average,Breakdowns - Comments
DT,93.0%,86.0%,83.0%,89.0%,83.0%,86.8%,"DT120 overspeeding issue; DT128 aircon"
FL,93.0%,91.0%,89.0%,93.0%,90.0%,91.2%,
HD,87.0%,96.0%,87.0%,95.0%,95.0%,92.0%,
RT,93.0%,73.0%,92.0%,96.0%,91.0%,89.0%,
SR,67.0%,99.0%,86.0%,95.0%,99.0%,89.2%,
```

### N3 Example
```
Equipment,Friday,Monday,Tuesday,Wednesday,Thursday,Average,Breakdowns - Comments
HD,72.0%,61.0%,64.0%,60.0%,66.0%,64.6%,"HD62 water & oil mixed; HD52 Engine warning; HD56 Waiting for ECU"
RT,90.0%,91.0%,95.0%,92.0%,92.0%,92.0%,
SR,75.0%,86.0%,85.0%,84.0%,77.0%,81.4%,"SR43 W/S; SR24 Aircon pipe leak; SR44 weight bracket broken; SR26 puncture/no operator"
DT Diesel,87.0%,84.0%,85.0%,91.0%,82.0%,85.8%,
FL Diesel,65.0%,60.0%,48.0%,59.0%,60.0%,58.4%,"FL82 SWD box; FL91 Firesupp; FL101 Firesupp"
DT batteries,80.0%,86.0%,83.0%,82.0%,85.0%,83.2%,"DT162 powerless"
FL Batteries,96.0%,88.0%,78.0%,78.0%,92.0%,86.4%,"FL98 Half Arrows/light brackets"
```

## Data Format Details

### Percentage Conversion
- Input: Decimal values (0.93, 0.867, 0.841)
- Output: Percentage with 1 decimal place (93.0%, 86.7%, 84.1%)
- Formula: value × 100, rounded to 1 decimal place

### Day Column Handling
Script auto-detects variations:
- "Fri" or "Friday" → Friday column
- "Mon" or "Monday" → Monday column
- "Tue" or "Tues" or "Tuesday" → Tuesday column
- "Wed" or "Wednesday" → Wednesday column
- "Thu" or "Thur" or "Thursday" → Thursday column

### Average Verification
- Calculated: (Fri + Mon + Tue + Wed + Thu) / 5
- Compared against source "Average" column
- Ensures data integrity

### Breakdown Comments Preservation
- Captures all text exactly as appears in source
- Preserves equipment IDs, locations, technical details
- Handles multiple comments separated by semicolons or commas
- Maintains original case and punctuation for clarity

## Validation Checks

After extraction, script verifies:
1. ✓ CSV file created successfully
2. ✓ Correct number of equipment rows (5 for Gloria/N2, 8 for N3)
3. ✓ All daily values are percentages (0-100% range)
4. ✓ Average calculations match source data
5. ✓ Breakdown comments preserved when present
6. ✓ No corrupted or missing critical data

## Common Issues & Troubleshooting

**Issue:** "Excel file not found for site"
- **Solution:** Verify file exists in `Week X/` and name matches pattern

**Issue:** "Sheet not found"
- **Solution:** Check sheet names match exactly:
  - Gloria: "weekly report"
  - N2: "Eng Weekly report"
  - N3: "Weekly report"

**Issue:** "Data range mismatch - equipment count wrong"
- **Solution:** File structure may have changed; verify Excel file or provide new range

**Issue:** "Empty breakdown column"
- **Solution:** This is normal if no breakdowns recorded; CSV will have empty cells

**Issue:** "Percentage values look wrong (e.g., 9300% instead of 93%)"
- **Solution:** Source Excel may store values differently; script auto-corrects

**Issue:** "Breakdown comments show numeric IDs (e.g., 1111)"
- **Solution:** Gloria files have corrupted shared string references. Script now auto-corrects by detecting out-of-bounds references and applying offset correction (+7). If you still see numeric IDs, file may need re-export from source system.

## Next Steps After Extraction

1. Verify CSV file created in `Week X/` with correct filename
2. Spot-check equipment names and percentages match Excel
3. Review breakdown comments for context on low availability
4. Proceed with Weekly Maintenance Compliance extraction
5. Use both CSVs for comprehensive weekly report generation

## Technical Implementation Notes

For detailed technical implementation, file structure details, and variation handling, see `reference.md` in skill directory.
