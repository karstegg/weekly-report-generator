---
description: Extract equipment and plant performance facts from daily production reports
---

# Extract Daily Performance Facts Workflow

This workflow extracts relevant equipment and plant performance facts from the daily production reports in the GDVault repository to create narrative context for the weekly report.

## Purpose

Extract key facts about equipment breakdowns, performance issues, recovery actions, and root causes from daily production reports to build comprehensive weekly narratives for each site.

## Prerequisites

- Daily production reports exist in: `C:\Users\10064957\My Drive\GDVault\ProductionData\daily_production\data\YYYY-MM\DD\`
- Week number and date range are known
- CSV data and HEAL pages have already been processed

## Workflow Steps

### 1. Identify Report Week Date Range

Determine the exact dates for the report week (typically Sunday to Saturday).

**Example:** Week 16 = Oct 13-19, 2025

### 2. Locate Daily Reports for Each Site

For each site (Gloria, Nchwaning 2, Nchwaning 3, Shafts & Winders), locate daily reports:

```
C:\Users\10064957\My Drive\GDVault\ProductionData\daily_production\data\2025-10\13\2025-10-13 – [Site Name] Daily Report.md
C:\Users\10064957\My Drive\GDVault\ProductionData\daily_production\data\2025-10\14\2025-10-14 – [Site Name] Daily Report.md
...
C:\Users\10064957\My Drive\GDVault\ProductionData\daily_production\data\2025-10\19\2025-10-19 – [Site Name] Daily Report.md
```

### 3. Extract Performance Facts for Each Site

For each site, read all 7 daily reports and extract:

#### Equipment Performance Facts:
- **Persistent failures**: Equipment down for multiple consecutive days (3+ days)
- **Critical breakdowns**: Equipment affecting production targets
- **Root causes**: Specific failure modes (e.g., "check valve failure → water/oil mixing")
- **Recovery actions**: Repairs completed, parts installed, preventive measures implemented
- **Equipment IDs**: Specific units affected (e.g., HD62, FL98, DT162)

#### Performance Trends:
- **Availability trends**: Week-over-week changes (improving/declining)
- **Start-of-shift readiness**: Patterns across the week
- **Weekend performance**: Saturday/Sunday status updates

#### Root Cause Analysis:
- **Systematic issues**: Problems affecting multiple units (e.g., "Strata telematics affecting FL98, FL107, FL113")
- **Recurring problems**: Same equipment failing repeatedly
- **External factors**: Parts availability, supplier issues, technical support delays

### 4. Check for Special Reports

Look for additional context files in the week's folders:

- **BEV Status Reports**: `BEV Status as at YYYY-MM-DD am.md`
- **BEV Weekly Summaries**: `BEV Weekly Executive Summary - Week DD-DD MMM YYYY.md`
- **Specialist Reports**: Any additional analysis or summary files

### 5. Build Site Narratives

For each site, create a narrative structure:

**Format:**
```
Week Summary: [Overall performance vs target]. [Primary fleet issues with specifics]. 
Weekend Update: [Saturday/Sunday status]. [Key changes from Friday]. 
Recovery Plan: [Actions taken]. [Specific repairs/installations]. [Preventive measures].
Current Status: [Monday morning readiness]. [Units operational/down].
```

**Guidelines:**
- Be concise (≤200 characters for comments)
- Include specific equipment IDs
- Mention durations for persistent issues (e.g., "7+ days")
- Include root causes when known
- Show proactive management (preventive measures, expert visits)
- **DO NOT include diesel vs BEV comparisons**
- **DO NOT verify discrepancies with engineers directly** - use the data as-is from reports

### 6. Update reportData.ts

Add extracted narratives to the appropriate fields:

**For Site Performance (N2, N3, Gloria):**
```typescript
trendChart: {
  src: '/images/Week16/[Site] Weekly Availability Chart Week16.png',
  comment: '[Week narrative from extracted facts]'
}
```

**For BEV Fleet:**
```typescript
bev: {
  comment: '[BEV narrative from weekly summary and current status]'
}
```

### 7. Cross-Reference with CSV Data

Verify that extracted narrative facts align with the availability percentages from CSV data:

- If daily reports mention "HD fleet critical," ensure CSV shows HD below 85%
- If narrative mentions "recovery," ensure availability improved from previous week
- Equipment IDs in narrative should match those in breakdown lists

## Example Extraction

**Source:** N3 Daily Reports Oct 13-19, 2025

**Extracted Facts:**
- HD62: Check valve failure → water/oil mixing → drifter failures (persistent, 7+ days)
- HD56: ECU failure, Deutz replacement installed over weekend
- HD52: Drifter replacement due to water ingress, back in operation Monday
- FL98: Strata telematics issues (14+ days ongoing, intermittent)
- FL107, FL113: Also affected by Strata issues
- Preventive measure: Shift inspections implemented for check valves
- Expert visit: EMI specialist scheduled for BEV measurements

**Generated Narrative:**
```
Week Summary: Below target at 81%. HD fleet critical at 64% (water/oil mixing, ECU failures). 
Weekend Update (Oct 19-20): SR improved to 86%, DT to 93%. HD remains critical at 66%. 
Recovery Plan (Oct 20): Major HD issues resolved - HD62 check valve fixed with preventive shift inspections, 
HD56 ECU installed (Deutz setup Wed), HD52 back in operation, HD69 commissioning in progress. 
FL fleet recovered - FL108/113 bucket repairs complete, FL91 harness done, FL121 returned to production.
```

## Key Principles

1. **Primary Source**: Daily production reports in GDVault are the authoritative source
2. **No Diesel Comparisons**: Never include BEV vs diesel performance comparisons
3. **No Direct Engineer Verification**: Use data as documented in reports, don't query engineers for discrepancies
4. **Specificity**: Include equipment IDs, durations, and root causes
5. **Action-Oriented**: Show what's being done, not just what's wrong
6. **Conciseness**: Keep narratives tight for executive audience
7. **Timeline Context**: Include weekend updates and Monday morning status when available

## Integration Point

This workflow is invoked as **Step 2b** in the main `/weekly-report-update` workflow, after CSV extraction but before slide review.

## Output

Updated `reportData.ts` with:
- Site-specific `trendChart.comment` fields populated with weekly narratives
- BEV `comment` field with fleet performance narrative
- All narratives based on factual data from daily production reports
