---
name: Initialize Weekly Report
description: Prepares the repository for a new weekly report by creating a new branch.
---

## Initialize Weekly Report Workflow

This workflow sets up the environment for a new weekly report.

### **Phase 1: Branch Creation**

1.  **Get Week Number:** Ask the user for the new week number (e.g., 53).

2.  **Create New Branch:**
    *   // turbo
    *   Execute the command `git checkout -b week-XX` where `XX` is the new week number provided by the user. This creates and switches to the new branch, ready for the week's updates.

### **Phase 2: Ready for Update**

1.  **Confirmation:** Inform the user that the branch `week-XX` has been created and is ready.

2.  **Next Steps:** Advise the user to proceed with the `/weekly-report-update` workflow to begin uploading the new data.
