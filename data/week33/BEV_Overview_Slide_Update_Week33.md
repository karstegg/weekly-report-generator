# BEV Overview Slide Update - Week 33 (06-12 Feb 2026)

**Date:** February 16, 2026  
**Source:** BEV CSV files + Epiroc BRMO weekly report

---

## Week 33 BEV Performance Summary

### DT BEV Fleet Performance
- **Week 33 Availability**: **78%** (Week ending Feb 13, 2026)
- **Target**: 85%
- **Status**: ⚠️ **-7% below target**
- **Trend**: Improving from 75% (Feb 06)

**Recent Trend (Last 10 Weeks):**
- Dec 12: 71%
- Dec 19: 83%
- Dec 26: 91% ✅
- Jan 02: 80%
- Jan 09: 69% 🔴
- Jan 16: 63% 🔴
- Jan 23: 81%
- Jan 30: 78%
- Feb 06: 75%
- **Feb 13: 78%** ⬆️ Improving

### FL BEV Fleet Performance
- **Week 33 Availability**: **85%** (Week ending Feb 13, 2026)
- **Target**: 85%
- **Status**: ✅ **Meets target**
- **Trend**: Declining from 88% (Feb 06)

**Recent Trend (Last 10 Weeks):**
- Dec 12: 89% ✅
- Dec 19: 94% ✅
- Dec 26: 99% ✅
- Jan 02: 80%
- Jan 09: 86% ✅
- Jan 16: 91% ✅
- Jan 23: 84%
- Jan 30: 98% ✅
- Feb 06: 88% ✅
- **Feb 13: 85%** ⬇️ Declining but on target

---

## Critical Issues - DT BEV Fleet

### Top 3 Breakdowns (Total: 214.37 hours downtime)

**1. DT0171 - Critical Equipment Failure (168 hours total)**
- **Red Stop Lamp Issue**: 96.00 hours @ Battery Bay
- **A-Frame Failure**: 72.00 hours (CRITICAL)
- **Impact**: Major availability loss for single unit
- **Action Required**: Immediate A-Frame repair/replacement

**2. DT0162 - Strata System Issues (10.63 hours)**
- **Location**: @ 97n 13w NW
- **Issue**: Auto Electrical System - 24v / Strata Breakdown
- **Recurring**: Strata-related issues across fleet

**3. DT0149 - Multiple Electrical Issues (24.45 hours total)**
- Wipers: 10.38 hours
- Strata Breakdown @ Battery Bay: 8.73 hours
- Reverse Alarm @ Battery Bay: 2.72 hours
- Battery Not Connecting @ Battery Bay: 2.25 hours
- Module Error: 0.37 hours
- **Pattern**: Recurring electrical issues, primarily at Battery Bay

### Other Notable Issues

**DT0163 - Strata Breakdown**: 5.50 hours (Strata -14w 111n MW)

**DT0150:**
- No Consumables (ran out of diesel): 2.33 hours @ 9s80w s2s
- Oil Leak @ Battery Bay: 0.32 hours

**DT0147 - Inverter Errors**: 3.31 hours total
- Inverter Error @ MW1 70n: 1.83 hours
- Invertor Error @ Battery Bay: 1.48 hours

---

## Critical Issues - FL BEV Fleet

### Top 3 Breakdowns (Total: 156.61 hours downtime)

**1. FL0112 - Boilermaker Work (139.95 hours) 🔴 CRITICAL**
- **Issue**: Weld Bucket @ Boilers
- **Impact**: Massive availability loss (estimated 20% availability based on similar patterns)
- **Duration**: Extended repair time
- **Action Required**: Expedite boilermaker repairs

**2. FL0108 - Battery Temperature Issues (8.06 hours)**
- Battery Temperature High: 7.78 hours
- Change Battery: 0.28 hours
- **Concern**: Thermal management issue

