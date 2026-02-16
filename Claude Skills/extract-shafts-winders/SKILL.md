---
name: extract-shafts-winders
description: Extract Shafts & Winders weekly production and equipment availability data from engineering Excel reports showing tons/hr performance metrics and key equipment availability percentages. Use when preparing shaft and winder system performance analysis for weekly reports.
---

# Shafts & Winders Data Extraction Skill

Automates extraction of production performance and equipment availability data from Shafts & Winders engineering Excel reports into standardized CSV formats for weekly reporting and performance analysis.

## When to Use This Skill

- Extract shaft and winder production metrics (tons/hr data)
- User requests "extract shafts and winders", "shaft production", or "winder performance"
- Preparing production and availability data for weekly reports
- Need to generate CSV files for Shafts & Winders system performance

## Usage

```
/extract-shafts-winders --week=16
/extract-shafts-winders 16
```

## Prerequisites

**Before running extraction:**

1. ✅ Verify Excel file exists in `Week X/` folder
2. ✅ Excel file must be closed (not open in Excel)
3. ✅ Expected file name:
   - **Pattern:** `Weekly Report  Shafts and Winders 2025_*_*-*Oct2025.xlsx`
   - **Example:** `Weekly Report  Shafts and Winders 2025_16_10-16Oct2025.xlsx`

## Data Extraction

The bundled Python script (`extract_shafts_winders.py`) performs:

1. **Auto-detects** correct Excel file and S&W_Eng worksheet
2. **Reads** production performance data (tons/hr metrics)
3. **Extracts** daily and weekly averages for feed rates and actual rates
4. **Captures** equipment availability data for key systems
5. **Generates** two standardized CSV files in `Week X/` folder
6. **Validates** all data captured successfully

## Output Files

Generated in `Week {N}/` directory:

**CSV Files:**
1. `Shafts and Winders Production - Week{N}.csv` - Tons/Hr performance data
2. `Shafts and Winders Availability - Week{N}.csv` - Equipment availability metrics

## Production Data CSV Structure

**File:** `Shafts and Winders Production - Week{N}.csv`

```
Day,Date,Feed Rate,Feed Rate Target,Actual Rate,Tons Hoisted,Hours to Hoist,Delays (Hours)
Friday,45940,679.79,523,406.84,7458.81,18.33,5.67
Saturday,45941,0,523,0,0,0.00,24.00
Sunday,45942,700,523,207.48,339.06,1.63,22.37
Monday,45943,677.81,523,587.62,7320.25,12.46,8.54
Tuesday,45944,704.17,523,384.96,6324.78,16.43,7.57
Wednesday,45945,663.70,523,354.04,6343.36,17.92,6.08
Thursday,45946,668.18,523,436,6638.39,13.75,7.25
Week Average,45943,671.79,523,395.04,6774.51,14.34,11.64
```

**Column Details:**
- **Day:** Day of week (Friday through Thursday)
- **Date:** Excel date serial number
- **Feed Rate:** Average feed rate (tons/hr) - material going into system
- **Feed Rate Target:** Target feed rate (typically 523 t/hr)
- **Actual Rate:** Actual production rate (tons/hr) achieved
- **Tons Hoisted:** Total tons produced that day
- **Hours to Hoist:** Hours available for hoisting (accounting for delays)
- **Delays (Hours):** Total downtime hours that day

**Data Quality Notes:**
- Feed rate 0 indicates no production that day (weekend or shutdown)
- Actual rate reflects actual production efficiency
- All numeric values preserved as decimals
- Delays calculated from system maintenance/breakdown events

## Availability Data CSV Structure

**File:** `Shafts and Winders Availability - Week{N}.csv`

```
Equipment,Friday,Saturday,Sunday,Monday,Tuesday,Wednesday,Thursday,Weekly Average,Target
Tip 61-02 Discharge Conveyor - 65CV01,100.00%,100.00%,100.00%,98.66%,100.00%,96.95%,100.00%,99.13%,95.00%
```

**Column Details:**
- **Equipment:** Key system name (e.g., discharge conveyors, hoisting systems)
- **Day Columns (Fri-Thu):** Daily availability percentage
- **Weekly Average:** Average availability across the week
- **Target:** Target availability percentage (typically 95%)

