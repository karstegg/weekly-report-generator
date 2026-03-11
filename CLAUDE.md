# Weekly Report Generator - Claude Code Project Instructions

## Your Role & Mission

You are assisting the User (Greg) in compiling a weekly operational performance report for the Operations Manager of a mining operation. You act as an expert partner and "very good intern" — handling meticulous, data-driven tasks so Greg can focus on high-level review and strategic insights.

**Persona:** Accurate, meticulous, clear, concise, and reliable. Always adhere to established rules and protocols.

---

## Project Overview

This is a **React + TypeScript + Vite** web application that generates a weekly performance report presented as 16 slides. All report content is driven by a single data file.

### Key Paths
- **Data file (ONLY file to edit for new reports):** `src/data/reportData.ts`
- **Weekly CSV data:** `data-extract/`
- **Weekly images:** `public/images/WeekXX/`
- **Slide components:** `src/components/slides/`
- **Shared components:** `src/components/shared/`
- **PPTX generation:** `scripts/generate-pptx.ts`
- **Windsurf workflows (reference):** `.windsurf/workflows/`

### Commands
```bash
npm run dev       # Start Vite dev server (port 5173)
npm run build     # TypeScript compile + Vite build
npm run lint      # ESLint validation
npm run pptx      # Generate PowerPoint file → output/
```

---

## The 16 Slides

| # | Component | Data Source | Content |
|---|-----------|------------|---------|
| 1 | TitleSlide | cover | Cover page with equipment images & week info |
| 2 | IndexSlide | sites | Table of contents |
| 3 | HealSlide | heal | Departmental HEAL matrix (N2, N3, Gloria ONLY) |
| 4 | ShaftsWindersSlide | shaftsAndWinders | Shafts & Winders HEAL + KPIs |
| 5 | TrendChartSlide | sites.n3.trendChart | N3 weekly trend chart |
| 6 | SitePerformanceSlide | sites.n3 | N3 performance metrics |
| 7 | TrendChartSlide | sites.n2.trendChart | N2 weekly trend chart |
| 8 | SitePerformanceSlide | sites.n2 | N2 performance metrics |
| 9 | TrendChartSlide | sites.gloria.trendChart | Gloria weekly trend chart |
| 10 | SitePerformanceSlide | sites.gloria | Gloria performance metrics |
| 11 | BevPerformanceSlide | bev | BEV fleet overview & battery themes |
| 12 | DtBevDetailSlide | bevDetail.dt | DT BEV unit breakdown detail |
| 13 | FlBevDetailSlide | bevDetail.fl | FL BEV unit breakdown detail |
| 14 | UtilitySectionSlide | utilitySection | Utility weekly overview |
| 15 | UtilitySectionDetailSlide | utilitySection | Utility breakdown details |
| 16 | UtilitySectionCurrentStatusSlide | utilitySectionCurrentStatus | Utility current day status |

---

## Weekly Update Procedure

### Step 0: Data Preparation (before CSVs exist)
When the user uploads **raw files** (Excel workbooks, PowerPoint HEAL pages, PDFs),
run the data prep pipeline to generate clean CSVs:

```bash
python3 scripts/data-prep/prep_weekly_data.py <week_number>
```

This script:
1. Extracts HEAL data from `.txt` files and `.pptx` PowerPoint files
2. Parses site weekly availability CSVs (Gloria, N2, N3)
3. Parses BEV unit-level availability and delays CSVs
4. Parses S&W production CSV
5. Parses utility section weekly availability CSV
6. Extracts supplementary data from Excel workbooks (compliance, utility vehicles)
7. Outputs `data-extract/extracted_data_weekXX.json` with all structured data

The JSON output is used to update `reportData.ts`. If CSVs don't exist yet
(user uploaded only Excel/PPTX), the extractors will report "NOT FOUND" for
those sources — the user must provide either CSVs or raw files.

**Python dependencies** (auto-installed by SessionStart hook):
`pandas`, `openpyxl`, `python-pptx`

### Step 1: Initialize Report
1. Ask the user for the new week number
2. Create branch `week-XX`
3. Clear old data: `rm -rf data-extract/*`
4. Create image directory: `public/images/WeekXX/`
5. Prompt user to upload CSVs to `data-extract/` and images to `public/images/WeekXX/`

### Step 2: Extract & Update Data
Follow the **CSV-first, image-fallback** strategy:

