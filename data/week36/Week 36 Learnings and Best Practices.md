# Week 36 Report Generation - Learnings and Best Practices

## Date: March 9, 2026
## Report Period: 02 Mar - 06 Mar 2026

---

## Python Script Bugs Fixed (Claude Code)

### 1. BEV Script - Identical Data Bug
**Issue:** `extract_bev_data.py` was saving identical data to both DTe and FLe CSV files
**Root Cause:** Script wasn't properly splitting data by column/row for DTe vs FLe
**Fix Applied:** 
- DTe files now use `{'columns': [0, 1, 2]}` for weekly/monthly availability
- FLe files now use `{'columns': [0, 1, 3]}` for weekly/monthly availability
- Per-unit availability uses `{'row_filter': 'DTe'}` and `{'row_filter': 'FLe'}`
**Impact:** Week 36 BEV CSV files were corrected mid-session

### 2. Utility Script - Wrong Sheet Bug
**Issue:** `extract_utility_breakdowns.py` was reading `sheet1.xml` (oldest sheet) instead of active sheet
**Root Cause:** Multi-sheet cumulative workbooks added in Week 36 - script defaulted to first sheet
**Fix Applied:** Added `get_active_sheet_path()` function to read `xl/workbook.xml` and find active sheet
**Impact:** Monday file (02-03-2026) initially extracted Week 35 data instead of Week 36

### 3. Utility Script - Filename Pattern Bug
**Issue:** Glob pattern didn't match new "Utility TMM Breakdown Report" filename format
**Root Cause:** Week 36 changed from "Breakdown report - Utility Section" to "Utility TMM Breakdown Report"
**Fix Applied:** Added fallback pattern: `sorted(utility_dir.glob('Utility TMM Breakdown Report *.xlsx'))`
**Impact:** Script couldn't find Week 36 utility files until pattern updated

---

## Data Format Changes (Week 36)

### Utility Files - New Structure
**Changes:**
- Files now multi-sheet cumulative workbooks (not single-sheet daily files)
- New naming: "Utility TMM Breakdown Report DD-MM-YYYY.xlsx"
- Files placed directly in `data/week36/` (not in subfolder)
- Active sheet must be checked - older sheets contain previous weeks' data

**Verification Required:**
- Always check active sheet date matches filename date
- Monday file anomaly: 02-03-2026 file contained Week 35 data on first sheet
- Use `get_active_sheet_path()` to read correct sheet

### BEV Data - Equipment Swap
**Pattern:** DT0172 is temporary swap for DT0171 (out of production)
**Impact:** DT0172 appears in Week 36 data but may not be permanent fleet member

---

## Critical Data Corrections Made

### 1. BEV Availability Percentages
**Issue:** FL BEV availability was incorrectly set to 83%
**Root Cause:** CSV file had errors that were later corrected
**Correction:** 
- FL BEV: 83% → 87% (from corrected CSV: 87.21%)
- DT BEV: 83% (correct - from CSV: 82.66%)

**Files Updated:**
- `src/data/reportData.ts` - BEV availability section
- `src/components/slides/BevPerformanceSlide.tsx` - Performance summary
- `src/components/slides/BEVDTBreakdownSlide.tsx` - Overall percentage
- `src/components/slides/BEVFLBreakdownSlide.tsx` - Overall percentage

### 2. BEV Breakdown Details (Slides 11 & 12)
**Issue:** Slides showed Week 35 data instead of Week 36
**Examples:**
- DT0172: Showed 72 hours HVIL fault (Week 35) → Corrected to 9.50 hours (Week 36)
- DT0147: Showed 96.74 hours → Corrected to 24.38 hours
- Unit availability percentages all outdated

**Correction:** Updated all unit availability and breakdown details from Week 36 Delays CSV files

### 3. Utility Section Data
**Issue:** Major errors in corrected CSV files required complete re-verification
**Corrections:**
- Daily totals: Monday-Friday availability counts corrected
- Weekly average: 89.1% → 89.3%
- Fleet status: 62 available, 3 unavailable → 61 available, 4 unavailable

