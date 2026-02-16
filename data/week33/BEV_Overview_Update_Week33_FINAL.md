# BEV Overview Slide Update - Week 33 (06-12 Feb 2026)

**Report Period:** 06 February 2026 – 12 February 2026  
**Data Sources:** BEV CSV files + Epiroc BRMO Weekly Report  
**Reported By:** Philip Moller (Epiroc)

---

## Week 33 BEV Performance Summary

### DT BEV Fleet Performance
- **Week 33 Availability**: **78%** (Week ending Feb 13, 2026)
- **Target**: 85%
- **Status**: ⚠️ **-7% below target**
- **Trend**: Improving from 75% (Feb 06) → 78% (Feb 13)

### FL BEV Fleet Performance
- **Week 33 Availability**: **85%** (Week ending Feb 13, 2026)
- **Target**: 85%
- **Status**: ✅ **Meets target**
- **Trend**: Declining from 88% (Feb 06) → 85% (Feb 13)

---

## Critical Issue: DT0171 A-Frame Failure 🔴

**Status:** ONGOING BREAKDOWN (Entire Week)

**Impact:**
- A-frame that was previously damaged **failed again**
- Equipment down **all 7 days** (Friday-Thursday)
- Major contributor to DT fleet underperformance

**From CSV Data:**
- Red Stop Lamp @ Battery Bay: **96.00 hours**
- A-Frame Failure: **72.00 hours**
- **Total Impact: 168 hours downtime**

**Action Required:** A-frame needs to be replaced (urgent)

---

## Daily BEV Exceptions Summary (Epiroc Report)

### Friday 06 February 2026
**FL Fleet:**
- **FL0099**: Boilermaker breakdown – Half arrows (4D 3H 34min) 🔴

**DT Fleet:**
- **DT0146**: Electrical – HV cable testing, replaced cable (9H 16min)
- **DT0149**: Strata breakdown (35min)
- **DT0162**: No feedback electrical issues (57min total)
- **DT0171**: Ongoing A-frame breakdown

### Saturday 07 February 2026
**FL Fleet:**
- **FL0112**: Auto electrical – No feedback (2H 27min)

**DT Fleet:**
- **DT0171**: Ongoing A-frame breakdown

### Sunday 08 February 2026
**FL Fleet:**
- **FL0099**: Replace 24V batteries (1D 1H 36min)
- **FL0112**: Strata breakdown (1H 08min)
- **FL0113**: Tyre bay – Replacing tyre (4H 30min)

**DT Fleet:**
- **DT0146**: Air conditioning (55min)
- **DT0147**: Auto electrical – No feedback (2H 37min)
- **DT0171**: Ongoing A-frame breakdown

### Monday 09 February 2026
**FL Fleet:**
- **FL0098**: TCU error (32min)
- **FL0112**: Mechanical – No feedback (3H)

**DT Fleet:**
- **DT0149**: Invertor error, ID runs (21H 02min) 🔴
- **DT0171**: Ongoing A-frame breakdown

### Tuesday 10 February 2026
**FL Fleet:**
- **FL0098**: Auto electrical – No feedback (42min)
- **FL0099**: BMS error, isolation fault on battery VPY00076 (3H 33min)
- **FL0107**: Electrical – No feedback (2H 59min)
- **FL0108**: Electrical – No feedback (42min)
- **FL0113**: Damages – Replaced damaged window (15H 26min) 🔴

**DT Fleet:**
- **DT0171**: Ongoing A-frame breakdown

### Wednesday 11 February 2026
**FL Fleet:**
- **FL0098**: TCU error (7H 26min) + BMS error, recovered to workshop (11H 25min) 🔴
- **FL0099**: BMS error, isolation fault on battery VPY00076 (28min)
- **FL0108**: Electrical – No feedback (2H 12min)
- **FL0113**: Fixed hydraulic oil leak (1H 02min)

**DT Fleet:**
- **DT0149**: Wipers – No feedback (28min)
- **DT0171**: Ongoing A-frame breakdown

### Thursday 12 February 2026
**FL Fleet:**
- **FL0099**: 3rd party fault – Petroman (8H 02min)
- **FL0112**: Strata faults (1H 11min + 5H 08min + 1H 05min = 7H 24min)

**DT Fleet:**
- **DT0146**: Inverter error, ID runs (1H 49min)
- **DT0147**: Battery + electrical issues (21min + 1H 21min)
- **DT0149**: HVIL fault on battery VPX00015
- **DT0162**: HVIL fault, replaced VPX-15 with VPX-17 (7H 35min)
- **DT0163**: Electrical – No feedback (2H 17min)
- **DT0171**: Ongoing A-frame breakdown

