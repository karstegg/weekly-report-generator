---
description: Guides Cascade through the process of updating the weekly engineering report with new data.
---

## Weekly Report Update Main Workflow

This workflow orchestrates the entire weekly report update process, from data extraction to final slide verification, incorporating all best practices and tool updates.

### **Phase 1: Initialization**

1.  **Create New Branch:**
    *   Invoke the `/initialize-report` workflow to create a new, clean branch for the week's update.

### **Phase 2: Automated Data Extraction**

1.  **Confirm Source Files (Data Source Hierarchy):**
    *   **For Equipment Availability:** Trend chart images are ground truth. CSVs provide daily detail. Daily production reports provide operational context.
    *   **For BEV Data:** Prioritize the Epiroc weekly BEV report (`.md` format) as the primary source for breakdowns and battery/charger themes. Use CSV data for availability percentages.
    *   **For Other Sites:** Use CSV files in `weekly-report-generator/data-extract/` as the primary source of truth. If CSVs are not present, fall back to report images in `public/images/Week<N>/`.
    *   **For HEAL Data:** Daily production reports provide critical issues and themes. HEAL PowerPoints/text files provide structured HEAL data.

2.  **Run Consolidated Data Extraction:**
    *   Invoke the `/update-all-data-sources` workflow to extract data for all sites, which will handle the CSV-first logic and update `reportData.ts`.

3.  **Create Weekly Executive Summary (NEW - MANDATORY):**
    *   Invoke the `/create-weekly-executive-summary` workflow to generate executive summary from daily production reports.
    *   **Location:** `C:\Users\10064957\My Drive\GDVault\ProductionData\daily_production\data\YYYY-MM\`
    *   **Purpose:** Extract critical issues, safety incidents, and production insights for HEAL and performance slides.
    *   **Output:** Markdown document with actionable recommendations for weekly report updates.

4.  **Validate BEV Data with Epiroc Report (MANDATORY):**
    *   Cross-check BEV breakdowns and battery themes with Epiroc weekly BEV report.
    *   Verify daily exceptions match breakdown hours in reportData.ts.
    *   Ensure battery themes include delivery status and timing details.
    *   Update reportData.ts if discrepancies found.

5.  **Generate Week Summary Headlines (MANDATORY):**
    *   **For each site (Gloria, N2, N3):** Create a concise, executive-level summary headline (≤120 chars) that captures the week's critical issues.
    *   **Add to `trendChart.comment` field** in `reportData.ts` for each site.
    *   **Guidelines:**
        *   Highlight persistent failures (e.g., "6 days unresolved")
        *   Mention systematic issues (e.g., "Strata failures across 4 units")
        *   Include severity indicators (e.g., "safety critical")
        *   Reference specific equipment IDs for major issues
    *   **Example:** `"Week Summary: Critical persistent failures on DT128 (6 days) and FL92 (6 days, Graben). Multiple Strata telemetry issues Oct 2-3."`

6.  **Data Integrity Check:**
    *   **Verify File Path:** Before editing, confirm you are targeting `weekly-report-generator/src/data/reportData.ts`. An identically named file at the root `src/` must be ignored.
    *   **Check Component Logic:** If data appears correct in the file but renders incorrectly on a slide (e.g., is missing or truncated), the next step is to investigate the corresponding `.tsx` component file for hardcoded presentation logic (e.g., item limits).

7.  **Validate Availability Correlation (MANDATORY - NEW):**
    *   **Cross-check all site performance percentages against trend chart values:**
        *   [ ] N3 weekly average matches trend chart final value
        *   [ ] N2 weekly average matches trend chart final value
        *   [ ] Gloria weekly average matches trend chart final value
        *   [ ] All equipment percentages (DT, FL, HD, RT, SR) match trend chart boxes
    *   **Verify color coding aligns with ranges:**
        *   [ ] Green: ≥85% (above target)
        *   [ ] Amber/Yellow: 80-84% (below target but acceptable)
        *   [ ] Red: <80% (critical)
    *   **Flag any discrepancies:** If performance overview percentages don't match trend chart, use placeholder image and revert to CSV-based values.
    *   **Update component styling if needed:** Ensure `SitePerformanceSlide.tsx` uses correct threshold (`target - 5` for amber range).

### **Phase 3: Automated Slide Review**

1.  **Run Review Workflow:**
    *   Invoke the `/review-slides` workflow, which uses the `capture-slides.js` script to automatically capture screenshots of all slides for verification.

2.  **Verify Data Rendering:**
    *   Review the captured screenshots, paying close attention to sections that are populated from `reportData.ts` (e.g., Key Breakdowns, HEAL points, BEV themes).
    *   **Crucially, if data appears correct in the file but is missing or truncated on the slide, investigate the corresponding `.tsx` component file for hardcoded presentation logic.**

### **Phase 4: HEAL Matrix Validation**

1.  **Invoke HEAL Review Workflow:**
    *   Invoke the `/review-heal-matrices` workflow to perform a full, standardized review of the Departmental and Shafts & Winders HEAL slides. This workflow covers all data segregation, layout, and content curation checks.

2.  **Content Curation:**
    *   **Abbreviate Site Names:** For the HEAL slide, ensure all site names are abbreviated for conciseness (e.g., `[N2]`, `[N3]`).

### **Phase 5: Finalization**

1.  **Confirm Approval:**
    *   Ask the user for final approval on the visual state of the report based on the screenshots and checklist.

2.  **Create Summary:**
    *   Create a new Markdown summary file for the week (e.g., `Week_XX_Update_Summary.md`) detailing the automated updates and any manual fixes applied.

3.  **Commit & PR:**
    *   Commit all changes to the branch and notify the user that the report is ready for the final pull request.