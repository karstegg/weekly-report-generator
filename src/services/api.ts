import axios from 'axios';

// The base URL for our FastAPI backend.
// In development, this will be proxied to http://localhost:8000 to avoid CORS issues.
const API_BASE_URL = '/api';

// This interface defines the structure of the data we expect from the backend.
// It should align with the data returned by the /reports/daily/latest endpoint.
export interface DailyReportData {
  id: number;
  report_date: string;
  shift: string;
  site: string;
  safety: any;
  production_performance: any;
  operational_metrics: any;
  equipment_availability: any;
  equipment_status: any;
  infrastructure_status: any;
  created_at: string;
}

/**
 * Fetches the latest daily report from the backend API.
 * @returns A promise that resolves to the latest daily report data.
 */
export async function getLatestDailyReport(): Promise<DailyReportData> {
  try {
    const response = await axios.get<DailyReportData>(`${API_BASE_URL}/reports/daily/latest`);
    return response.data;
  } catch (error) {
    console.error("Error fetching latest daily report:", error);
    // In a real-world app, this should be handled with a more user-friendly error state.
    throw error;
  }
}

/**
 * Sends a raw report payload to the backend for ingestion.
 * @param payload - The data to be ingested, simulating a WhatsApp message.
 */
export async function ingestDailyReport(payload: { message: string; date: string; shift: string; site: string; }): Promise<any> {
  try {
    const response = await axios.post(`${API_BASE_URL}/whatsapp/ingest/`, payload);
    return response.data;
  } catch (error) {
    console.error("Error ingesting daily report:", error);
    throw error;
  }
}