---

## Key Breakdown Patterns Identified

### DT Fleet Issues

**1. DT0171 - Critical A-Frame Failure**
- Ongoing all week (168 hours total from CSV)
- Previously damaged, failed again
- Requires replacement

**2. DT0149 - Major Electrical Issues**
- Monday: Invertor error (21H 02min) - longest single breakdown
- Strata breakdown (35min + 8.73 hrs from CSV)
- Wipers (28min + 10.38 hrs from CSV)
- HVIL fault on battery VPX00015
- **Total from CSV: 24.45 hours**

**3. DT0162 - HVIL & Electrical Issues**
- HVIL fault requiring battery swap (VPX-15 → VPX-17): 7H 35min
- Multiple electrical "no feedback" issues: 57min
- Strata breakdown from CSV: 10.63 hours
- **Total from CSV: 10.63 hours**

**4. DT0146 - Electrical Systems**
- HV cable replacement: 9H 16min
- Air conditioning: 55min
- Inverter error: 1H 49min

**5. DT0147 - Auto Electrical**
- Sunday: 2H 37min
- Thursday: Battery + electrical (1H 42min)
- Inverter errors from CSV: 3.31 hours

**6. DT0163 - Electrical**
- Thursday: 2H 17min
- Strata breakdown from CSV: 5.50 hours

### FL Fleet Issues

**1. FL0099 - Extended Boilermaker Work**
- Friday: Half arrows (4D 3H 34min) - **CRITICAL**
- Sunday: Replace 24V batteries (1D 1H 36min)
- Tuesday: BMS error, isolation fault VPY00076 (3H 33min)
- Wednesday: BMS error, isolation fault VPY00076 (28min)
- Thursday: Petroman 3rd party fault (8H 02min)
- **Pattern:** Battery VPY00076 recurring isolation fault

**2. FL0098 - TCU & BMS Errors**
- Monday: TCU error (32min)
- Tuesday: Auto electrical (42min)
- Wednesday: TCU error (7H 26min) + BMS error, recovered to workshop (11H 25min)
- **Total Wednesday: 18H 51min** - Major availability loss

**3. FL0112 - Strata & Mechanical Issues**
- Saturday: Auto electrical (2H 27min)
- Sunday: Strata breakdown (1H 08min)
- Monday: Mechanical (3H)
- Thursday: Multiple Strata faults (7H 24min total)
- **From CSV:** Boilermaker weld bucket (139.95 hours) - likely related to Friday breakdown

**4. FL0113 - Mechanical & Tyre Issues**
- Sunday: Tyre replacement (4H 30min)
- Tuesday: Damaged window replacement (15H 26min)
- Wednesday: Hydraulic oil leak (1H 02min)
- **From CSV:** Transmission issues (7.52 hours)

**5. FL0107 - Electrical**
- Tuesday: No feedback (2H 59min)

**6. FL0108 - Electrical**
- Tuesday: No feedback (42min)
- Wednesday: No feedback (2H 12min)
- **From CSV:** Battery temperature high (7.78 hours)

---

## Battery & Charger Status

### Battery Pack Status (Week 33)

**B4 - ST14 Battery Packs:**
- **Working:** 9 batteries
- **Breakdown:** 1 battery (VPY-00076)
- **Issue:** Isolation fault between contactors and VCB, parts ordered (2 days repair)
- **Impact:** Affecting FL0099 availability (recurring isolation faults)

**B5 - MT42 Battery Packs:**
- **Working:** 11 batteries
- **Breakdown:** 1 battery (VPX-00016) - VPC#3 safe state, waiting on Scania
- **Underground (not commissioned):** 1 battery (VPX-00044)
- **Recent Fix:** VPX-00015 - HV cable replaced 12/02/2026

**Charger Status:**
- **Operational:** 7 out of 8 chargers
- **Faulty:** Charger 2, Module 2 (faulty module pulled out, 3 modules working)
- **DCDC Campaign:** 95% complete - charger stops significantly reduced

### Battery Campaigns Progress

| Campaign | B4 Percentile | B5 Percentile |
|---|---|---|
| DCDC | 95% | 93.33% |
| MH 6.3 | 80% | 0% |
| TMS SW V2.0.3.0 | 20% | 0% |

**Charger SW Campaign (V3.4.7):** 90% complete

---

## Recurring Themes & Root Causes