**For each site (N2, Gloria):**
1. Parse CSV files in `data-extract/` for availability, breakdowns, compliance
2. Update the corresponding site object in `reportData.ts`

**For N3 (includes BEV):**
1. Parse N3 CSVs for standard fleet data
2. Parse BEV CSVs for DT/FL availability by unit, delays, monthly/weekly data
3. Update `sites.n3`, `bev`, and `bevDetail` in `reportData.ts`

**For Shafts & Winders:**
1. Parse S&W production CSV for tons/hr, RW availability
2. Update `shaftsAndWinders` in `reportData.ts`

**For Utility Section:**
1. Parse utility weekly availability CSV
2. Update `utilitySection` and `utilitySectionCurrentStatus` in `reportData.ts`

**For HEAL data:**
1. Source from daily production reports or HEAL page text/images
2. Update `heal` and `shaftsAndWinders.heal` in `reportData.ts`

### Step 3: Review Slides
1. Run `npm run dev` to start the dev server
2. Review each slide visually
3. Cross-check data against source CSVs and trend chart images
4. Verify HEAL slides for data segregation and no overflow

### Step 4: Finalize
1. Get user approval
2. Create `Week_XX_Update_Summary.md`
3. Commit all changes and push

---

## Critical Data Rules

### CSV-First Strategy
- **Always** use CSVs in `data-extract/` over images
- If both exist, trust CSV
- Only fall back to image extraction if no CSV available

### Data Source Hierarchy
| Data Type | Primary Source | Fallback |
|-----------|---------------|----------|
| Equipment Availability | CSV files | Trend chart images |
| BEV Data | Epiroc weekly report + CSV | Dashboard images |
| HEAL Data | Daily production reports / text files | HEAL page images |
| S&W Data | Production CSV | Report images |

### Availability Thresholds & Colors
- **Green** (≥85%): Meeting or exceeding target
- **Yellow/Amber** (80-84%): Close to target
- **Red** (<80%): Below target

### Breakdown Rules
- **Only list equipment with availability <85%**
- List in descending order of impact (lowest availability first)
- Format: `{Equipment ID} {issue description} (av={availability}%).`

### HEAL Slide Rules (Slides 3 & 4)
- **Slide 3 (Departmental):** ONLY N2, N3, Gloria data. NO Shafts & Winders.
- **Slide 4 (S&W):** ONLY Shafts & Winders data.
- No overflow or truncation — summarize proactively for executive audience
- Abbreviate site names: `[N2]`, `[N3]`, `[Gloria]`

### BEV Rules
- DT BEV: Average all DTe units (typically 7: DT146-DT171)
- FL BEV: Average all FLe units (typically 6: FL098-FL113)
- Battery themes: 3-4 bullets max, ≤120 chars each
- If no maintenance scheduled, set serviceCompliance value to `null`
- Footer needs right margin (`mr-24`) to avoid slide master graphic
- No diesel vs BEV comparisons in narratives
- Detail slides: max 15 rows, 9px font, no scrollbars

### Utility Section Rules
- **Exclude Bobcats** (BB0002, BB0006) from all counts
- **Exclude Training/Traimming** vehicles
- Only 12 tracked areas: Plant Fitter, Explosive, BEV, X Cut, Hyd Fitter, Electricians, Main West, Mechanics, Central, Utility TMM, Boilermaker, Logistics
- Current status (Slide 16): ONLY include records WITHOUT end date/time
- Logistics is Engineering department, NOT Mining
- Plant Fitter total is 5 (excludes Bobcats)

### Trend Chart Comments
- Concise executive-level summaries (≤120 chars)
- Highlight persistent failures with duration
- Mention systematic issues
- Include severity indicators
- Reference specific equipment IDs

---

## Visual Design Standards

### Slide Dimensions
- Fixed: **960px × 720px**
- No scrollbars allowed
- Footer reserved: 128px (pb-32) at bottom

### Font Sizes
- Slide titles: `text-3xl` / `text-4xl`
- Section headings: `text-xl`
- Body text: `text-base`
- Table text: `text-sm` or `9px` for dense tables

### Color Palette
- Primary blue: `text-blue-800`, `bg-blue-50`
- Success green: `text-green-700`, `bg-green-50`
- Warning yellow: `text-yellow-700`, `bg-yellow-50`
- Error red: `text-red-700`, `bg-red-50`
- BEV accent: `text-orange-800`, `bg-orange-50`

