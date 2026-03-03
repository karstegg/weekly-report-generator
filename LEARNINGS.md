# Weekly Report Generator — Learnings & Lessons

> This file captures lessons learned from processing weekly reports. It is shared between Claude Code and Windsurf agents. Both agents should read this at the start of a new week's processing and update it after completing a week.
>
> Last updated: Week 35 (week ending 27 Feb 2026)

---

## 1. Utility Section Extraction

### Always read the date-specific sheet — never sheet[0]
Each daily utility Excel file is a **cumulative workbook** containing sheets from multiple previous weeks (e.g. `13 Feb 26`, `16 Feb 2026`, … `23 Feb 2026`). Sheet[0] is always the oldest sheet — it is **never** the correct one. Always open the sheet whose name matches the report date (e.g. `23 Feb 2026`).

### Use individual daily files, not the final cumulative file
The last file of the week (e.g. `27022026.xlsx`) contains all 5 weekly sheets, but the **intermediate sheets (Mon–Thu) are older versions** — they may have fewer breakdowns than the individual daily files submitted on those days. Always extract from the 5 separate daily files.

### File naming convention (Week 35 pattern)
Files may be uploaded as `Utility TMM Breakdown Report - DDMMYYYY.xlsx`. Rename to `Breakdown report - Utility Section DD-MM-YYYY.xlsx` before running the standard extraction script, or adapt the script's file list directly.

### Sheet layout
- **Rows 3–16, columns A–F**: Individual vehicles (no. / owner / TMM / status / remarks / OEM)
- **Rows 3–16, columns H–K**: Right-side summary block (vehicle type / total / breakdowns / availability %)
- **Rows 17–68**: Individual vehicles only (no right-side block)
- The right-side block rows do **not** map 1:1 to individual vehicle rows — do not try to join them.

---

## 2. Utility Availability Calculation (3-Shift Operation)

The mine operates **3 shifts per day**: Day (06:00–14:00), Afternoon (14:00–22:00), Night (22:00–06:00). The daily report only captures **day-shift incidents**. The correct daily availability formula depends on the vehicle's **EOS (end-of-shift) status**:

| EOS status | Column D value | Afternoon & night assumption | Daily formula |
|---|---|---|---|
| Still broken at EOS | `Not Available` (red) | 0% (breakdown assumed to carry over) | `daily = day_frac / 3` |
| Fixed during shift | `Available` + time range in remarks | 100% each | `daily = (day_frac + 1.0 + 1.0) / 3` |
| No downtime at all | `Available`, blank remarks | 100% each | `daily = 1.0` |

**Day-shift availability** (`day_frac`) is calculated from time ranges parsed out of the Remarks column:
- Supported formats: `HH:MM - HH:MM`, `SOS - HH:MM`, `HH:MM - EOS` (SOS = 06:00, EOS = 14:00)
- Times are clamped to [06:00, 14:00]; multiple downtime periods per vehicle are summed
- `day_frac = max(0, (480 - total_down_minutes) / 480)`

**Fleet availability** for a day:
```
Corrected Availability = Sum(daily_frac per vehicle) / Total vehicles × 100%
```

### Why this matters
The old binary method (`(Total - Breakdowns) / Total`) gave artificially high figures by ignoring partial downtime and using a single-shift denominator. The corrected method with 3-shift rules gives lower, more realistic figures — especially on high-breakdown days.

---

## 3. Primary Equipment — N2 Row Range

The N2 primary equipment script defaults to rows `(42, 48)` which shifts between weeks. **Always verify** the N2 output has exactly 5 rows (DT, FL, HD, RT, SR). If output has only 3 rows, inspect the N2 Excel file to find the correct row range and update the script at:

```
week-33-report/Claude Skills/extract-primary-equipment/extract_primary_equipment.py  ~line 112
```

Known correct ranges:
- Week 34: `(46, 51)`
- Week 35: `(41, 46)`

---

## 4. Reading Historical Chart Values from PNG Images

When regenerating a chart that includes historical bars, **read the bar values carefully from the reference PNG before writing any code**. Bar heights in mine availability charts are easy to misread by ±5–10%. In Week 35, Week 34's fleet average was initially read as 88% but was actually 80% — a significant error that propagated into the chart.

Approach:
1. Read the reference PNG first and list out all values explicitly
2. Cross-check against any available CSV data for the same period
3. Only then write the chart generation script

---

## 5. Gloria Primary Equipment — Chart vs CSV Discrepancy

The `Gloria Primary Equipment Daily Availabilities` CSV is extracted from the Gloria Excel weekly report. The values in the **report slides** may differ from the CSV because the slides use Engineering Availability % sourced directly from a separate system (not the Excel). Do not "correct" the CSV to match the slide chart — they are from different sources and both may be valid. Clarify with the user which source to use for `reportData.ts`.

---

## 6. Partial Availability in Breakdowns CSV

The `Utility_Section_All_Breakdowns` CSV now contains two status types:

| Value | Meaning | Source |
|---|---|---|
| `Not Available` | Broken at EOS (column D = "Not Available") | Red row in Excel |
| `Partial (X%)` | Fixed at EOS but had downtime (column D = "Available" + time range in remarks) | Green row with remarks |

