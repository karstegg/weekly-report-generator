import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

# Historical data read carefully from the Week 34 reference chart
# Fleet Weekly Availability main line (Weeks 24-34)
hist_weeks = list(range(24, 35))
hist_fleet = [90, 84, 92, 89, 88, 85, 84, 84, 83, 83, 80]

# Week 35 calculated values (simple average of 5 primary fleets, no UV)
week35_fleet = 77

all_weeks = hist_weeks + [35]
all_fleet = hist_fleet + [week35_fleet]

# Individual fleet histories (Weeks 26-34) from Week 34 reference chart
# + Week 35 actual values calculated from daily files
fleet_weeks = list(range(26, 35))  # 9 historical points

fleet_data = {
    'DT': {
        'hist': [89, 89, 83, 78, 86, 84, 82, 82, 78],
        'w35': 78,
        'color': '#e05252',
        'target': 85,
    },
    'FL': {
        'hist': [100, 88, 94, 81, 82, 93, 75, 73, 72],
        'w35': 67,
        'color': '#a05abf',
        'target': 85,
    },
    'HD': {
        'hist': [94, 97, 89, 82, 77, 73, 85, 89, 79],
        'w35': 79,
        'color': '#c0392b',
        'target': 85,
    },
    'RT': {
        'hist': [92, 92, 92, 94, 89, 68, 82, 91, 85],
        'w35': 84,
        'color': '#d4a017',
        'target': 85,
    },
    'SR': {
        'hist': [96, 97, 98, 94, 87, 85, 94, 87, 81],
        'w35': 79,
        'color': '#8b9e2a',
        'target': 85,
    },
}

# Availability MTD = average of Feb weeks (33=83%, 34=80%, 35=77%)
mtd = round((83 + 80 + 77) / 3, 2)  # 80.00%

# Fleet weekly averages (simple avg over Weeks 26-35)
fleet_avgs = {}
for k, v in fleet_data.items():
    all_vals = v['hist'] + [v['w35']]
    fleet_avgs[k] = round(sum(all_vals) / len(all_vals))

# Layout
fig = plt.figure(figsize=(16, 14), facecolor='white')
fig.suptitle('Nchwaning 3 Weekly Availability Trend', fontsize=18, fontweight='bold',
             color='#1a3c6e', y=0.98)

gs = gridspec.GridSpec(4, 2, figure=fig,
                       top=0.91, bottom=0.04, left=0.06, right=0.97,
                       hspace=0.55, wspace=0.18)

# Main fleet availability chart
ax_main = fig.add_subplot(gs[0, :])
ax_main.set_facecolor('white')

ax_main.plot(all_weeks, all_fleet, 'o-', color='#1a6bcc', linewidth=2.2,
             markersize=6, zorder=5)

# Colour the Week 35 point red (below target 85%)
for xv, yv in zip(all_weeks, all_fleet):
    pc = 'red' if xv == 35 else '#1a6bcc'
    ax_main.plot(xv, yv, 'o', color=pc, markersize=6, zorder=6)

# Labels
for xv, yv in zip(all_weeks, all_fleet):
    col = 'red' if xv == 35 else '#1a6bcc'
    weight = 'bold' if xv == 35 else 'normal'
    ax_main.annotate(f'{yv}%', (xv, yv), textcoords='offset points',
                     xytext=(0, 9), ha='center', fontsize=9,
                     color=col, fontweight=weight)

# Target dashed line at 85%
ax_main.axhline(85, color='#e74c3c', linestyle='--', linewidth=1.2, alpha=0.7)

ax_main.set_xlim(23.3, 35.7)
ax_main.set_xticks(all_weeks)
ax_main.set_xticklabels([f'Week {w}' for w in all_weeks], fontsize=8, rotation=30)
ax_main.set_ylim(70, 100)
ax_main.set_yticks([70, 75, 80, 85, 90, 95, 100])
ax_main.yaxis.set_tick_params(labelsize=8)
ax_main.text(30, 71.5, '2026', fontsize=8, color='gray', ha='center')
ax_main.set_ylabel('Fleet Weekly Availability', fontsize=9, color='#555')
ax_main.spines['top'].set_visible(False)
ax_main.spines['right'].set_visible(False)

