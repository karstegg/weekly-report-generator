---
description: "Extracts all weekly data for the Nchwaning 3 site, including both standard and BEV fleets, and prepares it for updating reportData.ts."
---

## Nchwaning 3 Data Extraction Protocol

This workflow outlines data extraction for the Nchwaning 3 site. It prioritizes CSV files from `data-extract/` and falls back to images in `public/images/Week<N>/` using Gemini CLI.

### **Phase 1: Data Source Identification**

1.  **Check for CSV Files**: Look for descriptive CSV files for N3 and BEV data in the `weekly-report-generator/data-extract/` directory (e.g., `N3 Daily Availabilities Week9.csv`, `BEV DT Delays Week9.csv`). These are the primary sources for structured data.
2.  **Image Fallback**: If CSVs are absent, locate the relevant report images in `public/images/Week<N>/` for Gemini analysis.
    *   `N3 Weekly Availability Chart - Week<N>.png`
    *   `N3 Primary Equipment Daily Availabilities - Week<N>.png`
    *   `N3 BEV Weekly Dashboard - Week<N>.png`
    *   `N3 Weekly Maintenance Compliance - Week<N>.png`

### **Phase 2: Data Extraction (CSV-First)**

1.  **Standard & BEV Fleet Data**: 
    *   If descriptive CSV files for N3 and BEV exist, parse them to extract availabilities, breakdowns, compliance, and battery themes.
    *   If not, use Gemini CLI to extract the data from the fallback images. All Gemini commands must be run from the `weekly-report-generator` directory.
    *   **Example Gemini Command (from repo root, using `Cwd`):**
        ```powershell
        // Command to be run via `run_command` tool
        // CommandLine: gemini -m gemini-2.5-flash -y -p "From the image, extract the weekly availability for all fleets. @'public/images/Week<N>/N3 Weekly Availability Chart - Week<N>.png'"
        // Cwd: 'weekly-report-generator'
        ```

2.  **Maintenance Compliance (from CSV or Image)**:
    *   Source the 'Weekly Compliance %' for 'DT BEV' and 'FL BEV' from the relevant BEV CSV file or the `N3 Weekly Maintenance Compliance` image.
    *   **Rule:** If a fleet shows no data because no maintenance was scheduled, the `value` in `reportData.ts` **must be set to `null`**.

3.  **BEV Battery Themes (MANDATORY - from Epiroc PDF)**:
    *   **CRITICAL:** Battery themes MUST be extracted from the Epiroc weekly report PDF (e.g., `BRMO weekly report LIVE...pdf`).
    *   Use Gemini CLI to extract battery and charger themes:
        ```powershell
        // Command to be run via `run_command` tool
        // CommandLine: echo "Extract the 'Key Battery & Charger Themes' or 'Battery Status' section from this PDF. Provide a concise bullet list (3-4 items max, each ≤120 chars) of the key battery and charger issues for the week. @'weekly-report-generator/data-extract/BRMO weekly report LIVE...pdf'" | npx @google/gemini-cli
        // Cwd: project root
        ```
    *   **Save extraction**: Create a markdown file in `data-extract/` (e.g., `BEV_Battery_Themes_Week<N>_Extract.md`) documenting the source and extracted themes.
    *   **Apply to reportData.ts**: Update `bev.batteryThemes` with the extracted themes (3-4 bullets, ≤120 chars each).

### **Phase 3: Consolidation**

1.  **Update `reportData.ts`**: Carefully transfer all consolidated data into the `sites.n3` and `bev` objects within the `reportData.ts` file, ensuring the BEV rules above are followed.