# Week 33 Data Requirements

**Week**: 33  
**Date Range**: 02 - 08 February 2026  
**Days**: Monday 02 Feb - Friday 07 Feb 2026

---

## 📁 Required Source Files

### 1. Nchwaning 3 (N3)

#### Excel Report
- **Filename Pattern**: `N3 Eng Report Week 33*.xlsx` or `N3 Eng Report Week 02-08 Feb 2026.xlsx`
- **Location**: Upload to GitHub or place in local data folder
- **Required Sheets**:
  - Weekly Availability Data
  - Maintenance Compliance
  - Equipment Breakdown Details
  - Service Compliance Status

#### HEAL Page
- **Filename Pattern**: `Heal N3 week 02 - 08 Feb 2026.pptx` OR `N3 HEAL Page Week 33.txt`
- **Format**: PowerPoint (.pptx), Text (.txt), or Image (.png)
- **Required Sections**:
  - Highlights (Green)
  - Lowlights (Red)
  - Emerging Issues (Yellow)
  - Priorities (Blue)

#### Weekly Availability Chart
- **Filename**: `N3 Weekly Availability Chart - Week 33.png`
- **Content**: Daily availability trend graph for Week 33

---

### 2. Nchwaning 2 (N2)

#### Excel Report
- **Filename Pattern**: `Nch2 Weekly Report Week 33*.xlsx`
- **Location**: Upload to GitHub or place in local data folder
- **Required Sheets**:
  - Weekly Availability Data
  - Maintenance Compliance
  - Equipment Breakdown Details
  - Service Compliance Status

#### HEAL Page
- **Filename Pattern**: `N2 HEAL Page Week 33.txt` or `.pptx` or `.png`
- **Required Sections**:
  - Highlights
  - Lowlights
  - Emerging Issues
  - Priorities

#### Weekly Availability Chart
- **Filename**: `N2 Weekly Availability Chart - Week 33.png`
- **Content**: Daily availability trend graph for Week 33

---

### 3. Gloria

#### Excel Report
- **Filename Pattern**: `Gloria Eng Report Week 02-08 Feb 2026.xlsx`
- **Location**: Upload to GitHub or place in local data folder
- **Required Sheets**:
  - Weekly Availability Data
  - Maintenance Compliance
  - Equipment Breakdown Details
  - Service Compliance Status

#### HEAL Page
- **Filename Pattern**: `HEAL page (00X).pptx` OR `Gloria HEAL Page Week 33.txt`
- **Required Sections**:
  - Highlights
  - Lowlights
  - Emerging Issues
  - Priorities

#### Weekly Availability Chart
- **Filename**: `Gloria Weekly Availability Chart - Week 33.png`
- **Content**: Daily availability trend graph for Week 33

---

### 4. BEV (Battery Electric Vehicles)

#### BEV Report
- **Filename**: `BEV Weekly Report - Week 33.pdf` or Excel equivalent
- **Location**: Upload to GitHub or place in local data folder
- **Required Data**:
  - DT BEV availability (weekly and per-unit)
  - FL BEV availability (weekly and per-unit)
  - Service compliance percentages
  - Breakdown details with hours
  - Battery themes and issues

---

### 5. Utility Section (N3 Utility Performance)

#### Daily Breakdown Reports (5 files required)
- **Monday**: `Breakdwon report - Utility Section 03-02-2026.xlsx`
- **Tuesday**: `Breakdwon report - Utility Section 04-02-2026.xlsx`
- **Wednesday**: `Breakdwon report - Utility Section 05-02-2026.xlsx`
- **Thursday**: `Breakdwon report - Utility Section 06-02-2026.xlsx`
- **Friday**: `Breakdwon report - Utility Section 07-02-2026.xlsx`

**Note**: Filename has "Breakdwon" (typo from source system)

**Location**: `Week 33/N3 Utility Performance/` folder

**Required Columns**:
- Column B: Area/Owner
- Column D: TMM No.
- Column E: Status (Available/Not Available)
- Column F: Model

---

## 📊 Data Extraction Checklist

### For Each Site (N3, N2, Gloria)

