---
description: "Consolidates data extraction for all sites into a single workflow, prioritizing CSVs and falling back to images."
---

## Consolidated Data Extraction Workflow

This workflow streamlines the weekly data extraction process by handling all sites (N2, N3, Gloria, Shafts & Winders) in a single, sequential operation. It implements the CSV-first, image-fallback strategy.

### **Phase 1: Data Extraction**

1.  **Nchwaning 2**:
    *   Invoke the `/update-std-ug-mine-site` workflow to extract data for Nchwaning 2.

2.  **Gloria**:
    *   Invoke the `/update-std-ug-mine-site` workflow to extract data for Gloria.

3.  **Nchwaning 3 (Standard & BEV)**:
    *   Invoke the `/update-n3-ug-mine-site` workflow to extract data for Nchwaning 3.

4.  **Shafts & Winders**:
    *   Invoke the `/update-shafts-winders-data` workflow to extract data for Shafts & Winders.

### **Phase 2: Consolidation & Update**

1.  **Gather All Outputs**:
    *   Collect all the data extracted from the individual site workflows.

2.  **Update `reportData.ts`**:
    *   Carefully update `weekly-report-generator/src/data/reportData.ts` with the consolidated data, ensuring all information is placed in the correct sections.
