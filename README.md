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

This project uses a workflow-driven process to ensure reports are generated consistently and efficiently. The process is managed by a coding assistant (like Cascade).

### The 3-Step Workflow Process

1.  **Onboard the Assistant (First time in a new session):**
    - **Command:** `/onboard-assistant`
    - **Purpose:** This loads all project context, documentation, and procedures into the assistant's memory. It's the essential first step for any new chat session to ensure a seamless handover.

2.  **Initialize the Weekly Report:**
    - **Command:** `/initialize-report`
    - **Purpose:** This prepares the repository for the new week. The assistant will ask for the week number and automatically create a new branch (e.g., `week-53`), ensuring a clean slate for the update.

3.  **Update the Report Data:**
    - **Command:** `/weekly-report-update`
    - **Purpose:** This is the main workflow for updating the report. The assistant will guide you through providing the new data, updating the `src/data/reportData.ts` file, and reviewing the changes in a live preview.

This structured process minimizes manual errors and ensures every weekly report is consistent with the last.
