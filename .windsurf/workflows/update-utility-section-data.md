---
description: Extract and update Utility Section data for the weekly report
---

# Update Utility Section Data Workflow

This workflow guides you through extracting and updating the Utility Section data for slides 14, 15, and 16.

## Overview

The Utility Section consists of three slides:
- **Slide 14**: Weekly performance overview with unavailable/total format
- **Slide 15**: Detailed weekly breakdown table
- **Slide 16**: Current day status (ongoing breakdowns only)

## Data Sources

### Weekly Data (Slides 14 & 15)
- **File**: `data-extract/Utility Section Weekly Report Week{N}.xlsx`
- **Content**: All unavailable units for the week with full details

### Current Status Data (Slide 16)
- **File**: `data-extract/Equipment delays {DD-MM-YYYY} Dayshift.xlsx`
- **Content**: Only units currently on breakdown (no end date/time)
- **Critical Rule**: Exclude any records with an end date/time - these are resolved breakdowns

## Step 1: Extract Weekly Data

From the `Utility Section Weekly Report Week{N}.xlsx` file, extract:

1. **Fleet Status**:
   - Count total available units
   - Count total unavailable units (combine "breakdown" and "not available" statuses)
   - **EXCLUDE Bobcats (BB0002, BB0006)** from the total fleet count

2. **Area Summary**:
   - Group by Area/Owner
   - Count unavailable units per area
   - Estimate total vehicles allocated to each area (if not provided)
   - Format: `unavailable/total` (e.g., "2/5")
   - **Important**: Plant Fitter total should exclude Bobcats (BB0002, BB0006) - count only LD and UV units

3. **Breakdown Details**:
   - **ONLY include units with "Not Available" status**
   - Do NOT include units marked "Available" even if they have breakdown comments
   - Example: LD0610 marked "Available" with comment "Strata (11:37 - 13:25)" should be EXCLUDED
   - Extract all unavailable units with:
     - Area/Owner
     - TMM No.
     - Model
     - Description (EOS/Breakdown status)
     - Remarks/Comment
   - Count units requiring OEM assistance

## Step 2: Extract Current Status Data

From the `Equipment delays {DD-MM-YYYY} Dayshift.xlsx` file:

1. **Filter for ongoing breakdowns**:
   - **ONLY include records without an end date/time**
   - In CSV format, look for `____________________` in the End column
   - Records with end times (e.g., "08:54 - 08:55", "SOS - EOS", "11:36 - EOS", "2026-01-26 11:01") are resolved and should be excluded
   - **Important**: This filtering typically reduces the count significantly (e.g., from 34 total delays to 11 ongoing)

2. **Match equipment to tracked areas**:
   - Only include equipment that belongs to areas in the fleet (exclude untracked equipment)
   - Verify the Area/Owner assignment matches the weekly report structure
   - Cross-reference with the 12 tracked areas: Plant Fitter, Explosive, BEV, X Cut, Hyd Fitter, Electricians, Main West, Mechanics, Central, Utility TMM, Boilermaker, Logistics

3. **Group by Area/Owner**:
   - Count unavailable units per area
   - List unit details: Unit ID and reason/comment
   - Use the actual delay comment from the CSV (e.g., "Oil leak - Drillshop", "U-bolts broken @ mw road")

4. **Calculate total**:
   - Sum all ongoing breakdowns across all areas

## Step 3: Update reportData.ts

Update the data structure in `src/data/reportData.ts`:

### utilitySection (Weekly Data)
```typescript
utilitySection: {
  fleetStatus: {
    available: number,
    unavailable: number,
  },
  areaSummary: [
    { area: string, department: string, unavailable: number, total: number }
  ],
  breakdowns: [
    { area: string, tmmNo: string, model: string, description: string, remarks: string }
  ],
  oemAssistanceRequired: number,
}
```

### utilitySectionCurrentStatus (Current Day Data)
```typescript
utilitySectionCurrentStatus: {
  date: string,  // e.g., "26 January 2026"
  totalUnavailable: number,
  areaStatus: [
    {
      area: string,
      unavailable: number,
      details: [
        { unit: string, reason: string }
      ]
    }
  ]
}
```

## Design Requirements

### Slide 14 (Overview)
- Display fleet status cards (available/unavailable)
- Show overall availability percentage
- Display area summary in 3-column grid
- Format: `unavailable/total` per area

### Slide 15 (Detail)
- Full breakdown table with 5 columns
- Font: 9px
- Row height: 16px
- Header height: 18px
- No scrollbars (limit rows if needed)
- Include OEM assistance note if applicable

### Slide 16 (Current Status)
- 3-column table: Area/Owner, Unavailable count, Details
- Show date in subtitle
- List unit details as "Unit - Reason"
- Summary note showing total unavailable units

## Verification Checklist

- [ ] Weekly fleet status totals are correct
- [ ] Area summary shows unavailable/total format for all areas
- [ ] All weekly breakdown details are included in slide 15
- [ ] Current status only includes units without end date/time
- [ ] Current status date is correct
- [ ] No scrollbars appear on any slide
- [ ] All three slides render correctly in print preview

## Equipment Exclusions

**CRITICAL: The following equipment types must be EXCLUDED from all Utility Section reporting:**

1. **Bobcats (BB prefix)**:
   - BB0002, BB0006 - These are not counted in the fleet
   - Reason: Bobcats are tracked separately and not part of the utility TMM fleet
   - Impact: Plant Fitter total is 5 units (not 7) when Bobcats are excluded

2. **Training/Traimming vehicles**:
   - Do not include Training Center or Traimming area in the area summary
   - These are excluded from operational reporting

3. **Untracked equipment**:
   - Some equipment in the delays CSV may not belong to tracked areas
   - Only include equipment assigned to the 12 tracked areas

**Department Assignments (verify these are correct):**
- **Plant**: Plant Fitter
- **Mining**: Explosive, X Cut, Main West, Central
- **Engineering**: BEV, Hyd Fitter, Electricians, Mechanics, Utility TMM, Boilermaker, Logistics

**Note**: Logistics is part of Engineering, NOT Mining

## Common Issues

1. **Including resolved breakdowns in current status**: Always check for end date/time and exclude those records
2. **Missing total vehicle counts**: Estimate based on typical fleet sizes if not provided in source data
3. **Incorrect unavailable count**: Ensure "breakdown" and "not available" statuses are combined
4. **OEM assistance count**: Verify this is tracked separately in the weekly report
5. **Counting Bobcats**: Remember to exclude BB0002 and BB0006 from all counts
6. **Wrong department for Logistics**: Logistics is Engineering, not Mining
7. **Over-counting current status**: The CSV shows ALL delays, but only those without end times are ongoing
