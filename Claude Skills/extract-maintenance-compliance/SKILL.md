---
name: extract-maintenance-compliance
description: Extract Weekly Maintenance Compliance data from mining site Excel reports (Gloria, N2, N3) showing planned vs actual services, compliance percentages, and detailed reasons for non-compliance. Use when preparing weekly maintenance tracking and compliance metrics.
---

# Weekly Maintenance Compliance Extraction Skill

Automates extraction of weekly maintenance service compliance data from mining engineering Excel reports into standardized CSV format with comprehensive compliance analysis and non-compliance reasons.

## When to Use This Skill

- Extract weekly maintenance compliance metrics for weekly reports
- User requests "extract maintenance compliance", "service compliance", or "compliance data"
- Preparing data for N2, N3, or Gloria site maintenance analysis
- Need to generate compliance CSV files with breakdown context on service delays

## Usage

```
/extract-maintenance-compliance --site=gloria --week=16
/extract-maintenance-compliance --site=n2 --week=16
/extract-maintenance-compliance --site=n3 --week=16
```

Shorthand:
```
/extract-maintenance-compliance gloria 16
/extract-maintenance-compliance n2 16
/extract-maintenance-compliance n3 16
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

The bundled Python script (`extract_maintenance_compliance.py`) performs:

1. **Auto-detects** correct Excel file and worksheet for target site
2. **Reads** fleet/equipment compliance data from known ranges
3. **Extracts** planned vs actual service counts and compliance percentages
4. **Captures** reasons for non-compliance from comments column
5. **Handles variations** across different site file structures
6. **Generates** standardized CSV in `Week X/` folder
7. **Validates** all data captured successfully

## Output Files

Generated in `Week {N}/` directory:

**Format:** `{Site} Maintenance Compliance - Week{N}.csv`

Examples:
- `Gloria Maintenance Compliance - Week16.csv`
- `N2 Maintenance Compliance - Week16.csv`
- `N3 Maintenance Compliance - Week16.csv`

## CSV Structure & Content

All sites output consistent format:

```
Fleet,Planned,Actual,Compliance,Target,Compliance %,Reasons for Non-Compliance
DT,2,2,1,1,100%,
FL,0,0,0,0,0%,
HD,3,3,1,1,100%,
RT,2,2,1,1,100%,
SR,0,0,0,0,0%,"Multiple equipment IDs and reasons"
Support Equipment,1,1,1,1,100%,
```

### Compliance Reasons Details

**What's captured:**
- Equipment ID(s) that didn't receive service (e.g., "DT0174", "HD0059; HD0066")
- Specific reason for no-show (e.g., "Unit late for service", "Machine is currently on breakdown")
- Service delay or reschedule notes (e.g., "Service moved to next week", "Awaiting parts")

**Format:**
- Semicolon-separated for multiple equipment or reasons
- Empty if service was 100% compliant
- Preserves original text from Excel for full context

**Examples:**
- `"DT0174"` - Single unit reason
- `"HD0059; HD0066"` - Multiple equipment
- `"Machine is currently on breakdown"` - Status reason
- `"RT0047 did not come for service; SR0026 & SR0030 Not in for service"` - Complex multi-unit scenarios
- (empty) - No non-compliance recorded

## Site-Specific Data Locations

### Gloria
**File:** Gloria Eng Report Week *-* * 20*.xlsx
**Sheet:** "Compliance Report" (note: capitalization)
**Range:** A6:M13 (headers at row 6, with visual merging to column AE)

**Fleet Types:** 6 rows
- FL, DT, HD, RT, SR, UV Emulsion Units, Support Equipment

**Column Mapping:**
- A = Empty (left margin)
- B = Fleet / Equipment name
- E = Planned services
- G = Actual services
- I = Schedule Compliance %
- K = Target compliance
- M = Comments/Reasons (visually merged through AE for formatting)

**Data Quality Notes:**
- Some rows may show #DIV/0! in compliance column if Planned=0
- Comments in column M visually extend to AE but actual data is in M only
- File has corrupted shared string references (offset by +7) - script handles auto-correction

### N2
**File:** Nch2 Weekly Report * * 20*.xlsx
**Sheet:** "Compliance report" (lowercase 'r')
**Range:** B6:L13+ (variable rows based on fleet count)

**Fleet Types:** 7 rows
- DT, FL, HD, RT, SR - Service Compliance, Support Equipment, SR - Weekly Inspection

**Column Mapping:**
- B = Fleet / Equipment name
- C = Planned services
- D = Actual services
- E = Schedule Compliance %
- F = Target compliance
- G = Unit late for service (y/n)
- H = Unit book back on time after service (y/n)
- J = Week-end Service
- L = Reasons for Non-Compliance

**Data Quality Notes:**
- Multiple service-related columns (G, H, J) provide detailed tracking
- "SR - Service Compliance" and "SR - Weekly Inspection" are separate rows
- Equipment IDs appear in reasons column

### N3
**File:** N3 Eng Report Week * * -* * 20*.xlsx
**Sheet:** "Compliance Report" (capitalized)
**Range:** B6:M15+ (expanded for BEV fleet)

**Fleet Types:** 9+ rows
- FL(Diesel), DT(Diesel), FL BEV, DT BEV, HD, RT, SR, UV Emulsion Units, Support Equip

**Column Mapping:**
- B = Fleet / Equipment name
- E = Planned services
- G = Actual services
- I = Schedule Compliance %
- K = Target compliance
- M = Comments/Reasons

**Data Quality Notes:**
- Separate rows for BEV and diesel variants (FL/DT have both)
- Extended range may have additional equipment rows
- Comments capture detailed breakdown and service status

## Example Outputs

### Gloria Example
```
Fleet,Planned,Actual,Compliance,Target,Compliance %,Reasons for Non-Compliance
FL,,,#DIV/0!,0.95,#DIV/0!%,
DT,1,1,1,0.95,100%,DT0174
HD,2,2,1,0.95,100%,"HD0059; HD0066"
RT,3,1,0.33,0.95,33.3%,LD0507
SR,,,#DIV/0!,0.95,#DIV/0!%,
UV Emulsion Units,,,#DIV/0!,0.95,#DIV/0!%,
Support Equipment,1,1,1,0.95,100%,Weekly Quality Service Report
```

### N2 Example
```
Fleet,Planned,Actual,Compliance,Target,Compliance %,Reasons for Non-Compliance
DT,2,2,1,1,100%,
FL,0,0,,1,0%,
HD,3,3,1,1,100%,
RT,2,2,1,1,100%,
SR - Service Compliance,0,,0,1,0%,
Support Equipment,1,1,1,1,100%,
SR - Weekly Inspection,8,0,,1,0%,
```

### N3 Example
```
Fleet,Planned,Actual,Compliance,Target,Compliance %,Reasons for Non-Compliance
FL(Diesel),1,0,0,0.95,0%,"Machine is currently on breakdown"
DT(Diesel),1,1,1,0.95,100%,
FL BEV,2,2,1,0.95,100%,
DT BEV,2,2,1,0.95,100%,
HD,5,5,1,0.95,100%,
RT,5,4,0.8,0.95,80%,"RT0047 did not come for service"
SR,5,3,0.6,0.95,60%,"SR0026 & SR0030 Not in for service"
UV Emulsion Units,0,0,,0.95,0%,
Support Equip. Diesel Foreman,0,0,,0.95,0%,
```

## Data Format Details

### Compliance % Calculation
- Displayed as decimal in Excel (e.g., 0.75, 1, 0.33333)
- Converted to percentage format: decimal × 100 = "75%", "100%", "33.3%"
- Rounded to 1 decimal place
- #DIV/0! errors retained as-is if Planned=0

### Target Values
- Gloria: 0.95 (95% target)
- N2: 1 (100% target for most, some 0 for inactive)
- N3: 0.95 (95% target)

### Compliance Status
- "Compliance" field shows count of compliant units
- "Actual" field shows count of units that received service
- When Actual > Compliance, indicates late or rescheduled services

### Non-Compliance Reasons Preservation
- Captures all text exactly as appears in source Excel
- Preserves equipment IDs, status descriptions, and technical notes
- Handles multiple reasons separated by semicolons or commas
- Maintains original case and punctuation for clarity

## Validation Checks

After extraction, script verifies:
1. ✓ CSV file created successfully
2. ✓ Correct number of equipment rows for each site
3. ✓ All values properly extracted (Planned, Actual, Compliance, Target)
4. ✓ Compliance percentages calculated correctly
5. ✓ Non-compliance reasons captured when present
6. ✓ No corrupted or missing critical data

## Common Issues & Troubleshooting

**Issue:** "Excel file not found for site"
- **Solution:** Verify file exists in `Week X/` and name matches pattern

**Issue:** "Sheet not found"
- **Solution:** Check sheet names match exactly:
  - Gloria: "Compliance Report"
  - N2: "Compliance report" (lowercase 'r')
  - N3: "Compliance Report"

**Issue:** "Compliance % shows #DIV/0! or 0% for empty rows"
- **Solution:** This is normal when Planned=0 (no services scheduled). Script captures as-is.

**Issue:** "Compliance % calculations look wrong"
- **Solution:** Script preserves original Excel calculations/formatting. Manual review recommended if values seem off.

**Issue:** "Non-compliance reasons show numeric IDs or partial text"
- **Solution:** Gloria files have corrupted shared strings (offset by +7). Script auto-corrects. If still seeing IDs, file may need re-export.

**Issue:** "Comments column appears cut off or incomplete"
- **Solution:** Gloria comments are visually merged to column AE for layout but data is only in column M. Script extracts correctly from M.

## Next Steps After Extraction

1. Verify CSV file created in `Week X/` with correct filename
2. Spot-check fleet names and compliance percentages match Excel
3. Review non-compliance reasons for context on service delays
4. Use both equipment availability and compliance CSVs for comprehensive weekly analysis
5. Proceed with Primary Equipment Daily Availability extraction if not already complete

## Technical Implementation Notes

For detailed technical implementation, file structure details, merged cell handling, and Gloria shared string correction workaround, see `reference.md` in skill directory.
