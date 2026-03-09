# Week 36 Progress Log
**Report period:** 27 Feb – 05 Mar 2026

---

## Extraction Status

| Step | Task | Status | Notes |
|------|------|--------|-------|
| 1 | BEV Dataset extraction | ✅ Done | 8 CSVs generated from `BEV_Dataset.xlsx` |
| 2 | Gloria HEAL extraction | ✅ Done | Extracted from `Gloria HEAL Page Week 36.pptx` → `.txt` |
| 3 | N2 HEAL | ✅ Ready | Already provided as `.txt` — no extraction needed |
| 4 | N3 HEAL | ✅ Ready | Already provided as `.txt` — no extraction needed |
| 5 | Utility breakdowns | ✅ Done | 3 CSVs: 32 total breakdowns, 3 current (Friday) |
| 6 | Maintenance Compliance | ✅ Done | Gloria (7 rows), N2 (7 rows), N3 (11 rows) |
| 7 | Primary Equipment Availability | ✅ Done | Gloria (6), N2 (5), N3 (8) equipment types |
| 8 | Epiroc BEV PDF extraction | ✅ Done | Extracted to `Epiroc_BEV_Weekly_Report_Week36_Extracted.md` |
| 9 | Compile `reportData.ts` | ⏳ Pending | All source data now ready |
| 10 | Review generated slides | ⏳ Pending | |

---

## Issues & Fixes This Week

- **Utility file naming changed**: Files named `Utility TMM Breakdown Report DD-MM-YYYY.xlsx` instead of expected `Breakdown report - Utility Section DD-MM-YYYY.xlsx`. Workaround: copied and renamed files before running script.
- **N2 Primary Equipment row range shifted**: Was `(46, 51)`, corrected to `(41, 46)` in `extract_primary_equipment.py`. Script updated permanently.
- **Weekly Reports temp folder**: May still exist due to OneDrive lock — safe to delete manually.

---

## Files Generated This Session

```
Gloria HEAL Page Week36.txt
Gloria Maintenance Compliance - Week36.csv
Gloria Primary Equipment Daily Availabilities - Week36.csv
N2 Maintenance Compliance - Week36.csv
N2 Primary Equipment Daily Availabilities - Week36.csv
N3 Maintenance Compliance - Week36.csv
N3 Primary Equipment Daily Availabilities - Week36.csv
N3 BEV DTe Availability by Unit - Week36.csv
N3 BEV DTe Delays - Week36.csv
N3 BEV DTe Monthly Availabilities - Week36.csv
N3 BEV DTe Weekly Availabilities - Week36.csv
N3 BEV FLe Availability by Unit - Week36.csv
N3 BEV FLe Delays - Week36.csv
N3 BEV FLe Monthly Availabilities - Week36.csv
N3 BEV FLe Weekly Availabilities - Week36.csv
Utility_Section_All_Breakdowns_Week36.csv
Utility_Section_Current_Status_Week36.csv
Utility_Section_Weekly_Availability_Week36.csv
```

---

## Next Session Checklist

- [x] Drop Epiroc BEV PDF into `week-33-report/data/week36/`
- [x] Run `/extract-epiroc-bev-report` skill to extract PDF → markdown
- [ ] Compile all extracted data into `src/data/reportData.ts`
- [ ] Run `npm run dev` and review all slides
- [ ] Adjust data/formatting as needed