### 4. Area/Owner Column in Utility Breakdown Slide
**Issue:** Showing equipment types instead of actual area/owner
**Corrections:**
- "Maverick Double cab" → "Main West / Central"
- "ROROs" → "Logistics"
- "Toyota Landcruiser Minespec" → "Construction / Seam 2"

### 5. N2 Breakdown Details
**Issue:** Generic breakdown text without specific unit details
**Correction:** Added specific units from WhatsApp reports:
- DT: DT121 (Ignition issues), DT122 (OEM to attend)
- HD: HD68 (Feed sling)

---

## Critical Terminology Corrections

### 1. RT = Roof Bolters (NOT Road Trucks)
**Impact:** Affects all site performance slides (N3, N2, Gloria)
**Memory Created:** Always use "Roof Bolters" for RT equipment type

### 2. Seam 2 (NOT Sim 2)
**Impact:** Utility section area names
**Memory Created:** Always use "Seam 2" for this mining area

### 3. HVIL (NOT HBIL/HVEL)
**Context:** BEV electrical faults
**Correct Usage:** HVIL fault (High Voltage Interlock)

---

## Data Source Hierarchy

### Primary Sources (In Order of Authority)
1. **Chart Images** - For display percentages (green boxes)
2. **CSV Files** - For underlying data and breakdown details
3. **HEAL Text Files** - For qualitative context
4. **WhatsApp Reports** - For specific daily breakdown details
5. **Epiroc MD Files** - For BEV battery themes and technical details

### CSV File Corrections Timeline
- Initial CSV files had errors
- Corrected CSV files provided mid-session
- **Lesson:** Always verify CSV data matches chart images before finalizing

---

## Component Architecture Learnings

### Hardcoded vs Dynamic Data
**Issue:** Multiple slides had hardcoded Week 35 data
**Affected Components:**
- `BevPerformanceSlide.tsx` - Performance summary section
- `BEVDTBreakdownSlide.tsx` - Overall %, unit availability, breakdown details
- `BEVFLBreakdownSlide.tsx` - Overall %, unit availability, breakdown details

**Lesson:** These slides need manual updates each week. Consider refactoring to use reportData.ts

### Syntax Errors from Multi-Edit
**Issue:** Extra closing brace `];}` instead of `];` after arrays
**Cause:** Multi-edit tool error when updating breakdown arrays
**Prevention:** Always verify syntax after multi-edit operations

---

## Data Verification Checklist (Established)

### Before Finalizing Report:
1. ✅ BEV availability percentages match corrected CSV files
2. ✅ BEV breakdown slides show current week data (not previous week)
3. ✅ Utility section daily totals match CSV TOTAL rows
4. ✅ Area/Owner column shows actual areas (not equipment types)
5. ✅ Terminology: RT = Roof Bolters, Seam 2 (not Sim 2)
6. ✅ N2/N3/Gloria breakdowns have specific unit details
7. ✅ OEM assistance count matches CSV (count non-empty OEM_Assistance column)
8. ✅ Performance summary sections show current week data

---

## WhatsApp Data Integration

### N2 Production Reports
**Source:** Mteki (27813236850)
**Frequency:** Daily (Monday-Friday)
**Content:** TMM availability, specific breakdowns, production metrics

**Week 36 Findings:**
- Daily reports showed higher availability than weekly chart
- Chart percentages (80.73% DT, 80.90% HD) reflect full week including Wed-Thu drops
- WhatsApp reports provided specific unit details: DT121, DT122, HD68

**Lesson:** WhatsApp reports useful for specific unit details but chart percentages are authoritative for weekly average

---

## File Organization

