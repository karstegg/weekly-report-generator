import React from 'react';

// Define the shape of the safety data prop
interface SafetyReportProps {
  data: {
    status: string;
    details?: string;
  } | null;
}

const SafetyReport: React.FC<SafetyReportProps> = ({ data }) => {
  if (!data) {
    return <div className="p-4 bg-gray-100 rounded-lg">Loading safety data...</div>;
  }

  const isClear = data.status?.toLowerCase() === 'clear';
  const statusColor = isClear ? 'text-green-600' : 'text-red-600';
  const bgColor = isClear ? 'bg-green-100' : 'bg-red-100';

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Safety & Incidents</h2>
      <div className={`flex items-center space-x-4 p-3 rounded-md ${bgColor}`}>
        <span className="font-semibold text-lg">Status:</span>
        <span className={`text-lg font-bold ${statusColor}`}>{data.status || 'Unknown'}</span>
      </div>
      {data.details && (
        <div className="mt-4">
          <h3 className="font-semibold text-md text-gray-700">Details:</h3>
          <p className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-2 rounded">{data.details}</p>
        </div>
      )}
    </div>
  );
};

export default SafetyReport;
