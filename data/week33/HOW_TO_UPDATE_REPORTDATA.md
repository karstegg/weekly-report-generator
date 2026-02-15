# How to Update reportData.ts with Week 33 Data

## Quick Reference Guide

### Files Created:
1. **WEEK_33_EXTRACTED_DATA_SUMMARY.md** - Human-readable summary with all extracted data
2. **week33_for_reportData.json** - JSON format ready for integration
3. **week33_structured_data.json** - Raw structured extraction
4. **extracted_data.json** - Complete raw extraction with all sheets

---

## Step-by-Step Update Process

### 1. Equipment Availability Updates

#### N3 Shaft:
```typescript
// Update N3 equipment availability
n3: {
  equipmentAvailability: {
    HD: 89.2,    // Weekly average: 90.0, 86.0, 89.0, 89.0, 92.0
    RT: 88.4,    // Weekly average: 89.0, 95.0, 97.0, 88.0, 73.0
    SR: 92.4,    // Weekly average: 91.0, 98.0, 97.0, 87.0, 89.0
    DT: {
      diesel: 77.4,     // Weekly average: 85.0, 77.0, 75.0, 76.0, 74.0
      bev: 78.8         // Weekly average: 78.0, 78.0, 79.0, 85.0, 74.0
    },
    FL: {
      diesel: 60.4,     // Weekly average: 58.0, 64.0, 59.0, 58.0, 63.0
      bev: 85.8         // Weekly average: 83.0, 81.0, 90.0, 81.0, 94.0
    }
  }
}
```

#### Nch2 Shaft:
```typescript
// Nch2 - Use service compliance as availability proxy
// OR extract actual availability from different sheet
nch2: {
  serviceCompliance: {
    DT: 100,
    FL: 66.7,    // NOTE: Rescheduled for next week
    HD: 100,
    RT: 100,
    SR_Inspection: 100,
    SupportEquipment: 120  // Exceeded plan
  },
  supportEquipmentAvailability: 94.7  // Overall
}
```

#### Gloria Shaft:
```typescript
gloria: {
  equipmentAvailability: {
    HD: 99.0,
    RT: 88.0,
    SR: 70.0,
    DT: 86.0,
    FL: null  // CHECK MANUALLY - not extracted
  }
}
```

---

### 2. Safety Data Updates

```typescript
safety: {
  week33: {
    // ALL SHAFTS - ZERO INCIDENTS THIS WEEK
    n3: {
      mtc: 0,
      lti: 0,
      pd: 0,
      incidents: 0
    },
    nch2: {
      mtc: 0,
      lti: 0,
      pd: 0,
      incidents: 0
    },
    gloria: {
      mtc: 0,
      lti: 0,
      pd: 0
    }
  },
  ytd: {
    n3: { mtc: 15, lti: 3, pd: 54, incidents: 2 },
    nch2: { mtc: 1, lti: 0, pd: 5, incidents: 0 },
    gloria: { mtc: 2, lti: 1, pd: 6 }
  }
}
```

---

### 3. HEAL Page Updates

```typescript
heal: {
  week33: {
    highlights: [
      "OEM coordinated effort to sort issues on UV137 (Strata and ECS working together)"
    ],
    lowlights: [
      "Only 2/3 charging UVs operational - impacting charging operations",
      "Barloworld site support delays - DT121 standing for 3+ weeks"
    ],
    emergingIssues: [
      "Lack of necessary skills for OEM support team",
      "UV108 requires engine upgrade for CAS L9 compatibility"
    ],
    actions: [
      "Drive actions on Engineers action tracker",
      "Discuss availability contributing factors with team"
    ]
  }
}
```

---

### 4. Production Data Updates

```typescript
production: {
  week33: {
    nch2: {
      rom: {
        mtd_plan: 60105,
        mtd_actual: 52059,
        variance: -8046
      },
      product: {
        mtd_plan: 52058,
        mtd_actual: 41635,
        variance: -10423
      }
    },
    gloria: {
      rom: {
        ytd_plan: 578982,
        ytd_actual: 571307
      },
      product: {
        ytd_plan: 534000,
        ytd_actual: 516113
      }
    }
  }
}
```

---

### 5. Key Equipment Issues / Breakdowns

