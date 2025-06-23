import React, { useState, useEffect } from 'react';
import { getLatestDailyReport, DailyReportData } from './services/api';

// Import the new daily report components
import SafetyReport from './components/daily/SafetyReport';
import ProductionPerformance from './components/daily/ProductionPerformance';
import OperationalMetrics from './components/daily/OperationalMetrics';
import EquipmentAvailability from './components/daily/EquipmentAvailability';
import EquipmentStatus from './components/daily/EquipmentStatus';
import InfrastructureStatus from './components/daily/InfrastructureStatus';

const App: React.FC = () => {
  const [reportData, setReportData] = useState<DailyReportData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Daily Production Report</h1>
            <p className="text-gray-500">
              {reportData.site} - {new Date(reportData.report_date).toLocaleDateString()} - {reportData.shift} Shift
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors print:hidden"
          >
            Print to PDF
          </button>
        </header>

        <main className="space-y-6">
          <SafetyReport data={reportData.safety} />
          <ProductionPerformance data={reportData.production_performance} />
          <OperationalMetrics data={reportData.operational_metrics} />
          <EquipmentAvailability data={reportData.equipment_availability} />
          <EquipmentStatus data={reportData.equipment_status} />
          <InfrastructureStatus data={reportData.infrastructure_status} />
        </main>
      </div>
    </div>
  );
};

export default App;
