# Windsurf Note — Utility Section Changes (Week 35)

## What Changed in the CSV Extraction

### Previous Method (incorrect)
The extraction script read the **first sheet** of each daily Excel file instead of the date-specific sheet.
This meant all 5 days were showing identical data from a previous week (13 Feb 2026).

Additionally, availability was calculated as a simple binary count:

```
Availability = (Total vehicles - Full breakdowns) / Total vehicles
```

This ignored two things:
1. Vehicles listed as **"Available"** at end of shift but that were **down for part of the day shift** (06:00–14:00). Downtime windows appear in the Remarks column, e.g.:
   > `LD0607 — Petroman - (09:53 - 13:35)`
   That vehicle was down for **3h 42min** out of an 8-hour shift → **53.8% day-shift availability**.

2. **The operation runs 3 shifts per day** (day 06:00–14:00, afternoon 14:00–22:00, night 22:00–06:00). The daily report only captures day-shift incidents. The treatment of afternoon and night shifts depends on the vehicle's EOS status.

---

### New Method (corrected)

1. **Correct sheets used**: Each file's date-specific sheet is now read (e.g. `23 Feb 2026` from `23022026.xlsx`).

2. **Fractional day-shift availability calculated per vehicle**: Time ranges in the Remarks column are parsed (supporting `HH:MM - HH:MM`, `SOS - HH:MM`, `HH:MM - EOS` formats, where SOS = 06:00, EOS = 14:00). Multiple downtime periods per vehicle are summed.

3. **3-shift daily availability applied per EOS status**:

   | EOS Status | Rule | Formula |
   |---|---|---|
   | **Not Available** (red — still broken at EOS) | Afternoon + night also assumed 0% | `daily = day_shift_frac / 3` |
   | **Available** with downtime (green — fixed during shift) | Afternoon + night assumed 100% | `daily = (day_shift_frac + 100% + 100%) / 3` |
   | **Available**, no downtime | Fully available all day | `daily = 100%` |

   Examples:
   - Full day breakdown (0% day, red): 0 / 3 = **0%** daily
   - LD0607 at 53.8% day shift (green, fixed): (53.8 + 100 + 100) / 3 = **84.6%** daily
   - Fully available (100%): **100%** daily

4. **TOTAL availability corrected**:
   ```
   Corrected Availability = Sum(individual vehicle daily availabilities) / Total vehicles
   ```

5. **Breakdowns CSV now has two status types**:
   - `Not Available` — vehicle was still broken at EOS (red in source file)
   - `Partial (X%)` — vehicle was available at EOS but had recorded downtime during the shift

---

## Corrected Availability Figures

| Day | Fleet | Full Breakdowns | Old Availability | **Corrected Availability** |
|-----|-------|----------------|-----------------|---------------------------|
| Monday 23-Feb | 66 | 4 | 93.9% | **90.5%** |
| Tuesday 24-Feb | 66 | 3 | 95.5% | **93.8%** |
| Wednesday 25-Feb | 66 | 8 | 87.9% | **88.3%** |
| Thursday 26-Feb | 66 | 7 | 89.4% | **88.0%** |
| Friday 27-Feb | 66 | 9 | 86.4% | **84.9%** |

> **Weekly average: (90.5 + 93.8 + 88.3 + 88.0 + 84.9) / 5 = 89.1%**

> Note: The old method counted only the day shift and treated Not Available vehicles as 0% for the full day (equivalent to the old `(Total - Breakdowns) / Total` formula). The corrected method accounts for 3 shifts with the correct EOS-status rules — a vehicle broken for the full day shift still contributes 0% daily (not 66.7%), while a vehicle that was down part of the day but fixed at EOS benefits from 100% afternoon and night availability.

> The vehicle type breakdown rows (Maverick Double cab, Toyota Landcruiser Minespec, etc.) retain their original Excel-derived values. Only the **TOTAL row** has been corrected.

---

## How the Slides Need to Be Adapted

### 1. Utility Fleet Status Numbers
Update the fleet status summary to use the corrected figures:
- **Total fleet**: 66 (was 65 — a "Maverick tropper" was missing previously)
- **Friday availability**: 84.9%
- **Weekly availability range**: 84.9% – 93.8%
- **Weekly average**: 89.1%

### 2. Breakdown List Display
The `Utility_Section_All_Breakdowns_Week35.csv` now contains a `Status` column with two possible values:

| Status value | Meaning | Display suggestion |
|---|---|---|
| `Not Available` | Vehicle was broken at EOS — red in source | Red indicator |
| `Partial (X%)` | Available at EOS but had downtime — green in source | Amber indicator with % shown |

Previously only "Not Available" entries existed. **Partial entries should be displayed differently** from full breakdowns — they represent vehicles that recovered during the shift but still lost production time.

### 3. Current Status (Friday) Slide
`Utility_Section_Current_Status_Week35.csv` now includes **both** full breakdowns (9 vehicles) and partial-downtime vehicles (6 vehicles) for Friday 27-Feb. If the slide shows "currently broken down", filter to `Status = 'Not Available'` only. If the slide shows "vehicles with issues this shift", include both.

### 4. Weekly Availability Chart/Metric
If a weekly average is displayed for the Utility Section, use:

```
Weekly avg = (90.5 + 93.8 + 88.3 + 88.0 + 84.9) / 5 = 89.1%
```

---

## CSV File Reference

| File | Contents |
|------|----------|
| `Utility_Section_All_Breakdowns_Week35.csv` | All Not Available + Partial entries across all 5 days (69 rows) |
| `Utility_Section_Current_Status_Week35.csv` | Friday 27-Feb entries only (15 rows: 9 full + 6 partial) |
| `Utility_Section_Weekly_Availability_Week35.csv` | Vehicle-type availability per day; TOTAL row uses corrected fractional availability |