```typescript
breakdowns: {
  week33: {
    critical: [
      {
        shaft: "N3",
        equipment: "DT121",
        issue: "Standing 3+ weeks - Barloworld support delays",
        status: "CRITICAL"
      },
      {
        shaft: "N3",
        equipment: "Charging UVs",
        issue: "Only 1/3 operational - impacting operations",
        status: "CRITICAL"
      }
    ],
    ongoing: [
      {
        shaft: "N3",
        equipment: "UV137",
        issue: "OEM coordinated effort (Strata/ECS)",
        status: "IN_PROGRESS"
      },
      {
        shaft: "N3",
        equipment: "UV108",
        issue: "Requires engine upgrade for CAS L9",
        status: "PENDING"
      },
      {
        shaft: "Nch2",
        equipment: "UV0053",
        issue: "Out for Level 9 upgrade",
        status: "IN_PROGRESS"
      }
    ],
    n3_equipment: [
      { equipment: "DT145", issue: "Gears faulty" },
      { equipment: "DT148", issue: "Aircon issues" },
      { equipment: "DT171", issue: "A-Frame" },
      { equipment: "DT146", issue: "Isolator faulty" },
      { equipment: "FL101", issue: "Steering problem" },
      { equipment: "FL103", issue: "Equipment issue" }
    ]
  }
}
```

---

### 6. Hydraulic Hose Consumption (N3)

```typescript
hydraulicHoses: {
  week33: {
    n3: {
      total: 214,
      byEquipment: {
        HD: 123,  // Highest - mainly abrasion (88)
        RT: 70,   // Second highest - abrasion (48)
        SR: 14,
        DT: 3,
        FL: 3,
        LD: 1
      },
      byFailureMode: {
        abrasion: 146,
        fitting_damaged: 27,
        service: 27,
        hose_damaged: 7,
        hose_burst: 4
      }
    }
  }
}
```

---

### 7. Service Compliance

```typescript
serviceCompliance: {
  week33: {
    nch2: {
      DT: { planned: 4, actual: 4, compliance: 100 },
      FL: {
        planned: 3,
        actual: 2,
        compliance: 66.7,
        note: "Rescheduled for next week due to availability"
      },
      HD: { planned: 2, actual: 2, compliance: 100 },
      RT: { planned: 4, actual: 4, compliance: 100 },
      support: {
        planned: 5,
        actual: 6,
        compliance: 120,
        note: "Excludes UV0053 (Level 9 upgrade)"
      },
      SR_inspection: { planned: 8, actual: 8, compliance: 100 }
    },
    n3: "CHECK_COMPLIANCE_REPORT_SHEET",
    gloria: "CHECK_COMPLIANCE_REPORT_SHEET"
  }
}
```

---

## Key Metrics Summary for Quick Update

### Best Performers:
- **Gloria HD:** 99.0% availability
- **N3 SR:** 92.4% availability
- **All shafts:** Zero safety incidents this week

### Areas of Concern:
- **N3 FL Diesel:** 60.4% availability (lowest)
- **N3 DT Diesel:** 77.4% availability
- **N3 DT121:** Critical - standing 3+ weeks
- **N3 Charging UVs:** Only 1/3 operational
- **Nch2 Production:** Both ROM and Product showing negative MTD variance

### Maintenance Highlights:
- **N3 Hydraulic Hoses:** 214 total replacements
  - HD: 123 (57% of total)
  - Primary failure: Abrasion (146 hoses)

---

## Manual Verification Needed

1. **N3 Service Compliance:** Check "Compliance Report" sheet rows 6-16
2. **Gloria FL Availability:** Check "Weekly report" sheet
3. **Gloria Service Compliance:** Check "Compliance Report" sheet
4. **Production figures:** Verify alignment with your reporting format

---

## Example Code Snippet

```typescript
export const week33Data = {
  period: "06 Feb - 12 Feb 2026",
  weekNumber: 33,

  // Safety - All zeros this week
  safety: { n3: 0, nch2: 0, gloria: 0 },

  // Equipment Availability
  availability: {
    n3: {
      HD: 89.2, RT: 88.4, SR: 92.4,
      DT_diesel: 77.4, DT_bev: 78.8,
      FL_diesel: 60.4, FL_bev: 85.8
    },
    gloria: {
      HD: 99.0, RT: 88.0, SR: 70.0, DT: 86.0
    },
    nch2: {
      support: 94.7
    }
  },

  // Critical issues
  critical: [
    "DT121 standing 3+ weeks",
    "Charging UVs: only 1/3 operational",
    "FL Diesel N3: 60.4% (low)"
  ]
}
```

---

## Next Steps

1. ✅ Review the summary file: `WEEK_33_EXTRACTED_DATA_SUMMARY.md`
2. ✅ Copy relevant data from: `week33_for_reportData.json`
3. ⚠️ Manually verify the items listed above
4. ✅ Update your `reportData.ts` file
5. ✅ Test the report generation

---

**All extraction complete!** Use the JSON files for programmatic updates or refer to the markdown summary for manual updates.
