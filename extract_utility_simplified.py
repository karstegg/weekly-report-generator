import pandas as pd
import json

# Utility Performance files (Monday-Friday)
# Note: Files are dated 09-13 Feb (Mon-Fri of Week 33: 06-12 Feb 2026)
utility_files = [
    ('data/week33/Utility Performance/Breakdown report - Utility Section 09-02-2026.xlsx', 'mon'),
    ('data/week33/Utility Performance/Breakdown report - Utility Section 10-02-2026.xlsx', 'tue'),
    ('data/week33/Utility Performance/Breakdown report - Utility Section 11-02-2026.xlsx', 'wed'),
    ('data/week33/Utility Performance/Breakdown report - Utility Section 12-02-2026.xlsx', 'thu'),
    ('data/week33/Utility Performance/Breakdown report - Utility Section 13-02-2026.xlsx', 'fri'),
]

# Aggregate by major departments
daily_totals = {}
all_breakdowns = {}

for file_path, day in utility_files:
    print(f"\nProcessing {day}: {file_path}")
    
    try:
        df = pd.read_excel(file_path)
        
        # Count total available and unavailable
        total_units = 0
        available_units = 0
        unavailable_units = 0
        
        for idx, row in df.iterrows():
            status = row.get('Status', '')
            tmm_no = row.get('TMM No.', '')
            area = row.get('Area/Owner', '')
            model = row.get('Model', '')
            reason = row.get('Reason for not available', '')
            
            if pd.notna(status) and pd.notna(tmm_no):
                total_units += 1
                
                if 'not available' in str(status).lower():
                    unavailable_units += 1
                    
                    # Track breakdown
                    if pd.notna(area) and pd.notna(model):
                        key = str(tmm_no).strip()
                        if key not in all_breakdowns:
                            all_breakdowns[key] = {
                                'tmmNo': key,
                                'area': str(area).strip(),
                                'model': str(model).strip(),
                                'reason': str(reason).strip() if pd.notna(reason) else 'Not specified',
                                'days_down': 1
                            }
                        else:
                            all_breakdowns[key]['days_down'] += 1
                else:
                    available_units += 1
        
        daily_totals[day] = {
            'total': total_units,
            'available': available_units,
            'unavailable': unavailable_units
        }
        
        print(f"  {day}: {available_units}/{total_units} available ({unavailable_units} unavailable)")
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

# Calculate weekly summary
total_avail = sum([d['available'] for d in daily_totals.values()])
total_unavail = sum([d['unavailable'] for d in daily_totals.values()])
total_units_week = sum([d['total'] for d in daily_totals.values()])

weekly_avg = (total_avail / total_units_week * 100) if total_units_week > 0 else 0

# Get Friday's status for current status slide
friday_avail = daily_totals.get('fri', {}).get('available', 0)
friday_unavail = daily_totals.get('fri', {}).get('unavailable', 0)
friday_total = daily_totals.get('fri', {}).get('total', 0)

# Get top 5 breakdowns by duration
top_breakdowns = sorted(all_breakdowns.values(), key=lambda x: x['days_down'], reverse=True)[:5]

