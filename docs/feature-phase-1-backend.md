# Feature: Phase 1 - Backend & Historical Data

**Parent Branch:** `development`  
**JIRA Ticket:** (if applicable)

## 1. Goal

This feature branch marks the first major step in evolving the **Weekly Report Generator** from a semi-automated tool into a fully interactive and collaborative reporting platform.

The primary objective of Phase 1 is to **build the backend foundation** required to store, manage, and retrieve historical report data, moving away from the current system of storing data in separate Git branches.

## 2. Key Tasks & Implementation Plan

This branch will focus on the following key deliverables:

1.  **Backend Service Setup:**
    *   Initialize a simple backend service using a suitable framework like **FastAPI**.
    *   Establish the basic project structure for the backend (`/backend` directory).

2.  **Data Persistence:**
    *   Migrate the weekly report data from the static `src/data/reportData.ts` file to a persistent storage format.
    *   **Initial Approach:** Store each weekly report as a separate `week-XX.json` file managed by the backend.
    *   **Future Goal:** This can be upgraded to a simple SQLite database later without impacting the frontend.

3.  **API Development:**
    *   Create an API endpoint to list all available weekly reports (e.g., `GET /api/reports`). This will scan the data directory and return a list of available weeks.
    *   Create an API endpoint to fetch the data for a specific week (e.g., `GET /api/reports/:weekNumber`).

4.  **Frontend Integration:**
    *   Modify the React application to fetch report data from the new API endpoints instead of the local `reportData.ts` file.
    *   Implement a dropdown menu in the UI that uses the `GET /api/reports` endpoint to populate a list of past reports.
    *   When a week is selected from the dropdown, the app will call `GET /api/reports/:weekNumber` and re-render with the historical data.

## 3. Definition of Done

This feature is considered complete when:
- The backend service is running and can serve report data via the API.
- The frontend has been refactored to be driven by the API.
- A user can select any previously saved weekly report from a dropdown and view it in the browser.
- The existing `src/data/reportData.ts` file is no longer the primary source of truth for the application.