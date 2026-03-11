# Weekly Report Update Workflow

This document outlines the standardized workflow for generating the weekly engineering report. This process is designed to be executed collaboratively between the User and Cascade.

---

### **Phase 1: Data Preparation (User Task)**

Before initiating the update, please gather the following information for the new report week:

1.  **Week Number & Date Range:** e.g., `Week 52`, `2023-12-25 to 2023-12-31`.
2.  **HEAL Data:** New text for `Highlights`, `Lowlights`, `Emerging Issues`, and `Priorities`.
3.  **Shafts & Winders Data:** New values for `Weekly Tons/Hr` and `Weekly RW Availability (%)`.
4.  **Site Performance Data (for each site):**
    - `Safety Status` (e.g., 'Good').
    - `Weekly Average` values.
    - `Service Compliance` values.
    - `Availability` values.
    - `Breakdown` details (Fleet, Primary Issues, etc.).
    - The new trend chart image file (if applicable).
5.  **BEV Performance Data:**
    - `Availability` values for each equipment type.
    - `Service Compliance` values.
    - `Breakdown` details.

*Tip: Providing this data in a structured format (like JSON) will accelerate the update process.*

---

### **Phase 2: Automated Data Update (Cascade Task)**

**To execute, User says:** `/run weekly-update-workflow`

1.  **Prompt for Data:** Cascade will ask for the prepared data from Phase 1.
2.  **Read Existing Data:** Cascade will read the current `src/data/reportData.ts` file.
3.  **Perform Update:** Cascade will replace the entire data object in `src/data/reportData.ts` with the new week's data in a single operation. This includes updating all text, metrics, and image paths.
4.  **Restart Server:** Cascade will restart the Vite development server to ensure all changes are loaded.

---

### **Phase 3: Collaborative Review & Refinement (Joint Task)**

1.  **Launch Preview:** Cascade will open a browser preview of the updated report.
2.  **Slide-by-Slide Review:** We will navigate through each slide together to identify any visual issues.
3.  **Common Issues to Check:**
    - **Text Overflow:** Does any text in the HEAL or Shafts & Winders boxes overflow?
    - **Color-Coding:** Are the safety cards and performance indicators colored correctly based on the new data?
    - **Chart Images:** Are the trend charts displaying the correct images for the new week?
4.  **Implement Fixes:** Cascade will apply necessary styling adjustments (e.g., reducing font sizes, adjusting container heights) to resolve any identified issues.

---

### **Phase 4: Finalization & Export (Cascade Task)**

1.  **User Approval:** Once the User confirms that all slides are visually correct, Cascade will proceed.
2.  **Generate PDF:** Cascade will use the "Print to PDF" feature to generate the final, perfectly formatted slide pack.
3.  **Update Documentation:** Cascade will create a new summary document (e.g., `Week_52_Update_Summary.md`) detailing the changes made during the session.
