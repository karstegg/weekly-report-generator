---
description: Generate an editable PowerPoint (.pptx) version of the weekly slide deck.
---

## Generate Editable PPTX Workflow

This workflow exports the Weekly Report Generator slide deck to an **editable** PowerPoint file:
- Text and boxes are created as **PowerPoint shapes/text boxes** (editable).
- Availability trend charts remain **embedded screenshots** (images) as-is.

### Preconditions

- The weekly report data is up to date in:
  - `weekly-report-generator/src/data/reportData.ts`
- All referenced images exist under:
  - `weekly-report-generator/public/` (e.g., `/images/WeekXX/...png`)

### Phase 1: Install dependencies (first time only)

1. Run this from the `weekly-report-generator/` directory:

   ```bash
   npm install
   ```

### Phase 2: Generate the PPTX

1. Run this from the `weekly-report-generator/` directory:

   ```bash
   npm run pptx
   ```

2. Output:

- Default output folder:
  - `weekly-report-generator/output/`
- Default output filename:
  - `Production Engineering Weekly Report - Week <weekNumber>.pptx`
- Safety:
  - If that filename already exists, a non-clobber copy is written (e.g. `(... (1)).pptx`).

### Phase 3: Optional – control output path/name

1. To write to a specific output path/name:

   ```bash
   npm run pptx -- --out "output/Production Engineering Weekly Report - Week <weekNumber>.pptx"
   ```

2. To overwrite an existing file:

   ```bash
   npm run pptx -- --out "output/Production Engineering Weekly Report - Week <weekNumber>.pptx" --overwrite
   ```

### Phase 4: Manual finishing (optional)

1. Open the generated `.pptx` in PowerPoint.
2. Apply any manual layout tweaks (if needed).
3. Save the final file back into `weekly-report-generator/output/` using your preferred naming convention.