**For Windsurf slide generation**:
- "Currently broken" views → filter `Status = 'Not Available'` only
- "Vehicles with issues" views → include both statuses
- Display `Partial` entries with amber/yellow indicator, showing the day-shift availability %

---

## 7. Script Execution — Windows Path Workarounds

- Use `py scriptname.py` (not `python`) on this machine
- `mklink` (Windows junction) **fails on paths with spaces** — use Python's `os.symlink(..., target_is_directory=True)` instead
- Write scripts to file with the Write tool, then run with Bash — do not use heredoc for scripts containing single quotes
- Scripts expect a specific working directory — always `cd` to the correct folder before running

---

## 8. Week 35 Final Figures (for reference)

### Utility Section
| Day | Fleet | Full Breakdowns | Corrected Availability |
|-----|-------|----------------|----------------------|
| Mon 23-Feb | 66 | 4 | 90.5% |
| Tue 24-Feb | 66 | 3 | 93.8% |
| Wed 25-Feb | 66 | 8 | 88.3% |
| Thu 26-Feb | 66 | 7 | 88.0% |
| Fri 27-Feb | 66 | 9 | 84.9% |
| **Weekly avg** | | | **89.1%** |

### N3 Primary Equipment Fleet Average
- Week 35: 77% (below 85% target)
- MTD Feb (Weeks 33–35): (83 + 80 + 77) / 3 = 80.0%

---

## 9. General Workflow Reminders

- **Claude Code role**: raw data extraction and CSV production only. Do not modify `reportData.ts` or generate slides — that is Windsurf's responsibility.
- **Windsurf role**: compile `reportData.ts` from the CSVs and markdown notes, generate and layout slides.
- **Handoff artefacts**: Claude Code produces CSVs + `WINDSURF_NOTE_*.md` files explaining what changed. Windsurf reads these before building the report.
- **Data folder**: all week data lives in `week-33-report/data/week{N}/` regardless of the week number — the folder name is fixed.
- **N2 HEAL**: usually already in `.txt` format in the data folder. Check if the file is non-empty before re-extracting.
- **Epiroc BEV PDF**: Claude Code reads the PDF natively using the Read tool (no conversion needed). Key sections to extract are listed in the Claude Code memory file.

---

## 10. BEV Breakdown Details — CSV Alignment (Week 35)

### Always verify breakdown details match the source CSV exactly
When updating BEV breakdown slides (DT and FL), cross-reference every entry against the `BEV DT Delays - Week35.csv` and `BEV FL Delays - Week35.csv` files. Common issues found:

1. **Missing high-impact breakdowns**: DT0172 (55% availability, 73.95 hrs total downtime) was completely missing from the breakdown table despite being RED in the availability chart
2. **Incorrect hour totals**: DT0147 showed "Hydraulic oil leak 94.17 hrs" when CSV had two separate entries (Invertor error 72.67 hrs + Hydraulic oil leak 24.07 hrs)
3. **Non-existent entries**: "HV cable fault 20.14 hrs" appeared in the breakdown table but didn't exist in the CSV at all

### Combine related breakdowns for readability
When the same unit has multiple related issues, combine them into a single line:
- ✅ `DT0147: Inverter error and Hydraulic oil leak @ battery bay - 96.74 hrs`
- ❌ Two separate rows for the same unit

### Use correct technical terminology
- **HVIL** = High Voltage Interlock Loop (not HBIL or HVEL)
- **Inverter** (not "Invertor" even if CSV has typo)
- Always use the industry-standard abbreviation when combining entries

---

## 11. Utility Section Breakdown Slides — Weekly vs Current Status (Week 35)

### Slide 13 (Weekly Breakdown Summary) vs Slide 14 (Current Status)
These slides serve different purposes and must show different data:

**Slide 13 — Weekly Breakdown Summary**:
- Shows all areas with **<85% weekly availability**
- Lists the vehicles that caused the low weekly average (even if fixed by Friday)
- Include specific vehicle numbers and brief issue descriptions
- Example: "Main West (70%): LD0520 Front axle (Mon-Tue), LD0611 Lights/Strata (Mon-Tue)"
- ❌ Don't use generic text like "Multiple units down Mon-Thu, recovered by Friday"

**Slide 14 — Current Status (Friday)**:
- Shows only units with **"Not Available" status on Friday** (still broken at end of week)
- Excludes "Partial" units that were fixed during the week
- This is the snapshot of what's still broken going into the next week

### Area naming corrections
- **Seam 2** (not "Sim 2") — verify area names against the CSV

---

## 12. Data Verification Checklist (Windsurf)

Before finalizing any week's report, verify:

1. **Availability charts match CSV green box values exactly** (not approximations)
2. **All RED units in availability charts appear in breakdown tables** with correct hours
3. **Breakdown hours sum correctly** when combining multiple issues for the same unit
4. **Area names match CSV exactly** (e.g., Seam 2, not Sim 2)
5. **Weekly breakdown slide shows <85% areas** with specific vehicle details, not generic text
6. **Current status slide shows only "Not Available" units** from Friday
7. **OEM assistance count is accurate** based on Friday CSV OEM_Assistance column
8. **Technical terminology is correct** (HVIL, Inverter, etc.)