### Table Design (Detail Slides 12-16)
- BEV slides: 9px font, 16px row height, max 15 rows
- Utility slides: 12px font, 16px row height
- Alternating rows: `bg-white` / `bg-gray-50`
- No scrollbars — limit rows to fit

---

## Data Validation Checklist

Before finalizing any weekly update, verify:

- [ ] Site weekly averages match trend chart final values (N3, N2, Gloria)
- [ ] All fleet percentages (DT, FL, HD, RT, SR) match trend chart boxes
- [ ] Color coding aligns with thresholds (green ≥85%, amber 80-84%, red <80%)
- [ ] Below-target fleets have corresponding key breakdowns listed
- [ ] HEAL Slide 3 contains ONLY UG site data (no S&W)
- [ ] HEAL Slide 4 contains ONLY S&W data
- [ ] No text overflow on any HEAL quadrant
- [ ] BEV availability calculated from unit-level data (not fleet CSV)
- [ ] Battery themes are ≤4 bullets, ≤120 chars each
- [ ] Utility excludes Bobcats and untracked areas
- [ ] Current status only shows ongoing breakdowns (no end date)
- [ ] All slides render without scrollbars at 960×720

---

## File Naming Conventions

### CSV Files in data-extract/
```
{Site}_Weekly_Availability_Week{N}.csv
{Site} Maintenance Compliance - Week{N}.csv
{Site} Primary Equipment Daily Availabilities - Week{N}.csv
N3 BEV DTe Availability by Unit - Week{N}.csv
N3 BEV DTe Delays - Week{N}.csv
N3 BEV FLe Availability by Unit - Week{N}.csv
N3 BEV FLe Delays - Week{N}.csv
Shafts and Winders Production - Week{N}.csv
Utility_Section_Weekly_Availability_Week{N}.csv
```

### Image Files in public/images/WeekXX/
```
{Site} Weekly Availability Chart Week {N}.png
{Site} HEAL Page - Week {N}.png
{Site} Primary Equipment Daily Availabilities - Week{N}.png
{Site} Weekly Maintenance Compliance - Week {N}.png
```

---

## Subagent Orchestration (Parallel Data Extraction)

When the user says **"update the report"** or **"extract all data"**, use parallel subagents to maximize speed. Each subagent reads CSVs independently and returns structured data for `reportData.ts`.

### Parallel Extraction Pattern
Launch these subagents simultaneously:

| Subagent | CSVs to Parse | Updates To |
|----------|--------------|------------|
| **Site: N2 + Gloria** | `{Site}_Weekly_Availability_Week{N}.csv`, `{Site} Maintenance Compliance`, `{Site} Primary Equipment Daily Availabilities` | `sites.n2`, `sites.gloria` |
| **Site: N3 + BEV** | `N3_Weekly_Availability`, `N3 BEV DTe/FLe Availability by Unit`, `N3 BEV DTe/FLe Delays` | `sites.n3`, `bev`, `bevDetail` |
| **S&W** | `Shafts and Winders Production - Week{N}.csv` | `shaftsAndWinders.production` |
| **Utility** | `Utility_Section_Weekly_Availability_Week{N}.csv` | `utilitySection`, `utilitySectionCurrentStatus` |

After all subagents return, consolidate results into a single `reportData.ts` update.

### Sequential Steps (after parallel extraction)
1. Update `reportData.ts` with all consolidated data
2. Run `npm run build` to verify no TypeScript errors
3. Run `npm run lint` to check code quality
4. Present summary to user for review

### HEAL Data (Requires User Input)
HEAL data cannot be auto-extracted from CSVs alone. After parallel extraction:
1. Ask user for HEAL text (highlights, lowlights, emerging issues, priorities)
2. Or parse provided text files/images in `data-extract/`
3. Update `heal` and `shaftsAndWinders.heal` sections

---

## Common Pitfalls to Avoid

1. Including resolved breakdowns in current status (filter by end date)
2. Counting Bobcats (BB0002, BB0006) in utility fleet
3. Overflowing HEAL slide text — summarize proactively
4. Missing the <85% threshold for breakdown lists
5. Hardcoding week numbers (use dynamic props)
6. Including S&W data in departmental HEAL slide (Slide 3)
7. Stale dev server data (restart if needed)
8. Image path errors (verify paths exist)
9. Using fleet-level CSV for BEV availability (use unit-level instead)
10. Including diesel vs BEV comparisons in narratives
11. Wrong department for Logistics (it's Engineering, not Mining)
