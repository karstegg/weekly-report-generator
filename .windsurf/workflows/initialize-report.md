---
description: Prepares the repository for a new weekly report by creating a new branch.
---

## Initialize Weekly Report Workflow

This workflow sets up the environment for a new weekly report.

### **Phase 1: Branch Creation**

1.  **Get Week Number:** Ask the user for the new week number (e.g., 53).

2.  **Create New Branch:**
    *   // turbo
    *   Execute the command `git checkout -b week-XX` where `XX` is the new week number provided by the user. This creates and switches to the new branch, ready for the week's updates.

### **Phase 2: Data Preparation**

1.  **Clear Old Data:**
    *   // turbo
    *   Execute `rm -rf weekly-report-generator/data-extract/*` to ensure no stale data from the previous week is carried over.

2.  **Create Image Directory:**
    *   // turbo
    *   Create the directory for the week's images at `weekly-report-generator/public/images/WeekXX`, where `XX` is the current week number.

3.  **Confirmation and Data Request:**
    *   Inform the user that the branch `week-XX` is ready and that the `data-extract` directory has been cleared.
    *   Prompt the user to upload all new data for the current week, reminding them of the correct locations:
        *   **CSVs & PDFs:** `weekly-report-generator/data-extract/`
        *   **Images:** `weekly-report-generator/public/images/WeekXX/`

4.  **Next Steps:** Advise the user to confirm once all data is uploaded so the `/weekly-report-update` workflow can begin.