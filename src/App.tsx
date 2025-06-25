import React, { useState, useEffect } from 'react';
import { DailyReportData } from './services/api';
import { mockDailyReport } from './data/mockReport'; // Import mock data

// Import the new daily report components
import SafetyReport from './components/daily/SafetyReport';
import ProductionPerformance from './components/daily/ProductionPerformance';

import EquipmentAvailability from './components/daily/EquipmentAvailability';
import EquipmentStatus from './components/daily/EquipmentStatus';
import InfrastructureStatus from './components/daily/InfrastructureStatus';
import GeneralInfo from './components/daily/GeneralInfo';
import ErrorBoundary from './components/common/ErrorBoundary';

const App: React.FC = () => {
  // Use mock data for development
  const [reportData, setReportData] = useState<DailyReportData | null>(mockDailyReport);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Set to false since we are using mock data
  const [error, setError] = useState<string | null>(null);

  // The useEffect hook for fetching real data is commented out for now
  /*
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        const data = await getLatestDailyReport();
        setReportData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch the latest report. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, []);
  */

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading latest report...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  if (!reportData) {
    return <div className="flex items-center justify-center min-h-screen">No report data available.</div>;
  }

  // Calculate the date for the report (previous day)
  const reportDate = new Date(reportData.report_date);
  reportDate.setDate(reportDate.getDate() - 1);
  const formattedDate = reportDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Daily Production Report</h1>
            <p className="text-gray-500">
              {reportData.site} - Report for {formattedDate} - {reportData.shift} Shift
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors print:hidden"
          >
            Print to PDF
          </button>
        </header>

        <ErrorBoundary>
          <main className="space-y-6">
            <SafetyReport data={reportData.safety} />
            <ProductionPerformance data={reportData.production_performance} />
            <EquipmentAvailability data={reportData.equipment_availability} />
            <EquipmentStatus data={reportData.equipment_status} />
            <InfrastructureStatus data={reportData.infrastructure_status} />
            <GeneralInfo data={reportData.general_info} />
          </main>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
