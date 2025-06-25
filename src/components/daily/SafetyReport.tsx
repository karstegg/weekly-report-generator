import React from 'react';
import { SafetyData } from '../../data/reportData';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

interface SafetyReportProps {
  data: SafetyData | null;
}

const SafetyReport: React.FC<SafetyReportProps> = ({ data }) => {
  if (!data) {
    return (
        <Card>
            <CardContent className="p-4">Loading safety data...</CardContent>
        </Card>
    );
  }

  if (!data.status) {
      return (
          <Card>
              <CardContent className="p-4">Waiting for safety data...</CardContent>
          </Card>
      );
  }

  const isClear = data.status === 'Clear';
  const statusColor = isClear ? 'text-green-600' : 'text-red-600';
  const bgColor = isClear ? 'bg-green-100' : 'bg-red-100';

  return (
    <Card>
        <CardHeader>
            <CardTitle>1. Safety & Incidents</CardTitle>
        </CardHeader>
        <CardContent>
            <div className={`flex items-center space-x-4 p-3 rounded-md ${bgColor}`}>
                <span className="font-semibold text-lg">Status:</span>
                <span className={`text-lg font-bold ${statusColor}`}>{data.status}</span>
            </div>

            {data.incidents && data.incidents.length > 0 && (
                <div className="mt-4">
                <h3 className="font-semibold text-md text-gray-700 mb-2">Incident Details:</h3>
                <ul className="list-disc list-inside space-y-2">
                    {data.incidents.map((incident, index) => (
                    <li key={index} className="text-gray-600 bg-gray-50 p-2 rounded">
                        <span className="font-semibold">{incident.reference}:</span> {incident.description}
                    </li>
                    ))}
                </ul>
                </div>
            )}

            {data.ldo_reports && data.ldo_reports.length > 0 && (
                <div className="mt-4">
                <h3 className="font-semibold text-md text-gray-700 mb-2">LDO Reports:</h3>
                <ul className="list-disc list-inside space-y-2">
                    {data.ldo_reports.map((report, index) => (
                    <li key={index} className="text-gray-600 bg-gray-50 p-2 rounded">
                        <span className="font-semibold">{report.reference}:</span> {report.description}
                    </li>
                    ))}
                </ul>
                </div>
            )}
        </CardContent>
    </Card>
  );
};

export default SafetyReport;
