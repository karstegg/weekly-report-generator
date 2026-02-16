# BEV Data Format Reference

Detailed specifications for BEV data extraction and CSV formats.

## Data Source: BEV_Dataset.xlsx

Power BI connected Excel file with 5 sheets containing Battery Electric Vehicle performance data.

### Sheet 1: Availaibility-week
**Purpose:** Weekly availability trends for DTe and FLe

**Source columns:**
- Fiscal Week (e.g., "Week 1", "Week 16")
- Week Ending (e.g., "Jul 05", "Oct 18")
- DTe (decimal, e.g., 0.7751)
- FLe (decimal, e.g., 0.9180)

**CSV Output:** `N3 BEV DTe Weekly Availabilities - Week{N}.csv` and `N3 BEV FLe Weekly Availabilities - Week{N}.csv`

**Format:**
```
Fiscal Week,Week Ending,DTe,FLe
Week 1,Jul 05,77.51%,91.80%
Week 2,Jul 12,75.16%,94.85%
...
Week 53,Jul 04,83.43%,94.15%
```

**Data points:** 53 weeks of data

---

### Sheet 2: Availaibility-month
**Purpose:** Monthly availability aggregates

**Source columns:**
- Month (e.g., "Jul", "Oct")
- DTe (decimal)
- FLe (decimal)

**CSV Output:** `N3 BEV DTe Monthly Availabilities - Week{N}.csv` and `N3 BEV FLe Monthly Availabilities - Week{N}.csv`

**Format:**
```
Month,DTe,FLe
Jul,82.51%,94.25%
Aug,74.03%,90.65%
...
Jun,78.59%,90.02%
```

**Data points:** 12 months of data

---

### Sheet 3: Availability-perunit_Crnt wk
**Purpose:** Individual machine performance for current week

**Source columns:**
- Equipment Type Full (DTe or FLe)
- Machine_id (e.g., "DT0146", "FL0098")
- Availability (decimal)

**CSV Output:** `N3 BEV DTe Availability by Unit - Week{N}.csv` and `N3 BEV FLe Availability by Unit - Week{N}.csv`

**Format:**
```
Equipment Type Full,Machine_id,Availability
DTe,DT0146,95.63%
DTe,DT0147,100%
DTe,DT0149,98.00%
DTe,DT0150,100%
DTe,DT0162,100%
DTe,DT0163,0%
DTe,DT0171,100%
FLe,FL0098,56.82%
FLe,FL0099,96.88%
FLe,FL0107,94.77%
FLe,FL0108,97.50%
FLe,FL0113,97.64%
```

**Data points:**
- DTe: 7 machines (DT0146, DT0147, DT0149, DT0150, DT0162, DT0163, DT0171)
- FLe: 5 machines (FL0098, FL0099, FL0107, FL0108, FL0113)

---

### Sheet 4: Delays_DTe_Current Week
**Purpose:** Detailed delay/breakdown records for DTe vehicles

**Source columns:**
- Equipment Type Full (DTe)
- Machine_id (e.g., "DT0146")
- All Delays Levels (breakdown category hierarchy)
- Comment (specific failure description)
- Sum of Duration (Hours) (numeric, in hours)

**CSV Output:** `N3 BEV DTe Delays - Week{N}.csv`

**Format:**
```
Equipment Type Full,Machine_id,All Delays Levels,Comment,Sum of Duration (Hours)
DTe,DT0146,/Equipment/Breakdown Electrical,battery cut off @ battery bay,1.87
,/Equipment/Breakdown Tyre Bay,front tyre (battery bay) new location tyre bay,2.68
,/Equipment/Operational Delays,CHANGE BATTERY,11.43
DTe,DT0147,/Equipment/Operational Delays/Battery/Flat Battery,charging,1.98
DTe,DT0149,/Equipment/Breakdown Mechanical,engine cut off @ 43n12w mw,0.52
```

**Notes:**
- Hours kept as numeric decimal values (not percentages)
- Multiple delay entries per machine possible
- Hierarchy levels separated by "/"
- Equipment Type only shown on first machine entry (Excel pivot table behavior)

**Data points:** Varies by week, typically 15-25 delay records

---

### Sheet 5: Delays_FLe_Current Week
**Purpose:** Detailed delay/breakdown records for FLe vehicles

**Same format as Delays_DTe_Current Week**

**CSV Output:** `N3 BEV FLe Delays - Week{N}.csv`

**Data points:** Varies by week, typically 15-25 delay records

---

## Formatting Rules

### Percentage Conversion
- **Weekly/Monthly/Per-Unit sheets:** Convert decimal to percentage
  - Input: 0.7751
  - Output: 77.51%
  - Formula: value × 100, rounded to 2 decimal places

- **Delay Hours:** Keep as numeric decimal
  - Input: 1.8666666667
  - Output: 1.87
  - No percentage sign

### Metadata Rows
- First 3 rows of each sheet contain metadata (ProdYear, headers, etc.)
- These rows are skipped during extraction
- Data rows start at row 4

---

## Column Definitions

| Term | Definition |
|------|-----------|
| DTe | Dump Truck electric (battery-powered) |
| FLe | Front Loader electric (battery-powered) |
| Equipment Type Full | Classification of vehicle type (DTe or FLe) |
| Machine_id | Unique identifier for specific vehicle (e.g., DT0146) |
| Availability | Percentage of time unit was available for production |
| Delay | Time period when equipment was not available |
| Delay Levels | Hierarchical categorization of delay type |
| Sum of Duration | Total hours of delay for that category |
| Fiscal Week | Week number within fiscal year |
| Week Ending | Date representing end of that week |

---

## Data Quality Notes

1. **Availability %** can range from 0% to 100%+
   - Some weeks show >100% due to data collection methods
   - All percentages retained as-is from source

2. **Delay Hours** are cumulative for the week
   - Multiple occurrences of same issue are summed
   - Example: "CHARGING BATTERY" may have multiple entries summed into total hours

3. **Missing Equipment Type** in delays sheets
   - Pivot table format: Equipment Type only shown on first entry per machine
   - This is normal behavior and expected in CSV output

4. **Weeks of data**
   - Weekly availability: Full year of data (53 weeks + 1)
   - Monthly availability: 12 months
   - Current week delays: Only current week data

---

## Usage in Reports

These CSV files are consumed by:
- Weekly report generation system
- BEV performance dashboards
- Trend analysis and forecasting
- Maintenance planning

All files maintain consistent naming convention:
```
N3 BEV [DTe|FLe] [Weekly|Monthly|by Unit|Delays] Availabilities - Week{N}.csv
```

This allows automatic file detection and processing by downstream systems.