### DT Fleet
1. **Strata System Breakdowns** - Multiple units (DT0149, DT0162, DT0163)
2. **Auto Electrical 24v Issues** - Primary failure mode
3. **HVIL Faults** - Battery connection issues (DT0149, DT0162)
4. **Inverter Errors** - DT0146, DT0147, DT0149
5. **A-Frame Structural Failure** - DT0171 (critical)

### FL Fleet
1. **BMS Errors & Isolation Faults** - Battery VPY00076 (FL0099)
2. **Strata System Issues** - FL0112 multiple occurrences
3. **TCU Errors** - FL0098 recurring
4. **Boilermaker Work** - Extended repair times (FL0099, FL0112)
5. **Mechanical Issues** - Transmission, hydraulics, tyres

### System-Wide Issues
- **Battery Bay Location:** Multiple electrical failures at Battery Bay
- **3rd Party Faults:** Strata, Petroman causing delays
- **Battery VPY00076:** Recurring isolation fault affecting FL0099
- **"No Feedback" Errors:** Common across both fleets (diagnostic challenge)

---

## Planned Actions (Coming Week)

### Immediate Priorities
1. **DT0171 A-Frame Replacement** - Critical, ongoing all week
2. **Battery VPY00076 Repair** - Isolation fault parts ordered (2 days)
3. **FL0098 Workshop Recovery** - BMS error investigation
4. **Charger 2 Module 2** - Replace faulty module

### Scheduled Maintenance (Week 34: Feb 13-19)

**BEV Equipment:**
- Friday 13: DT0131
- Monday 16: DT0150
- Wednesday 18: DT0163
- Tuesday 17: FL0113
- Thursday 19: FL0107

### Campaigns & Audits
1. **A-Frame Audits:** All dump trucks retaining bolts to be inspected
2. **Auxiliary Motor Spline Grease:** Only DT0147 completed, schedule remaining machines
3. **VCA, VCB Cables & Discharge Resistors:** Parts partially ordered, some in approval
4. **TMS Hyper Care:** Ongoing on all batteries
5. **MH 4.0 Software:** Lab scale tests underway for BEV machines

### Other Sites
**NCH2:**
- Remove cab from new loader, install dummy cab, commission underground
- Commission RT0061 (new close cab machine)

**Gloria:**
- Safety systems audit
- Audit RT0045 and RT0046 (low availability machines)

---

## Passport 360 Compliance (Week 33)

| Area | Compliance |
|---|---|
| BEV Technicians | 96% ✅ |
| CASL9 (Gloria) | 99% ✅ |
| CASL9 (Nch2) | 95% ✅ |
| CAS L9 (Nch3) | 98% ✅ |
| Certiq & Mobilaris N2 | 99% ✅ |
| Certiq & Mobilaris Gloria | 88% ⚠️ |

---

## Recommended BEV Overview Slide Content

### Main KPIs Box
```
┌─────────────────────────────────────┐
│ DT BEV: 78% (Target: 85%) ⚠️ -7%   │
│ FL BEV: 85% (Target: 85%) ✅        │
│ Trend: DT improving ⬆️ | FL stable  │
└─────────────────────────────────────┘
```

### Critical Issues Box
```
🔴 CRITICAL:
• DT0171: A-Frame Failure (ongoing all week, 168 hrs)
• FL0099: Boilermaker work (4D+ downtime)
• Battery VPY00076: Recurring isolation fault

⚠️ MAJOR:
• DT0149: Invertor error (21 hrs single event)
• FL0098: BMS error, recovered to workshop (18.8 hrs Wed)
• Strata System: Multiple units affected
```

### Key Metrics
```
Total DT Downtime: 214+ hours
Total FL Downtime: 156+ hours
Battery Availability: B4: 90% | B5: 92%
Charger Status: 7/8 operational
```

### Action Items
```
1. URGENT: Replace DT0171 A-frame
2. Repair Battery VPY00076 isolation fault (parts ordered)
3. Complete A-frame audit on all DT units
4. Investigate FL0098 BMS errors
5. Address recurring Strata system issues
```

---

## Data Quality Notes

- CSV data shows Week 33 ending Feb 13, 2026
- Epiroc report covers Feb 06-12, 2026
- Some discrepancies in hours between CSV and Epiroc report (different measurement methods)
- CSV captures cumulative delays; Epiroc captures individual incidents
- Both sources confirm DT0171 A-frame as critical issue
- Battery VPY00076 isolation fault confirmed in both sources

---

**Report Generated:** February 16, 2026  
**Data Sources:**
- DTe Weekly.csv, FLe Weekly.csv
- BEV DT Delays.csv, BEV FL Delays.csv
- BEV FL Availability by Unit.csv
- Epiroc_BEV_Weekly_Report_Week33_Extracted.md
