---
description: Visual design guidelines and UI patterns for the Weekly Report Generator
---

# Visual Design Guidelines

This document captures the visual design patterns and UI conventions used throughout the Weekly Report Generator.

## Availability Bar Graphs

### Site Performance Slides (6, 8, 10)

Equipment availability indicators use a percentage-based bar graph design that provides intuitive visual feedback.

**Component**: `src/components/shared/AvailabilityBar.tsx`

**Visual Design**:
- Gray background bar (`bg-gray-200`) represents the full 0-100% scale
- Colored fill shows the actual availability percentage
- Same rounded shape (`rounded-full`) maintained from original design
- Height: `h-8` (32px)

**Fill Behavior Examples**:
- 100% availability = bar completely filled with color
- 85% availability = bar 85% filled with green, 15% gray
- 50% availability = bar half-filled with color, half gray
- 20% availability = bar 20% filled with color, 80% gray

**Color Scheme** (thresholds unchanged):
- **Green** (`bg-green-500`): ≥85% - Meeting or exceeding target
- **Yellow/Amber** (`bg-yellow-500`): 80-84% - Close to target
- **Red** (`bg-red-500`): <80% - Below target

**Text Positioning Logic**:
- For percentages **≥20%**: Text appears inside the colored fill
  - White text (`text-white`) for green and red bars
  - Black text (`text-black`) for yellow bars (better contrast)
- For percentages **<20%**: Text appears centered on gray background (`text-gray-700`)
  - Positioned absolutely at center for readability
  - Prevents text from being cut off in narrow fills

**Icon Indicators** (unchanged):
- Green: `CheckCircle` icon below bar
- Yellow: `AlertTriangle` icon below bar
- Red: `AlertTriangle` icon below bar

**Technical Implementation**:
```tsx
<div className="w-full bg-gray-200 rounded-full h-8 flex items-center relative">
  <div 
    className={`${barColor} rounded-full h-8 flex items-center justify-center`}
    style={{ width: `${roundedPercentage}%` }}
  >
    {roundedPercentage >= 20 && (
      <span className={`text-lg font-bold ${textColor}`}>{roundedPercentage}%</span>
    )}
  </div>
  {roundedPercentage < 20 && (
    <span className="text-lg font-bold text-gray-700 absolute left-1/2 transform -translate-x-1/2">
      {roundedPercentage}%
    </span>
  )}
</div>
```

**Benefits**:
- Intuitive: Fill level directly corresponds to percentage value
- Consistent: Maintains existing color scheme and thresholds
- Accessible: Smart text positioning ensures readability at all percentages
- Professional: Clean, modern appearance suitable for executive reporting

## Slide Layout Standards

### Font Sizes
- Slide titles: `text-3xl` or `text-4xl` (30-36px)
- Section headings: `text-xl` (20px)
- Body text: `text-base` (16px)
- Table text: `text-sm` (14px) or custom `fontSize: '9px'` for dense tables

### Table Design (Detail Slides)

**BEV Detail Slides (12 & 13):**
- Font size: 9px for maximum density
- Row height: 16px (body rows)
- Header height: 18px
- Border: `border-gray-300`
- Alternating row colors: `bg-white` and `bg-gray-50`
- **Critical**: NO scrollbars - limit rows to fit on page (typically 15 rows max)

**Utility Section Slides (15 & 16):**
- Font size: 12px for better readability
- Row height: 16px minimum (body rows)
- Header height: 18px
- Border: `border-gray-300`
- Alternating row colors: `bg-white` and `bg-gray-50`
- **Critical**: NO scrollbars - limit rows to fit on page
- Slide 15: Shows all weekly unavailable units (typically 8-10 rows)
- Slide 16: Shows current ongoing breakdowns by area (typically 7-11 areas)

### Color Palette
- Primary blue: `text-blue-800`, `bg-blue-50`, `border-blue-500`
- Success green: `text-green-700`, `bg-green-50`, `border-green-500`
- Warning yellow: `text-yellow-700`, `bg-yellow-50`, `border-yellow-500`
- Error red: `text-red-700`, `bg-red-50`, `border-red-500`
- Orange accent: `text-orange-800`, `bg-orange-50` (BEV slides)

### Spacing
- Slide padding: `p-5` or `p-6` (20-24px)
- Bottom padding for footer: `pb-32` (128px)
- Section margins: `mb-3` to `mb-5` (12-20px)
- Grid gaps: `gap-3` (12px)

## Print Considerations

All slides must be designed for PDF export:
- Fixed dimensions: 960px × 720px
- No scrollbars allowed
- Content must fit within visible area
- Footer space reserved at bottom (128px)
- Test in print preview before finalizing
