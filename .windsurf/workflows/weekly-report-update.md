---
name: Weekly Report Update
description: Guides Cascade through the process of updating the weekly engineering report with new data.
---

## Weekly Report Update Workflow

This workflow automates the generation of the weekly engineering report. Follow these steps precisely.

### **Phase 1: Context & Prerequisites**

Before starting, review the following files to understand the project structure, data requirements, and overall goals. This is critical for consistency.

*   `@[src/data/reportData.ts]` - To understand the exact data structure required.
*   `@[src/App.tsx]` - To see how the slides are assembled.
*   `@[Weekly Report Generator.md.md]` - For the high-level project goals and documentation.
*   `@[README.md]` - For any setup or general project information.

### **Phase 2: Data Ingestion**

1.  **Request Data:** Ask the user to provide the data for the new report week. The required data includes:
    - Week Number & Date Range
    - HEAL Data (Highlights, Lowlights, Emerging Issues, Priorities)
    - Shafts & Winders Metrics
    - Performance data for each site (Safety, Averages, Compliance, Availability, Breakdowns, new trend chart image path)
    - BEV Performance Data (Availability, Compliance, Breakdowns)

2.  **Acknowledge Data:** Once the user provides the data, confirm that you have received it.

### **Phase 3: Automated File Update**

1.  **Read `reportData.ts`:** Read the contents of `src/data/reportData.ts`.
2.  **Update `reportData.ts`:** Replace the entire `reportData` object in the file with the new data provided by the user. Ensure the structure remains valid according to the `ReportData` interface.
3.  **Restart Development Server:** Execute the command `npm run dev` to restart the Vite server and apply the data changes.

### **Phase 4: Collaborative Review**

1.  **Launch Browser Preview:** Open a browser preview of the application.
2.  **Initiate Review:** Instruct the user to review each slide with you, checking for:
    - Text overflow or layout issues.
    - Correct color-coding on performance indicators.
    - Correct rendering of trend chart images.
3.  **Implement Fixes:** If any issues are found, apply the necessary CSS or component logic fixes collaboratively.

### **Phase 5: Finalization**

1.  **Confirm Approval:** Ask the user for final approval on the visual state of the report.
2.  **Trigger Print:** Once approved, use the "Print to PDF" functionality by setting the `isPrinting` state to `true` and calling `window.print()`.
3.  **Create Summary:** Create a new Markdown summary file for the week (e.g., `Week_XX_Update_Summary.md`) detailing all changes made.
