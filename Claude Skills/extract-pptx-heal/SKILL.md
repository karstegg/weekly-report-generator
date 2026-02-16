---
name: Extract HEAL Text from PowerPoint
description: Extract HEAL matrix content from PowerPoint slides and save as formatted text files matching N2 HEAL format
---

# Extract HEAL Text from PowerPoint

## When to Use This Skill

Use this skill to extract HEAL content (Highlights, Emerging Issues, Lowlights, Priorities, Actions) from PowerPoint presentations and save them as properly formatted text files. Works with all three mining sites:
- **Gloria** (4x2 table layout)
- **Shafts & Winders** (multi-table layout)
- **N3** (4x2 table layout - same as Gloria)

## Usage

### Via Slash Command (Recommended)

```bash
/extract-pptx-heal gloria 16
/extract-pptx-heal shafts-winders 16
/extract-pptx-heal n3 16
```

### Via CLI

```bash
python extract_pptx_heal.py gloria 16
python extract_pptx_heal.py shafts-winders 16
python extract_pptx_heal.py --site=gloria --week=16
```

## Arguments

- **site**: `gloria`, `shafts-winders`, or `n3` (required)
- **week**: Week number (e.g., 16) (required)

## Prerequisites

- Python 3.10+
- `python-pptx` library (already installed globally)
- PPTX file located in `Week {N}/` directory matching naming convention

## What This Skill Does

### Data Extraction

The script:
1. **Locates** the PPTX file in `Week {N}/` directory
2. **Parses** table structures to identify HEAL sections
3. **Extracts** content under each section header
4. **Organizes** items into standard HEAL categories:
   - Highlights
   - Lowlights
   - Emerging Issues
   - Priorities
   - Actions (if present)
5. **Formats** output with bullet points and section headings
6. **Validates** that content was successfully extracted

### Output Files

The script creates a single text file:

**Format**: `{Site} HEAL Page Week{N}.txt`

**Examples**:
- `Gloria HEAL Page Week16.txt`
- `Shafts and Winders HEAL Page Week16.txt`
- `N3 HEAL Page Week16.txt`

**Location**: `Week {N}/` directory (same as source PPTX)

## Section Content Format

**File Format**: Plain text with line-numbered entries

**Structure**:
```
Highlights
• Item 1
• Item 2

Lowlights
• Item 1

Emerging Issues
• Item 1

Priorities
• Item 1
• Item 2

Actions
• Item 1
```

**Line Numbers**: Read tool displays automatically (e.g., "1→", "2→")

## Site-Specific Data Locations

### Gloria
- **File**: `HEAL page (003).pptx` or similar HEAL page PPTX
- **Table Layout**: 4 rows x 2 columns
  - Row 0: Headers (Highlight | Lowlight)
  - Row 1: Content (Highlights left | Lowlights right)
  - Row 2: Headers (Emerging Issues | Priorities)
  - Row 3: Content (Emerging left | Priorities right)

### N3
- **File**: `Heal N3 week*.pptx` or `N3 HEAL Page*.pptx`
- **Table Layout**: Same as Gloria (4 rows x 2 columns)
  - Row 0: Headers (Highlight | Lowlight)
  - Row 1: Content (Highlights left | Lowlights right)
  - Row 2: Headers (Emerging Issues | Priorities)
  - Row 3: Content (Emerging left | Priorities right)

### Shafts & Winders
- **File**: `SHAFTS AND WINDERS_HEAL_{N}_WEEK_*.pptx`
- **Table Layout**: Multiple single-cell tables, one per section
- **Sections**: Headers in first line (e.g., "Highlights:", "Emerging Issues:")

## Example Outputs

### Gloria Week 16
```
Highlights
• TMM availability increase from 82% to 86%
• DT0152 transported safely to Broncho
• DT0106 transmission was replaced safely

Lowlights
• DT availability 71%
• DT0152 Line boring

Emerging Issues

Priorities
• Steel cord belt splice scanning...
• Stabilis to submit proposal...
```

### N3 Week 15
```
Highlights

Lowlights
• Delayed interventions to diesel fleet by OEM
• BEV FL's and DT's crawling issues

Emerging Issues
• STRATA Technician Resourcing needs alignment

Priorities
• STRATA, BWE resourcing to meet site requirements
```

### Shafts & Winders Week 16
```
Highlights
• WTFitter Team repaired hot water issue
• BM Team replaced bolts on guides

Emerging Issues
• Low compliment of Fitters and Riggers

Lowlights
• Positions taking considerable time to fill

Priorities
• Shaft Repair Work with Solrock Team
```

## Validation Checks

The script performs these quality checks:

- ✓ PPTX file exists and is readable
- ✓ Content extracted contains expected HEAL sections
- ✓ No stray numbering artifacts (1., 2., commas)
- ✓ Output file created successfully
- ✓ All items include bullet points

## Common Issues & Troubleshooting

| Issue | Solution |
|-------|----------|
| "File not found" error | Check PPTX file is in `Week {N}/` directory with correct naming |
| Empty sections extracted | Verify PPTX table structure matches expected layout |
| Stray characters | Script now cleans up numbering artifacts (1,. 2.) automatically |
| Encoding errors | Script uses UTF-8; handles special characters automatically |

## Next Steps After Extraction

1. **Review** the generated text file for accuracy
2. **Verify** all sections contain expected content
3. **Use** in report generation workflow
4. **Archive** in Week folder for audit trail

## Notes

- N2 HEAL content is typically already in text format (manual entry)
- Script tested successfully with Gloria, N3, and Shafts & Winders
- Future weeks can use this skill without modification
- Supports both table-based (Gloria, N3) and multi-table (S&W) layouts