- [ ] Weekly average availability percentage
- [ ] Individual fleet availability (DT, FL, HD, RT, SR)
- [ ] Target percentages for each fleet
- [ ] Safety status (Good/Incident/Concern)
- [ ] Safety incident details (if any)
- [ ] Service compliance status (Good/Issues)
- [ ] Service compliance details and percentages
- [ ] Key equipment breakdowns with details
- [ ] Trend chart comment/analysis

### For HEAL Data (All Sites)

- [ ] 3-4 Highlights with site attribution
- [ ] 3-4 Lowlights with site attribution
- [ ] 3-4 Emerging Issues with site attribution
- [ ] 3-4 Priorities with site attribution

### For BEV Data

- [ ] DT BEV weekly availability percentage
- [ ] FL BEV weekly availability percentage
- [ ] DT BEV service compliance percentage
- [ ] FL BEV service compliance percentage
- [ ] Per-unit availability for each BEV
- [ ] Breakdown details (type, machine ID, comment, hours)
- [ ] Battery themes (3-5 key themes)

### For Utility Section

- [ ] Total available units
- [ ] Total unavailable units
- [ ] Daily tracking data (Mon-Fri) per area
- [ ] Weekly average availability per area
- [ ] Breakdown details (TMM No., Model, Description, Remarks)
- [ ] OEM assistance required count
- [ ] Friday current status snapshot

---

## 🎯 Data Quality Requirements

### Accuracy
- All percentages must be exact (not rounded)
- Equipment IDs must match actual fleet numbers
- Dates must correspond to Week 33 (Feb 2-8, 2026)

### Completeness
- No missing fleet data for any site
- All HEAL sections must have at least 3 entries
- BEV data must include both DT and FL fleets
- Utility section must have all 5 daily reports

### Consistency
- Weekly averages must match calculated values
- Color coding must follow rules:
  - Green: ≥85%
  - Yellow: 80-84%
  - Red: <80%
- Site names must be consistent across all data

---

## 📤 Upload Instructions

### Option 1: GitHub Upload
1. Navigate to: `https://github.com/karstegg/weekly-report-generator/upload/claude/week-33-kyt1z/data/week33`
2. Upload all source files to this location
3. Files will be accessible for automated extraction

### Option 2: Local Folder
1. Create folder: `C:\Users\Alison\OneDrive\AI Projects\WeeklY Report Generator\week-33-report\data-extract`
2. Place all Week 33 source files in this folder
3. Run extraction workflows locally

---

## 🔄 Automated Extraction Workflow

Once files are uploaded, run these commands in sequence:

```bash
# Extract primary equipment data
/extract-primary-equipment gloria 33
/extract-primary-equipment n2 33
/extract-primary-equipment n3 33

# Extract maintenance compliance
/extract-maintenance-compliance gloria 33
/extract-maintenance-compliance n2 33
/extract-maintenance-compliance n3 33

# Extract BEV data (CRITICAL - DO NOT FORGET)
/extract-bev 33

# Extract utility vehicle data
/extract-utility-vehicles 33
/extract-utility-breakdowns 33

# Extract HEAL pages
# (Check for PowerPoint files first, then use Python extraction if needed)

# Validate and integrate
/data-integrator --week=33 --sources=n2,n3,gloria,bev,utility
/report-validator --week=33
```

---

## ⚠️ Common Issues

### Missing Files
- **Issue**: Not all 5 utility daily reports available
- **Solution**: Report will skip utility slides if data incomplete

### PowerPoint HEAL Files
- **Issue**: Cannot read .pptx files directly
- **Solution**: Use Python zipfile extraction method (see CLAUDE.md)

### Excel Structure Changes
- **Issue**: Column locations different from expected
- **Solution**: Manual inspection and adjustment of extraction script

### Empty Compliance Sheets
- **Issue**: N3 Compliance Report sheet may be empty
- **Solution**: This is normal - skip compliance extraction for that site

---

## 📞 Support

If you encounter issues with data extraction or have questions:
1. Check `WEEK_33_COMPLETION_SUMMARY.md` for current status
2. Review `CLAUDE.md` for detailed extraction procedures
3. Verify all source files are in correct format and location

---

**Last Updated**: February 16, 2026  
**Status**: Awaiting Week 33 source data files
