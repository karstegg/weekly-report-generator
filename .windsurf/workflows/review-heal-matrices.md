---
description: "Provides a standardized protocol for critically reviewing the two HEAL matrix slides (Departmental and Shafts & Winders) to ensure data segregation and visual integrity."
---

## HEAL Matrix Review Protocol

This workflow is mandatory for reviewing the departmental and Shafts & Winders HEAL slides to prevent data mixing and layout issues as well as to ensure that the content meets the requirements of presentation to an executive audience.

### **Phase 1: Capture Slides**

1.  **Run Capture Script**: Use the standard `/review-slides` workflow, which executes `node capture-slides.js`, to generate fresh screenshots of all slides.

### **Phase 2: Critical Review Checklist**

Review the captured screenshots for Slide 3 and Slide 4 against the following non-negotiable rules. The screenshots are located in `weekly-report-generator/screenshots/review/`.

**Slide 3: Departmental Overview (HEAL)**

*   **[ ] Data Segregation Check**: Confirm this slide contains **ONLY** data from the underground sites (N2, N3, Gloria). It **MUST NOT** contain any data from Shafts & Winders.
*   **[ ] Layout & Overflow Check**: Verify that all text in the Highlights, Lowlights, Emerging Issues, and Priorities quadrants fits within the designated boxes. There must be **NO** overflow, or truncation.
    *   **[ ] Content & Summarization Check**: Raw data is often too verbose. Proactively summarize the content to ensure it is high-level, suitable for an executive audience, and fits the layout without overflow. Consolidate multiple detailed points into single, impactful statements.

**Slide 4: Shafts & Winders (HEAL)**

*   **[ ] Data Segregation Check**: Confirm this slide contains **ONLY** data from Shafts & Winders.
*   **[ ] Layout & Overflow Check**: Verify all text fits within the designated boxes without any overflow or truncation issues.
    *   **[ ] Content & Summarization Check**: Raw data is often too verbose. Proactively summarize the content to ensure it is high-level, suitable for an executive audience, and fits the layout without overflow. Consolidate multiple detailed points into single, impactful statements.

### **Phase 3: Remediation**

*   If any rule is violated, check the source of truth. The root cause is either incorrect data in the source CSV files (`data-extract/`) or, if no CSVs were used, incorrect data in `reportData.ts` from the image extraction.
*   **To Fix**: Correct the data in the source CSV file or edit the `heal` and `shaftsAndWinders` objects in `reportData.ts` if images were used. The goal is 100% compliance with data segregation and layout rules.