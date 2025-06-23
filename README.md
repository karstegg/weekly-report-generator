# Semi-Automated Weekly Report Generator

This project is a React-based application for generating a standardized, multi-slide weekly engineering report. It is designed to be data-driven, allowing a user to update the report's content simply by modifying a structured data file.

## Project Structure

- **/public**: Contains the main `index.html` file and any other static assets.
- **/src**: Contains all the React source code.
  - **/components**: Reusable React components.
    - **/shared**: Components used across multiple slides (e.g., `AvailabilityBar`).
    - **/slides**: Components that represent individual slides in the report.
  - **/data**: Contains the structured data for the report.
    - `reportData.ts`: The single source of truth for all content in the report. This is the **only file you need to edit** to create a new report.
  - `App.tsx`: The main application component that assembles the slides and handles navigation.
  - `index.tsx`: The entry point for the React application.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (which includes npm)

### Installation

1.  Clone the repository or download the source code.
2.  Open a terminal in the project's root directory.
3.  Install the necessary dependencies:

    ```bash
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

This will open the application in your default web browser, usually at `http://localhost:5173`.

## How to Generate a New Weekly Report

To update the report with new data for a different week, follow these steps:

1.  **Open the Data File:** Navigate to `src/data/reportData.ts`.

2.  **Edit the Content:** This file contains a single JavaScript object called `reportData`. Update the values within this object with the new week's information. This includes:
    - `weekNumber` and `dateRange`.
    - Highlights, lowlights, issues, and priorities in the `heal` section.
    - Performance metrics for `shaftsAndWinders`.
    - All data for each site in the `sites` object (Nchwaning 3, Nchwaning 2, Gloria), including trend chart image URLs and comments.
    - BEV performance data.

3.  **Save the File:** Once you have updated the data, save the `reportData.ts` file.

4.  **View the Updated Report:** The development server will automatically hot-reload, and your browser will display the report with the new data. No other code changes are necessary.
