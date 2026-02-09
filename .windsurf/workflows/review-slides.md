---
description: "Runs a full, automated visual review of the report slides using a Node.js script to capture screenshots for final verification."
---

## Automated Slide Review Protocol

This workflow uses the `capture-slides.js` script to automatically navigate through the weekly report presentation, capture screenshots of each slide, and save them for verification. This is the new standard and replaces the previous manual Puppeteer process.

### Key Steps:

This process requires **two separate terminals**.

1.  **Terminal 1: Ensure the Dev Server is Running**: The dev server automatically updates when `reportData.ts` changes, so you don't need to restart it for every change.
    - **Check if it's running**: Use the following command to see if port 5173 is in use. If a process is `LISTENING`, the server is active.
      ```bash
      netstat -ano | findstr :5173
      ```
    - **If not running, start it**: From the `weekly-report-generator/` directory, start the dev server and leave it running.
      ```bash
      npm run dev
      ```

2.  **Terminal 2: Run the Capture Script**: In a new terminal, navigate to the **project root** directory (`Weekly Report Generator Cloned from Github/`) and execute the `capture-slides.js` script. The `--verbose` flag is included for detailed output.
    ```bash
    // turbo
    node capture-slides.js --verbose
    ```

3.  **Verify**: Review the captured screenshots in the `screenshots/review/` folder to confirm data accuracy and correct rendering. The files are named `slide-X.png`.

4.  **Data Verification Checklist (Mandatory)**: Before concluding the review, you must perform the following data integrity checks based on the captured screenshots and the source-of-truth trend charts (`/public/images/WeekXX/`).

    *   **[ ] Site Weekly Average vs. Trend Chart**: For each site (Gloria, N2, N3), confirm the `Weekly Avg.` percentage on the performance slide (e.g., Slide 6) **exactly** matches the final data point for the current week on the main trend line of the corresponding availability chart image.
    *   **[ ] Fleet Availability vs. Trend Chart**: For each site, confirm the availability percentage for **every individual fleet** (DT, FL, HD, RT, SR) on the performance slide **exactly** matches the 'Weekly Average' value shown in the corresponding box on the availability chart image.
    *   **[ ] Below-Target Justification**: For any fleet with an availability percentage below the **85% target**, confirm that a corresponding reason is listed under the 'Key Breakdowns / Issues' section on the slide.

    If any of these checks fail, you must correct the data in `reportData.ts` and re-run this workflow until all checks pass.
