---
name: extract-bev
description: Extract Battery Electric Vehicle (BEV) data from BEV_Dataset.xlsx Power BI dataset to standardized CSV files for weekly mining engineering reports. Automatically generates 8 CSV files (DTe and FLe weekly/monthly availability, delays, and per-unit performance). Use when preparing weekly report data for Week N BEV analysis.
---

# BEV Data Extraction Skill

Automates extraction of Battery Electric Vehicle performance data from the Power BI connected BEV_Dataset.xlsx file into CSV format for weekly mining engineering reports.

## When to Use This Skill

- User requests BEV data extraction (e.g., `/extract-bev --week=16`)
- Preparing data for weekly reports
- Need to generate BEV CSV files from Power BI dataset
- User mentions "extract BEV", "BEV data", or "BEV CSVs"

## Usage

```
/extract-bev --week=16
```

Or with positional argument:
```
/extract-bev 16
```

## Prerequisites

**Before running extraction:**

1. ✅ Ensure `BEV_Dataset.xlsx` exists in the Weekly Reports root directory
2. ✅ Confirm Power BI data has been refreshed (user must manually refresh from Power BI)
3. ✅ Verify pivot tables are properly formatted in BEV_Dataset.xlsx with:
   - Sheet: "Availaibility-week" (with DTe, FLe columns)
   - Sheet: "Availaibility-month" (with DTe, FLe columns)
   - Sheet: "Availability-perunit_Crnt wk" (with Equipment Type Full, Machine_id, Availability)
   - Sheet: "Delays_DTe_Current Week" (with machine delays data)
   - Sheet: "Delays_FLe_Current Week" (with machine delays data)

## Extraction Process

The bundled Python script (`extract_bev_data.py`) performs the following:

1. **Reads** 5 sheets from BEV_Dataset.xlsx
2. **Transforms** data with proper formatting:
   - Availability percentages: 0.856 → 85.6%
   - Delay hours: Keep as numeric (1.87, 2.68, etc.)
3. **Generates** 8 CSV files in `Week N/` folder
4. **Validates** all files created successfully
5. **Reports** completion with file list

## Output Files

Generated in `Week {N}/` directory:

**DTe (Dump Truck Electric) Data:**
- `N3 BEV DTe Weekly Availabilities - Week{N}.csv` - 53 weeks of weekly availability
- `N3 BEV DTe Monthly Availabilities - Week{N}.csv` - 12 months of monthly availability
- `N3 BEV DTe Availability by Unit - Week{N}.csv` - Individual machine performance (7 units)
- `N3 BEV DTe Delays - Week{N}.csv` - Breakdown details with delay hours

**FLe (Front Loader Electric) Data:**
- `N3 BEV FLe Weekly Availabilities - Week{N}.csv` - 53 weeks of weekly availability
- `N3 BEV FLe Monthly Availabilities - Week{N}.csv` - 12 months of monthly availability
- `N3 BEV FLe Availability by Unit - Week{N}.csv` - Individual machine performance (5 units)
- `N3 BEV FLe Delays - Week{N}.csv` - Breakdown details with delay hours

## Data Format Examples

**Weekly Availability CSV:**
```
Week 1,Jul 05,77.51%,91.80%
Week 2,Jul 12,75.16%,94.85%
```
(Format: Fiscal Week, Week Ending, DTe%, FLe%)

**Delays CSV:**
```
DTe,DT0146,/Equipment/Breakdown Electrical,battery cut off @ battery bay,1.87
DTe,DT0147,/Equipment/Operational Delays,charging,1.98
```
(Format: Equipment Type, Machine_id, Delay Type, Comment, Hours)

## Common Issues & Troubleshooting

**Issue:** "BEV_Dataset.xlsx not found"
- **Solution:** Verify file exists in Weekly Reports directory and Power BI export is complete

**Issue:** "Sheet not found" error
- **Solution:** Check sheet names in BEV_Dataset.xlsx match expected names exactly

**Issue:** Empty or incorrect data
- **Solution:** Ensure Power BI data was refreshed before export and pivot tables are properly configured

**Issue:** "Week folder doesn't exist"
- **Solution:** Skill automatically creates `Week {N}/` folder if missing

## Next Steps

After extraction:
1. Verify all 8 CSV files were created in `Week {N}/`
2. Spot-check data for accuracy
3. Use extracted CSVs for report generation
4. Proceed with N2, N3, Gloria, S&W data extraction if needed

For detailed data specifications and column definitions, see `reference.md`.