# Prepare data for reportData.ts
utility_data = {
    'utilitySection': {
        'fleetStatus': {
            'available': friday_avail,
            'unavailable': friday_unavail
        },
        'areaSummary': [
            {
                'area': 'Utility Vehicles',
                'department': 'All Departments',
                'total': friday_total,
                'unavailable': friday_unavail
            }
        ],
        'breakdowns': [
            {
                'area': bd['area'],
                'tmmNo': bd['tmmNo'],
                'model': bd['model'],
                'description': bd['reason'],
                'remarks': f"Down for {bd['days_down']} day(s) this week"
            }
            for bd in top_breakdowns
        ],
        'oemAssistanceRequired': sum(1 for bd in top_breakdowns if 'oem' in bd['reason'].lower() or 'fermel' in bd['reason'].lower() or 'deutz' in bd['reason'].lower()),
        'dailyTracking': [
            {
                'area': 'Utility Vehicles',
                'mon': {
                    'available': daily_totals.get('mon', {}).get('available', 0),
                    'total': daily_totals.get('mon', {}).get('total', 0),
                    'color': 'green' if (daily_totals.get('mon', {}).get('available', 0) / daily_totals.get('mon', {}).get('total', 1) * 100) >= 85 else 'yellow' if (daily_totals.get('mon', {}).get('available', 0) / daily_totals.get('mon', {}).get('total', 1) * 100) >= 80 else 'red'
                },
                'tue': {
                    'available': daily_totals.get('tue', {}).get('available', 0),
                    'total': daily_totals.get('tue', {}).get('total', 0),
                    'color': 'green' if (daily_totals.get('tue', {}).get('available', 0) / daily_totals.get('tue', {}).get('total', 1) * 100) >= 85 else 'yellow' if (daily_totals.get('tue', {}).get('available', 0) / daily_totals.get('tue', {}).get('total', 1) * 100) >= 80 else 'red'
                },
                'wed': {
                    'available': daily_totals.get('wed', {}).get('available', 0),
                    'total': daily_totals.get('wed', {}).get('total', 0),
                    'color': 'green' if (daily_totals.get('wed', {}).get('available', 0) / daily_totals.get('wed', {}).get('total', 1) * 100) >= 85 else 'yellow' if (daily_totals.get('wed', {}).get('available', 0) / daily_totals.get('wed', {}).get('total', 1) * 100) >= 80 else 'red'
                },
                'thu': {
                    'available': daily_totals.get('thu', {}).get('available', 0),
                    'total': daily_totals.get('thu', {}).get('total', 0),
                    'color': 'green' if (daily_totals.get('thu', {}).get('available', 0) / daily_totals.get('thu', {}).get('total', 1) * 100) >= 85 else 'yellow' if (daily_totals.get('thu', {}).get('available', 0) / daily_totals.get('thu', {}).get('total', 1) * 100) >= 80 else 'red'
                },
                'fri': {
                    'available': daily_totals.get('fri', {}).get('available', 0),
                    'total': daily_totals.get('fri', {}).get('total', 0),
                    'color': 'green' if (daily_totals.get('fri', {}).get('available', 0) / daily_totals.get('fri', {}).get('total', 1) * 100) >= 85 else 'yellow' if (daily_totals.get('fri', {}).get('available', 0) / daily_totals.get('fri', {}).get('total', 1) * 100) >= 80 else 'red'
                },
                'weeklyAvg': round(weekly_avg, 1)
            }
        ]
    },
    'utilitySectionCurrentStatus': {
        'totalUnavailable': friday_unavail,
        'areaStatus': [
            {
                'area': 'Utility Vehicles',
                'unavailable': friday_unavail,
                'details': [
                    {
                        'unit': bd['tmmNo'],
                        'reason': bd['reason']
                    }
                    for bd in top_breakdowns
                ]
            }
        ]
    }
}

print("\n" + "="*80)
print("UTILITY DATA SUMMARY")
print("="*80)
print(f"\nWeekly Average Availability: {weekly_avg:.1f}%")
print(f"Friday Status: {friday_avail}/{friday_total} available ({friday_unavail} unavailable)")
print(f"\nTop Breakdowns:")
for bd in top_breakdowns:
    print(f"  {bd['tmmNo']} ({bd['area']}): {bd['reason'][:50]}... - {bd['days_down']} days")

print("\n" + "="*80)
print("DATA FOR REPORTDATA.TS")
print("="*80)
print(json.dumps(utility_data, indent=2))

# Save to file
with open('utility_week33_final.json', 'w') as f:
    json.dump(utility_data, f, indent=2)

print("\nData saved to utility_week33_final.json")
