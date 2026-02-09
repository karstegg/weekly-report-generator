---
name: weekly-report-ppt-generator
description: Create the 11-slide weekly engineering PowerPoint using the provided template and data rules.
license: Proprietary
---

## Overview
Use this Skill whenever the user asks for the standard Weekly Engineering Report presentation. Claude should extract data from `./weekly-report-generator/src/data/reportData.ts` (or the relative path the user provides), apply CSV-first validation rules, and produce a PowerPoint based on the furnished template slides located inside this Skill package.

## Workflow Summary
1. Review the data rules in `REFERENCE.md` (CSV-first, trend-chart validation, BEV labeling, HEAL limits).
2. Load `templates/WeeklyReportTemplate.pptx` as the master deck.
3. Duplicate the appropriate layout for each slide (Title, Index, HEAL, Shafts & Winders, N3/N2/Gloria trend + performance, BEV).
4. Populate placeholders using values from `reportData.ts` and supporting CSVs/images.
5. Export the finished file as `Weekly-Report-WeekXX.pptx` in the working directory.

## Slide Mapping
- **Title Slide**: Week number, date range, cover imagery references from `reportData.cover` and `/public/images/WeekXX/`.
- **Index Slide**: Build agenda based on `reportData.sites` order.
- **HEAL Overview**: Use quadrants specified in `reportData.heal`. Respect bullet-count guidance (≤5 per quadrant).
- **Shafts & Winders**: Map production KPIs plus HEAL bullets from `reportData.shaftsAndWinders`.
- **Trend Charts (Slides 5,7,9)**: Insert image paths from each site's `trendChart.src`. Add comment ribbons if `comment` present.
- **Site Performance Slides (6,8,10)**: For each site, populate safety/compliance text, weekly average, equipment availability bars, and key breakdown bullet lists.
- **BEV Slide (11)**: Insert BEV availability/service compliance, breakdown bullets, and battery themes from `reportData.bev`.

## Instructions for Claude
- Always cross-check weekly averages and equipment percentages against trend charts before writing to the deck.
- Highlight below-target availability with amber/red colors per `REFERENCE.md` thresholds.
- When no breakdown is reported but availability is low, insert "No major breakdowns reported" per rule.
- Avoid apostrophes in single-quoted strings when editing source data.
- Keep BEV breakdown and battery theme bullets concise (≤120 chars) to avoid overflow.

## Resources
- `REFERENCE.md`: Detailed rules + checklists.
- `templates/WeeklyReportTemplate.pptx`: Slide master layouts (replace with final template when available).

## Testing Checklist
1. Prompt example: "Use Weekly Report PPT Generator to build Week 20 slides using the current report data." Verify Claude loads this Skill.
2. Confirm generated PPT matches the 11-slide structure and uses correct colors/labels.
3. Update `version` once the template or rules change.
