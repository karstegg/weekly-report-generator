# Shafts & Winders Data Extraction - Technical Reference

## Implementation Details

### File Detection
The script auto-detects Excel files using glob patterns:
- **Primary Pattern**: `Week X/Weekly Report  Shafts and Winders 2025_*_*-*Oct2025.xlsx`
- **Fallback Pattern**: `Week X/*Shafts*Winders*.xlsx`

This allows flexibility in exact filenames while maintaining pattern consistency.

### Sheet Location Resolution
Sheets are located by:
1. Reading `workbook.xml` to find sheet names and relationship IDs
2. Looking up relationship IDs in `workbook.xml.rels` to get physical sheet paths
3. Exact sheet name matching for "S&W_Eng"

**Known Sheet Name:**
- S&W_Eng (exact match required)

### Data Extraction Process

#### 1. Production Data Range: A151:J163

**Row Structure:**
```
151: Header row with dates
152: Average Feed Rate t/h
153: Target Rate
154: ACTUAL RATE
155: DAY labels (Friday-Thursday)
156: DATE labels
157: HRS PER DAY
158: TOTAL DELAYS IN HRS (time format: HH:MM:SS)
159: TOTAL DELAYS IN HRS_CONVERTED (decimal hours)
160: HRS/DAY TO HOIST
161: HRS/DAY TO HOIST_CONVERTED (decimal hours)
162: TONS HOISTED
163: ACTUAL RATE (repeated)
```

**Column Mapping:**
- A = Row labels
- B = Friday
- C = Saturday
- D = Sunday
- E = Monday
- F = Tuesday
- G = Wednesday
- H = Thursday
- I = Feed Rate / Total for Week (varies by row)
- J = Average for Week (varies by row)

**Data Extraction:**
1. Row 152 Column B-H: Daily average feed rates
2. Row 153 Column B-H or J: Target rate (same for all days)
3. Row 154 Column B-H: Daily actual rates
4. Row 162 Column B-H: Daily tons hoisted
5. Row 161 Column B-H: Hours available to hoist
6. Row 159 Column B-H: Total delays in hours (converted decimal)

#### 2. Availability Data Range: A166:K169

**Row Structure:**
```
166: DAY headers with dates and reference columns
167: DATE sub-headers
168: Equipment availability data (one or more equipment rows)
169: TARGET values
```

**Column Mapping:**
- A = Equipment name or label
- B-H = Friday through Thursday daily percentages
- I = AVERAGE FOR WEEK
- J, K = Additional reference columns (not used in extraction)

**Data Extraction:**
1. Row 168 Column A: Equipment name
2. Row 168 Column B-H: Daily availability percentages (0-100)
3. Row 168 Column I: Weekly average percentage
4. Row 169 Column I: Target percentage (typically 95)

#### 3. Cell Reading
The script builds a dictionary of all cells with:
- Row number + Column letter as key: `(row_num, col_letter)`
- Value with proper type handling:
  - Shared strings: Resolved to actual text from `sharedStrings.xml`
  - Numbers: Preserved as-is (decimals for production metrics, 0-100 for percentages)
  - Text: Returned as-is
  - Errors: Returned as-is if present

#### 4. Numeric Formatting

**Production Data:**
- Feed rates, actual rates, tons hoisted, hours: Formatted to 2 decimal places
- Format: `f"{float_value:.2f}"`
- Examples: 679.79, 406.84, 7458.81

**Availability Data:**
- Percentages formatted with % symbol: `f"{float_value:.2f}%"`
- Format: `99.13%`, `100.00%`, `95.00%`

### Data Quality Notes

#### Production Metrics
- **Saturday/Sunday zeros**: Normal - these are typically scheduled downtime
- **High delay values (>20 hours)**: Indicates equipment breakdown or maintenance
- **Feed rate vs actual rate discrepancy**: Shows operational efficiency loss
- **Decimal precision**: Preserved exactly as stored in Excel

#### Availability Percentages
- **Range**: 0-100%
- **Interpretation**: Percentage of time equipment was operational
- **>100%**: Rare but preserved if present (may indicate measurement anomaly)
- **Target**: Typically 95% for Shafts & Winders systems

### Known Characteristics

#### Time Conversion
- **Input format**: Time values stored in Excel (hours as decimal)
- **Row 158**: TOTAL DELAYS IN HRS shows time format (HH:MM:SS)
- **Row 159**: Same data converted to decimal hours (already converted in source)
- **Script approach**: Uses Row 159 (already decimal) for extraction

#### Equipment Row Identification
- Currently supports extraction from Row 168 only
- Script terminates at Row 169 (TARGET row)
- If multiple equipment rows exist, only first is captured
- Can be extended to handle multiple equipment by scanning rows 168-168+N

#### Date Representation
- Dates stored as Excel serial numbers (e.g., 45940 = specific date)
- Preserved as-is in output CSV
- Not converted to human-readable format (user responsibility)

### Error Handling

Script provides clear error messages for:
- Excel file not found: "ERROR: Excel file not found for Shafts & Winders Week {week_number}"
- Sheet not found: "ERROR: Could not find S&W_Eng sheet"
- Data extraction failures: "ERROR: Extraction failed - {specific error}"

### CSV Output Format

**Production File:**
```
Day,Date,Feed Rate,Feed Rate Target,Actual Rate,Tons Hoisted,Hours to Hoist,Delays (Hours)
Friday,45940,679.79,523.00,406.84,7458.81,18.33,5.67
Saturday,45941,0.00,523.00,0.00,0.00,0.00,24.00
...
Week Average,45943,671.79,523.00,395.04,6774.51,14.34,11.64
```

**Availability File:**
```
Equipment,Friday,Saturday,Sunday,Monday,Tuesday,Wednesday,Thursday,Weekly Average,Target
Tip 61-02 Discharge Conveyor - 65CV01,100.00%,100.00%,100.00%,98.66%,100.00%,96.95%,100.00%,99.13%,95.00%
```

### Performance Characteristics

- **Extraction Time**: < 1 second
- **Memory Usage**: Low (streaming XML parsing)
- **File Size Handling**: Tested on 8MB+ files without issues

### Testing Coverage

Successfully tested on:
- ✅ Weekly Report Shafts and Winders 2025_16_10-16Oct2025.xlsx
- ✅ Production data extraction (tons/hr metrics)
- ✅ Availability data extraction (equipment percentages)
- ✅ Numeric formatting and CSV output

### Future Enhancements

Potential improvements:
1. Support for multiple equipment rows (extend row scanning)
2. Excel date serial number conversion to human-readable format
3. Time format parsing for Row 158 data
4. Support for additional availability metrics/equipment types
5. CSV export of daily delay details
6. Trend analysis across multiple weeks
7. Performance metrics calculations (efficiency ratios)