**3. FL0113 - Mechanical Issues (7.52 hours)**
- Transmission Oil Leak @ Workshop: 3.95 hours
- Transmission Mounting Rubber @ Battery Bay: 3.57 hours
- **Pattern**: Transmission-related failures

### Other Notable Issues

**FL0099 - Electrical**: No Module Contact @ Battery Bay (1.08 hours)

---

## FL BEV Individual Unit Performance (Week 33)

Based on available data (Jan 19-25, 2026 - most recent per-unit data):

| Unit | Availability | Status |
|------|--------------|--------|
| FL0098 | 100% | ✅ Excellent |
| FL0107 | 100% | ✅ Excellent |
| FL0099 | 99% | ✅ Excellent |
| FL0108 | 93% | ✅ Good |
| FL0113 | 89% | ✅ Good |
| FL0112 | 20% | 🔴 Critical (Boilermaker work) |

**Fleet Average**: ~85% (when FL0112 excluded: ~96%)

---

## Key Insights for BEV Overview Slide

### Performance Summary
- **DT BEV**: 78% (improving trend, -7% below target)
- **FL BEV**: 85% (on target, slight decline from previous week)
- **Combined Fleet Status**: Mixed performance

### Critical Actions Required

**Immediate (DT Fleet):**
1. **DT0171 A-Frame Failure** - Urgent repair required (72 hours downtime)
2. **DT0171 Red Stop Lamp** - Electrical issue at Battery Bay (96 hours)
3. **Strata System Reliability** - Multiple units affected (DT0162, DT0149, DT0163)

**Immediate (FL Fleet):**
1. **FL0112 Boilermaker Work** - Expedite bucket welding (139.95 hours downtime)
2. **FL0108 Battery Temperature** - Investigate thermal management system
3. **FL0113 Transmission Issues** - Address oil leak and mounting rubber

### Recurring Themes
- **Battery Bay Issues**: Multiple electrical failures at Battery Bay location
- **Strata System Breakdowns**: Recurring across DT fleet
- **Electrical System (24v)**: Primary failure mode for DT fleet
- **Boilermaker Delays**: Extended repair times impacting FL availability

### Positive Trends
- DT fleet showing improvement (75% → 78%)
- FL fleet maintaining target despite FL0112 critical issue
- FL0098, FL0107 at 100% availability
- Most FL units performing above 89%

---

## Recommended Slide Content Updates

### Main KPIs
```
DT BEV: 78% (Target: 85%) ⚠️ -7%
FL BEV: 85% (Target: 85%) ✅ On Target
```

### Critical Issues Box
```
• DT0171: A-Frame Failure + Red Stop Lamp (168 hrs total)
• FL0112: Boilermaker work - Weld Bucket (139.95 hrs)
• Strata System: Multiple DT units affected
• Battery Bay: Recurring electrical issues
```

### Trend Statement
```
DT Fleet: Improving from 75% to 78% (upward trend)
FL Fleet: Slight decline from 88% to 85% (on target)
```

### Action Items
```
1. Urgent: DT0171 A-Frame repair
2. Expedite: FL0112 boilermaker work
3. Investigate: Strata system reliability
4. Review: Battery Bay electrical infrastructure
```

---

## Data Sources
- `DTe Weekly.csv` - DT BEV weekly availability trends
- `FLe Weekly.csv` - FL BEV weekly availability trends
- `BEV DT Delays.csv` - DT breakdown details and hours
- `BEV FL Delays.csv` - FL breakdown details and hours
- `BEV FL Availability by Unit.csv` - Individual FL unit performance
- `BRMO weekly report 06 February 2026 - 12 February 2026.pdf` - Epiroc service report

---

## Notes
- Week 33 corresponds to Feb 06-12, 2026 (data ending Feb 13)
- DT fleet showing recovery after dip in Jan (63% low point)
- FL fleet consistently above or at target except for FL0112 critical issue
- A-Frame failure on DT0171 is the single largest contributor to DT fleet underperformance
- FL0112 boilermaker work is the single largest contributor to FL fleet downtime
