---
description: "Extracts all weekly data for the Shafts & Winders section from its two report images and prepares it for updating reportData.ts."
---

## Shafts & Winders Data Extraction Protocol

This workflow outlines data extraction for Shafts & Winders. It prioritizes a CSV file and falls back to images using Gemini CLI.

### **Phase 1: Data Source Identification**

1.  **Check for CSV File**: Look for a descriptive CSV file for Shafts & Winders (e.g., `Shafts & Winders Production Week9.csv`) in `weekly-report-generator/data-extract/`. This is the primary source.
2.  **Image Fallback**: If no CSV is found, locate the report images in `public/images/Week<N>/` for Gemini analysis.

### **Phase 2: Data Extraction (CSV-First)**

1.  **Parse CSV or Images**: 
    *   If a descriptive CSV for Shafts & Winders exists, parse it to extract performance metrics and HEAL data.
    *   If not, use Gemini CLI to extract the data from the fallback images. All Gemini commands must be run from the `weekly-report-generator` directory.
    *   **Example Gemini Command (from repo root, using `Cwd`):**
        ```powershell
        // Command to be run via `run_command` tool
        // CommandLine: gemini -m gemini-2.5-flash -y -p "Extract Tons/Hour, RW Avail, and all HEAL points from the images. @'public/images/Week<N>/Shafts & Winders Weekly Fleet Production & Availability Charts - Week<N>.png' @'public/images/Week<N>/Shafts & Winders HEAL Page - Week<N>.png'"
        // Cwd: 'weekly-report-generator'
        ```

### **Phase 3: Consolidation**

1.  **Consolidate Data**: Gather all extracted values and text.
2.  **Update `reportData.ts`**: Carefully transfer the consolidated data into the `shaftsAndWinders` object within `reportData.ts`.