**Data Quality Notes:**
- Percentages formatted to 2 decimal places
- Values range from 0-100%
- Reflects actual operational availability
- Currently captures primary discharge conveyor; may expand with additional systems

## Example Output Format

### Production Data Example
```
Day,Date,Feed Rate,Feed Rate Target,Actual Rate,Tons Hoisted,Hours to Hoist,Delays (Hours)
Friday,45940,679.79,523,406.84,7458.81,18.33,5.67
Saturday,45941,0.00,523,0.00,0.00,0.00,24.00
Sunday,45942,700.00,523,207.48,339.06,1.63,22.37
Monday,45943,677.81,523,587.62,7320.25,12.46,8.54
Tuesday,45944,704.17,523,384.96,6324.78,16.43,7.57
Wednesday,45945,663.70,523,354.04,6343.36,17.92,6.08
Thursday,45946,668.18,523,436.00,6638.39,13.75,7.25
Week Average,45943,671.79,523,395.04,6774.51,14.34,11.64
```

### Availability Data Example
```
Equipment,Friday,Saturday,Sunday,Monday,Tuesday,Wednesday,Thursday,Weekly Average,Target
Tip 61-02 Discharge Conveyor - 65CV01,100.00%,100.00%,100.00%,98.66%,100.00%,96.95%,100.00%,99.13%,95.00%
```

## Data Locations & Ranges

### S&W_Eng Sheet - Tons/Hr Data
**Range:** A151:J163 (13 rows)

**Row Structure:**
- Row 151: Headers (Date columns B-H for Fri-Thu)
- Row 152: Average Feed Rate t/h
- Row 153: Target Rate (typically 523)
- Row 154: ACTUAL RATE (daily)
- Row 155: DAY labels
- Row 156: DATE labels
- Row 157: HRS PER DAY
- Row 158-159: TOTAL DELAYS (in hours, time format and converted)
- Row 160-161: HRS/DAY TO HOIST
- Row 162: TONS HOISTED
- Row 163: ACTUAL RATE (daily, repeats row 154)

**Daily Columns:**
- B = Friday (date 45940)
- C = Saturday (date 45941)
- D = Sunday (date 45942)
- E = Monday (date 45943)
- F = Tuesday (date 45944)
- G = Wednesday (date 45945)
- H = Thursday (date 45946)
- I = Feed Rate / Total for Week
- J = Average for Week

### S&W_Eng Sheet - Availability Data
**Range:** A166:K169 (4 rows)

**Row Structure:**
- Row 166: DAY headers with dates and additional columns
- Row 167: DATE sub-headers
- Row 168: Equipment names and daily availability data
- Row 169: TARGET availability values

**Daily Columns:**
- B-H = Friday through Thursday availability percentages
- I = AVERAGE FOR WEEK
- J, K = Additional reference columns

## Validation Checks

After extraction, script verifies:
1. ✓ Both CSV files created successfully
2. ✓ Production data has 8 rows (7 days + week average)
3. ✓ All numeric values properly extracted
4. ✓ Availability percentages in 0-100% range
5. ✓ Equipment availability data captured
6. ✓ No corrupted or missing critical data

## Common Issues & Troubleshooting

**Issue:** "Excel file not found"
- **Solution:** Verify file exists in `Week X/` and name contains "Shafts and Winders" and Excel format

**Issue:** "Sheet S&W_Eng not found"
- **Solution:** Check that S&W_Eng sheet exists in workbook

**Issue:** "Production data shows 0 for Saturday/Sunday"
- **Solution:** This is normal - these days typically have no production (scheduled downtime)

**Issue:** "Availability shows >100% or <0%"
- **Solution:** Preserve values as-is from Excel - may indicate measurement anomalies or system issues

**Issue:** "Delays column shows very high values (>20 hours)"
- **Solution:** Indicates significant system downtime that day - data is correct

## Next Steps After Extraction

1. Verify both CSV files created in `Week X/`
2. Spot-check production metrics match Excel
3. Review week's production trend (feed rate vs actual rate)
4. Identify high-delay days for investigation
5. Compare availability to 95% target
6. Use data for comprehensive weekly report analysis

## Technical Implementation Notes

For detailed technical implementation, data extraction methodology, formula interpretation, and numeric formatting details, see `reference.md` in skill directory.
