# Weekly Report PPT Skill Reference

## Data Governance Rules
1. **Single Source of Truth**: Edit `weekly-report-generator/src/data/reportData.ts` only.
2. **CSV-First**: Use CSVs for structured data (availability, compliance, delays). Images/narratives are secondary.
3. **Trend Chart Validation**: Weekly averages and equipment percentages must match trend charts exactly.
4. **N3 Labeling**: Only N3 has dual fleets—use DT-Diesel/FL-Diesel on slides, reserve DT BEV/FL BEV for slide 11.
5. **Safety/Compliance**: Status text must reflect incidents; use "Caution" when any incident is recorded.
6. **HEAL Limits**: ≤5 concise bullets per quadrant, prefix each with site tag (Gloria/N2/N3/All).

## Slide-Level Guidance
- **Title Slide**: Week number, date range, hero images.
- **Index Slide**: List slides 3–11 with short labels.
- **HEAL Overview**: Highlights, Lowlights, Emerging Issues, Priorities per `reportData.heal`.
- **Shafts & Winders**: Tons/hr, RW availability, plus HEAL bullets from `reportData.shaftsAndWinders`.
- **Trend Charts**: Insert PNG from `/public/images/WeekXX`; include blue comment ribbon text if provided.
- **Site Performance**: Safety/compliance cards, weekly average card, five availability bars, key breakdown bullets.
- **BEV Performance**: Availability bars, compliance list, breakdown bullets for DT/FL BEV, battery themes (≤4 bullets).

## Color Thresholds
- Green ≥85%
- Amber 80–84%
- Red <80%
- Shafts & Winders bars: Green if ≥target, Amber if ≥94% of target, else Red.

## Compliance & Safety
- Service compliance text must state which fleets missed service.
- If no incidents, set safety details to "No incidents reported".

## BEV-Specific Rules
- Service compliance sourced from N3 maintenance compliance.
- Breakdown bullets formatted as "Top causes:" / "Top machines:" with unit IDs + durations.
- Battery themes prioritized: replacements, charger faults, connector issues, ratio notes.

## Checklists
### Pre-Generation
- [ ] CSVs copied to `weekly-report-generator/data-extract/`
- [ ] Trend charts for Gloria/N2/N3 available
- [ ] HEAL data summarized to ≤5 bullets per quadrant
- [ ] BEV narrative + CSV delays aligned

### Post-Generation
- [ ] 11 slides present, order correct
- [ ] All percentages match trend charts
- [ ] Colors reflect thresholds
- [ ] BEV and HEAL bullets fit without overflow
- [ ] Saved PPT named `Weekly-Report-WeekXX.pptx`
