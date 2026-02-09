---
description: Extract and update BEV fleet data for the weekly report
---

# Update BEV Data Workflow

This workflow guides you through extracting and updating BEV (Battery Electric Vehicle) fleet data from CSV files and updating `reportData.ts`.

## Prerequisites
- BEV CSV files must be present in `data-extract/` folder:
  - `N3 BEV DTe Availability by Unit - Week{N}.csv`
  - `N3 BEV FLe Availability by Unit - Week{N}.csv`
  - `N3 BEV DTe Delays - Week{N}.csv`
  - `N3 BEV FLe Delays - Week{N}.csv`

## Steps

### 1. Read BEV Availability Data
Read the availability by unit CSV files to calculate weekly averages:

```bash
# Files to read:
data-extract/N3 BEV DTe Availability by Unit - Week{N}.csv
data-extract/N3 BEV FLe Availability by Unit - Week{N}.csv
```

**Note**: Both DT and FL units are in the same CSV file. Filter by equipment type prefix (DTe vs FLe).

### 2. Calculate Weekly Availability Percentages
- **DT BEV**: Average all DTe units (typically 7 units including DT146, DT147, DT149, DT150, DT162, DT163, DT171)
- **FL BEV**: Average all FLe units (typically 6 units including FL098, FL099, FL107, FL108, FL112, FL113)

Round to nearest whole percentage.

### 3. Read BEV Delays Data
Read the delays CSV files to identify key breakdown issues:

```bash
# Files to read:
data-extract/N3 BEV DTe Delays - Week{N}.csv
data-extract/N3 BEV FLe Delays - Week{N}.csv
```

### 4. Identify Key Breakdown Issues
**CRITICAL RULES**:
- **Only list equipment with availability <85%**
- List in descending order of impact (lowest availability first)
- Format: `{Equipment ID} {issue description} (av={availability}%).`
- Focus on headline issues that significantly impact fleet performance
- Typical headline issues:
  - DT171 A-frame failures (often 0% availability)
  - FL112 bucket maintenance (often 20% availability)

**Example Format**:
```typescript
{
  equipment: 'DT BEV',
  details: [
    'DT171 A-frame crack/failure (av=0%).',
    'DT149 Strata faults (av=85%).',  // Only if <85%
  ],
}
```

### 5. Extract Battery Themes
From delays data and operational notes, identify:
- Battery pack ratios (B4 vs B5 packs, target 1.6 ratio)
- Battery issues (charging problems, temperature issues, PWM controllers)
- Charger cable status (CCS connector replacements)
- Outstanding campaigns (motor spline grease, connector audits, regen knob)

Keep descriptions concise - remove excessive technical detail.

### 6. Update reportData.ts
Update the BEV section in `src/data/reportData.ts`:

```typescript
bev: {
  name: 'BEV Fleet',
  availability: [
    { label: 'DT BEV', value: {calculated_dt_avg}, target: 85 },
    { label: 'FL BEV', value: {calculated_fl_avg}, target: 85 }
  ],
  serviceCompliance: [
    { label: 'DT BEV', value: null },  // or actual % if available
    { label: 'FL BEV', value: 100 }    // or actual % if available
  ],
  breakdowns: [
    {
      equipment: 'DT BEV',
      details: [
        // Only equipment with av<85%, ordered by impact
      ],
    },
    {
      equipment: 'FL BEV',
      details: [
        // Only equipment with av<85%, ordered by impact
      ],
    },
  ],
  footer: '{Fleet changes or important notes}',  // Optional
  batteryThemes: [
    // 3-4 concise bullet points
  ],
}
```

### 7. Update Footer (if applicable)
If there are fleet changes or critical ongoing issues, add a footer:
- Fleet additions/removals (e.g., "DT172 to be added by Wednesday; DT171 removed for repairs")
- Major ongoing investigations
- Critical parts lead times

**Footer Styling**: The footer has `mr-24` margin to avoid slide master graphic overlap.

### 8. Update BEV Detail Backup Slides
Two additional backup slides provide detailed breakdowns for DT and FL BEV fleets:

**Data Structure** (`reportData.ts`):
```typescript
bevDetail: {
  dt: {
    availability: number,  // Overall DT BEV availability
    unitAvailability: [    // Individual unit availability
      { id: 'DT0146', availability: 100 },
      // ... all DT BEV units
    ],
    breakdownDetails: [    // Detailed breakdown table
      { type: 'DTe', machineId: 'DT0171', comment: 'Issue description', hours: '167.22' },
      // ... all breakdown entries from delays CSV
    ]
  },
  fl: {
    // Same structure for FL BEV
  }
}
```

**Data Sources**:
- Unit availability: `N3 BEV DTe Availability by Unit - Week{N}.csv` and `N3 BEV FLe Availability by Unit - Week{N}.csv`
- Breakdown details: `N3 BEV DTe Delays - Week{N}.csv` and `N3 BEV FLe Delays - Week{N}.csv`

**Important Notes**:
- Both DT and FL units are in the same CSV files - filter by equipment prefix (DTe vs FLe)
- Only top 15 breakdown entries are displayed (most significant first)
- No scrollbars - table is sized to fit on PDF page with 9px font
- Color scheme: Orange accent boxes, blue bars for both DT and FL slides

## Key Learnings

### Data Quality
- CSV files may have duplicate or incorrect data - always verify against availability by unit
- Weekly availability CSV files may show identical data for DT and FL - use unit-level data instead

### Formatting Standards
- **Simple bullet format**: Match other slides (Gloria, N2, N3) - no "Top causes/Top machines" philosophy
- **Availability threshold**: Only list equipment <85%
- **Concise descriptions**: Remove excessive detail and duplication
- **Equipment format**: `{ID} {issue} (av={%}).`

### Common Issues
- **DT171 A-frame failures**: Typically 0% availability, 168+ hours downtime, 60-day parts lead time
- **FL112 bucket repairs**: Typically 20% availability, 130+ hours for weld repairs at boilers
- **Strata faults**: Common across multiple units
- **Battery temperature issues**: FL108 common culprit
- **Charging issues**: FL107 frequent charging problems

### Visual Considerations
- Footer needs right margin (`mr-24`) to avoid slide master graphic
- Keep breakdown lists focused on critical issues only
- Battery themes should be 3-4 concise bullets maximum

## Verification
- [ ] DT BEV and FL BEV availability percentages calculated correctly from unit-level data
- [ ] Only equipment with <85% availability listed in breakdowns
- [ ] Breakdown format matches other slides (simple bullets, not "Top causes/machines")
- [ ] Battery themes are concise (3-4 bullets)
- [ ] Footer added if fleet changes or critical issues exist
- [ ] No duplication or excessive detail in breakdowns
- [ ] BEV detail slides populated with unit availability data (all units)
- [ ] BEV detail slides populated with top 15 breakdown entries from delays CSV
- [ ] Detail slides display without scrollbars (9px font, 16px row height)
- [ ] Both DT and FL detail slides use orange/blue color scheme (not purple)