### Week 36 Data Folder Structure
```
data/week36/
├── PDFs/
│   ├── Production Engineering Weekly Overview Report - Week 36.pdf
│   └── BRMO weekly report 27 February 2026 - 05 March 2026.pdf
├── BEV Data/
│   ├── N3 BEV DTe Weekly Availabilities - Week36.csv
│   ├── N3 BEV FLe Weekly Availabilities - Week36.csv
│   ├── N3 BEV DTe Availability by Unit - Week36.csv
│   ├── N3 BEV FLe Availability by Unit - Week36.csv
│   ├── N3 BEV DTe Delays - Week36.csv
│   ├── N3 BEV FLe Delays - Week36.csv
│   └── Epiroc_BEV_Weekly_Report_Week36_Extracted.md
├── Utility Data/
│   ├── Utility_Section_Weekly_Availability_Week36.csv
│   ├── Utility_Section_All_Breakdowns_Week36.csv
│   └── Utility_Section_Current_Status_Week36.csv
├── HEAL Data/
│   ├── N3 HEAL Page Week36.txt
│   ├── N2 HEAL Page - Week 36.txt
│   └── Gloria HEAL Page Week36.txt
└── Documentation/
    ├── Week 36 Progress Log.md
    └── Week 36 Learnings and Best Practices.md (this file)
```

---

## Git Workflow

### Branch Strategy
- Working branch: `week-36`
- Commits: Incremental with descriptive messages
- Push frequency: After each major correction

### Commit History (Week 36)
1. Initial data compilation
2. Chart alignment corrections (N3, N2, Gloria)
3. BEV CSV data updates
4. HEAL layout adjustments
5. N3 HEAL data updates
6. Terminology corrections (RT, Seam 2)
7. N2 breakdown details from WhatsApp
8. Gloria breakdown details
9. BEV battery themes update
10. Utility section corrections (corrected CSV)
11. BEV breakdown slides Week 36 data
12. Syntax error fixes
13. Area name corrections
14. PDF reports and final data files

---

## Performance Metrics

### Week 36 Key Numbers
- **N3:** 83% (below 85% target)
  - DT: 76%, FL: 77%, HD: 87%, RT: 87%, SR: 78%
- **N2:** 88.09% (above 85% target)
  - DT: 80.73%, FL: 91.12%, HD: 80.90%, RT: 96.10%, SR: 94.68%
- **Gloria:** 87% (above 85% target)
  - DT: 77%, FL: 86%, HD: 93%, RT: 93%, SR: 96%
- **BEV:**
  - DT BEV: 83% (below 85% target)
  - FL BEV: 87% (above 85% target)
- **Utility Section:** 89.3% weekly average

---

## Recommendations for Future Weeks

### 1. Data Validation
- Verify CSV files match chart images before starting
- Cross-reference multiple sources (CSV, charts, HEAL, WhatsApp)
- Check for corrected CSV files mid-session

### 2. Component Refactoring
- Consider making BEV breakdown slides dynamic (pull from reportData.ts)
- Reduce hardcoded data in performance summary sections
- Implement data validation checks in components

### 3. Terminology Standards
- Maintain terminology memory bank
- Add validation for common mistakes (Sim vs Seam, RT meaning)
- Create glossary document

### 4. Workflow Optimization
- Create checklist template for weekly verification
- Automate CSV data extraction where possible
- Standardize WhatsApp data integration process

### 5. Documentation
- Keep weekly learnings log
- Document all data source corrections
- Maintain change log for each week

---

## Success Factors

### What Worked Well
1. Incremental git commits allowed easy rollback if needed
2. Multiple data source cross-referencing caught errors
3. User feedback loop identified issues quickly
4. Memory system preserved critical terminology corrections
5. Structured verification checklist ensured completeness

### Areas for Improvement
1. Initial CSV validation could prevent rework
2. Component architecture needs refactoring for maintainability
3. Automated data extraction would reduce manual errors
4. Better documentation of data source hierarchy upfront

---

## Final Status

✅ All Week 36 data verified and corrected
✅ PDF reports generated and pushed to repository
✅ All terminology corrections applied
✅ Memories created for future reference
✅ Learnings documented for next week

**Report Quality:** Production-ready
**Data Accuracy:** Verified against all source files
**Repository Status:** All files committed and pushed to origin/week-36
