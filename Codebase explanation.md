# Codebase Explanation: Weekly Engineering Report React Component

**Version:** 1.0 (as of Week 50 report)
**Author:** Gemini Assistant

---

## 1. Overview

This document provides an explanation of the React codebase for the "Weekly Engineering Report" application. The current implementation is a single, self-contained React component (`WeeklyReport.js`) that renders a static, multi-slide report based on hardcoded data for a specific week.

The primary goal of this architecture was rapid prototyping and visualization. The next stage of development, as outlined in the PRD, will involve refactoring this monolithic component into a more modular, navigable Single-Page Application (SPA).

## 2. File Structure (Conceptual)

While currently in a single file, the component is logically divided into several distinct "slide" sections. A future refactor should break these into individual component files.

/src|-- /components|   |-- AvailabilityBar.js      # (Helper Component)|   |-- TitleSlide.js           # (Slide 1)|   |-- IndexSlide.js           # (Slide 2)|   |-- HealOverviewSlide.js    # (Slide 3)|   |-- ShaftsWindersSlide.js   # (Slide 4)|   |-- N3_TrendSlide.js        # (New)|   |-- N3_PerfSlide.js         # (Site Performance)|   |-- N2_TrendSlide.js        # (New)|   |-- N2_PerfSlide.js         # (Site Performance)|   |-- Gloria_TrendSlide.js    # (New)|   |-- Gloria_PerfSlide.js     # (Site Performance)|   |-- BEV_PerfSlide.js        # (BEV Performance)|-- App.js                      # (Main application component managing state and navigation)
## 3. Core Components & Logic

### 3.1. `WeeklyReport` (The Main Component)

This is the top-level component that currently houses all the JSX for every slide.

* **`slideStyle` Object:** A JavaScript object defining the fixed dimensions (`960px` x `720px`), background, and positioning for each slide `div`. This ensures a consistent "presentation slide" look and feel.
* **`titleSlideStyle` Object:** A variation of `slideStyle` that removes padding to allow the footer image on the title slide to bleed to the edges.
* **Structure:** The component returns a main container `div` which holds a series of child `div`s, each representing a slide and styled with `slideStyle`. The order of these `div`s determines the order of the slides in the report.

### 3.2. `AvailabilityBar` (Helper Component)

This is a reusable functional component designed to display the vertical availability bars seen on the site performance slides.

* **Props:**
    * `label` (string): The name of the equipment fleet (e.g., "DT", "FL").
    * `percentage` (number): The availability value.
    * `target` (number, default: 85): The target availability to compare against.
* **Logic:**
    * It uses conditional logic to determine the background color (`barColor`) of the bar based on the `percentage` prop relative to the `target`.
        * `>= target`: Green (`bg-green-500`)
        * `>= target - 10`: Yellow (`bg-yellow-500`)
        * `< target - 10`: Red (`bg-red-500`)
    * It also determines the appropriate icon (`CheckCircle` or `AlertTriangle`) and text color based on the performance.

### 3.3. Slide Sections (Detailed Breakdown)

Each "slide" is a `div` element with specific internal layouts.

* **Title Slide (`Slide 1`):**
    * Uses absolute positioning extensively to layer text and images.
    * The main content area has a `bottom-32` class to reserve space for the footer.
    * The `<footer>` element is positioned absolutely at the bottom of the slide container.
    * Image URLs are hardcoded from `imgur`. `onError` handlers are used to prevent broken image icons from displaying.

* **HEAL Overview Slide (`Slide 3`):**
    * Uses a 2x2 CSS Grid (`grid-cols-2`, `gap-x-6`, `gap-y-4`) to create the four quadrants.
    * Each quadrant is a colored box with content sourced from the HEAL pages of all sites. The data is manually synthesized and hardcoded.

* **Shafts & Winders Slide (`Slide 4`):**
    * Also uses a 2x2 grid for its HEAL summary at the bottom.
    * The top KPI section uses horizontal bars created with `div` elements. The width of the inner `div` is calculated inline as a percentage of the target value (e.g., `style={{ width: `${(437.8/523)*100}%`}}`).

* **Site Performance Slides (N3, N2, Gloria):**
    * These follow a consistent three-tier layout:
        1.  **Top:** A 3-column grid for KPI boxes (Safety, Weekly Avg, Compliance).
        2.  **Middle:** A 5-column grid that uses the `AvailabilityBar` component for each fleet.
        3.  **Bottom:** A grid (1, 2, or 3 columns) for displaying key breakdown information.

* **Weekly Trend Slides (New):**
    * These are simple slides designed to showcase a single, large image of the weekly availability trend chart.
    * The layout uses flexbox (`flex-grow flex flex-col justify-center`) to center the image vertically and horizontally.
    * Includes a `p` tag for an italicized caption below the image.

## 4. Styling and Dependencies

* **Tailwind CSS:** All styling is handled via utility classes directly in the JSX. There is no separate CSS file.
* **Lucide-React:** Icons are imported from this library and used as components (e.g., `<CheckCircle />`).
* **Google Fonts:** The 'Inter' font is imported via a `<link>` tag in the `<head>` of the HTML structure.

## 5. Recommendations for Next Steps

To transition this project for further development in an IDE like Cursor, the following steps are recommended:

1.  **Setup a React Project:** Use `create-react-app` or Vite to bootstrap a standard React development environment.
2.  **Component Refactoring:** Break down the monolithic `WeeklyReport` component into the smaller, slide-based components as outlined in section 2.
3.  **Implement Navigation:** Create a main `App.js` component. Use `useState` to manage the currently active slide, and create a sidebar or header navigation component with buttons that update this state `onClick`.
4.  **Externalize Data:** Move the hardcoded data for Week 50 into a separate `data.js` file and import it into the relevant components. This will make it easier to switch to a live API endpoint in the future.
