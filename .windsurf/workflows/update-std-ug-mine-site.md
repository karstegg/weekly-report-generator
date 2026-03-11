---
description: "Extracts weekly data for a UG site using Cascade-only image reading (no external CLI) and prepares it for updating reportData.ts."
---

## Standard UG Mine Site Data Extraction Protocol

This workflow outlines data extraction for a standard UG mine site (e.g., N2, Gloria). It prioritizes CSV files and falls back to images using Gemini CLI.

### **Phase 1: Data Source Identification**

1.  **Check for CSV File**: Look for a descriptive CSV file for the site (e.g., `Gloria Weekly Availabilities Week9.csv`) in `weekly-report-generator/data-extract/`. This is the primary source.
2.  **Image Fallback**: If no CSV is found, locate the standard weekly report images in `public/images/Week<N>/` for Gemini analysis.

### **Phase 2: Data Extraction (CSV-First)**

1.  **Parse CSV or Images**: 
    *   If a descriptive site-specific CSV exists, parse it to extract availabilities, breakdowns, and compliance data.
    *   If not, use Gemini CLI to extract the data from the fallback images. All Gemini commands must be run from the `weekly-report-generator` directory.

2.  **HEAL Data (from Image)**:
    *   HEAL data is always sourced from the HEAL page image.
    *   **Example Gemini Command (from repo root, using `Cwd`):**
        ```powershell
        // Command to be run via `run_command` tool
        // CommandLine: gemini -m gemini-2.5-flash -y -p "From the HEAL page, extract concise highlights, lowlights, emerging issues, and priorities. @'public/images/Week<N>/SITE HEAL Page - Week<N>.png'"
        // Cwd: 'weekly-report-generator'
        ```

### **Phase 3: Consolidation**

1.  **Consolidate Data**: Gather all extracted data points from the CSV or images.
2.  **Update `reportData.ts`**: Carefully transfer the consolidated data into the correct site object within `weekly-report-generator/src/data/reportData.ts`.