# MTD box (top right)
ax_main.text(0.99, 1.08, 'Availability MTD', transform=ax_main.transAxes,
             ha='right', va='top', fontsize=9, color='#1a6bcc')
ax_main.text(0.99, 0.98, f'{mtd:.2f}%', transform=ax_main.transAxes,
             ha='right', va='top', fontsize=16, fontweight='bold', color='#1a6bcc')

# Individual fleet sub-charts
fleet_order = ['DT', 'FL', 'HD', 'RT', 'SR']
positions = [(1, 0), (1, 1), (2, 0), (2, 1), (3, 0)]
all_fleet_weeks = fleet_weeks + [35]

bg_colors = {
    'DT': '#fff5f5',
    'FL': '#f5f0ff',
    'HD': '#fff0f0',
    'RT': '#fffbf0',
    'SR': '#f5f8e8',
}

for (row, col), fname in zip(positions, fleet_order):
    fd = fleet_data[fname]
    ax = fig.add_subplot(gs[row, col])

    vals = fd['hist'] + [fd['w35']]
    target = fd['target']
    color = fd['color']
    avg = fleet_avgs[fname]

    ax.set_facecolor(bg_colors[fname])
    ax.plot(all_fleet_weeks, vals, 'o-', color=color, linewidth=1.8,
            markersize=4, zorder=5)

    last_col = 'red' if fd['w35'] < target else color
    ax.plot(35, fd['w35'], 'o', color=last_col, markersize=5, zorder=6)

    ax.axhline(target, color='gray', linestyle='--', linewidth=1.0, alpha=0.7)

    for xv, yv in zip(all_fleet_weeks, vals):
        lc = 'red' if (xv == 35 and yv < target) else color
        fw = 'bold' if xv == 35 else 'normal'
        ax.annotate(f'{yv}%', (xv, yv), textcoords='offset points',
                    xytext=(0, 7), ha='center', fontsize=7.5,
                    color=lc, fontweight=fw)

    ax.set_xlim(25.2, 35.8)
    ax.set_xticks(all_fleet_weeks)
    ax.set_xticklabels([f'Week\n{w}' for w in all_fleet_weeks], fontsize=6.5)
    ymin = max(40, min(vals) - 8)
    ymax = min(108, max(vals) + 14)
    ax.set_ylim(ymin, ymax)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

    avg_color = 'green' if avg >= target else ('orange' if avg >= target - 5 else 'red')
    ax.text(0.03, 1.02, fname, transform=ax.transAxes,
            fontsize=11, fontweight='bold', color='white',
            bbox=dict(facecolor=color, edgecolor='none', boxstyle='round,pad=0.3'))
    ax.text(0.03, 0.82, 'Weekly\nAverage', transform=ax.transAxes,
            fontsize=7, color='#555')
    ax.text(0.03, 0.60, f'{avg}%', transform=ax.transAxes,
            fontsize=14, fontweight='bold', color=avg_color)
    ax.text(0.03, 0.44, 'Availability', transform=ax.transAxes,
            fontsize=7, color='#555')

# Footer
fig.text(0.01, 0.01, 'BRMO\nconnect', fontsize=8, fontweight='bold', color='#1a3c6e')
fig.text(0.5, 0.01, "We 'Connect' to Drive Performance Excellence.",
         fontsize=8, color='#555', ha='center')

out = 'N3 Weekly Availability Chart Week 35.png'
plt.savefig(out, dpi=150, bbox_inches='tight', facecolor='white')
plt.close()

print(f"Saved: {out}")
print(f"\nSummary:")
print(f"  Week 35 Fleet Average: {week35_fleet}%")
print(f"  Availability MTD: {mtd:.2f}%")
print(f"\n  Fleet weekly averages (Weeks 26-35):")
for k in fleet_order:
    print(f"    {k}: {fleet_avgs[k]}%  (Week 35: {fleet_data[k]['w35']}%)")
print(f"\n  Fleet history (Weeks 24-35):")
for w, v in zip(all_weeks, all_fleet):
    print(f"    Week {w}: {v}%")
