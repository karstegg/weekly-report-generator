import React from 'react';
import { OperationalMetricsData } from '../../data/reportData';

interface OperationalMetricsProps {
  data: OperationalMetricsData | null;
}

const formatSiloName = (name: string) => {
  return name.replace(/_/g, ' ').replace('underground', 'UG').replace('surface', 'Surf').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const OperationalMetrics: React.FC<OperationalMetricsProps> = ({ data }) => {
  if (!data) {
    return <div className="p-4 bg-gray-100 rounded-lg">Loading operational metrics...</div>;
  }

  const { loads_by_area, blast_performance, silo_levels } = data;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Operational Metrics</h2>
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Loads Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Loads by Area</h3>
          <div className="bg-gray-50 p-3 rounded-lg space-y-1">
            <div className="flex justify-between"><span className="text-gray-600">Stoping:</span><span className="font-bold text-blue-600">{loads_by_area.stoping}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Development:</span><span className="font-bold text-blue-600">{loads_by_area.development}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Rehab:</span><span className="font-bold text-blue-600">{loads_by_area.rehab}</span></div>
          </div>
        </div>

        {/* Blast Performance Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Blast Performance</h3>
          <div className="bg-gray-50 p-3 rounded-lg space-y-2">
            <div className="flex justify-between"><span className="text-gray-600">Completed:</span><span className="font-bold text-purple-600">{blast_performance.completed} / {blast_performance.planned}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Cancelled:</span><span className="font-bold text-purple-600">{blast_performance.cancelled}</span></div>
            {blast_performance.issues && <p className="text-sm text-gray-500 pt-1">Issues: {blast_performance.issues}</p>}
          </div>
        </div>

        {/* Silo Levels Section */}
        {silo_levels && (
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">Silo Levels (%)</h3>
            <div className="bg-gray-50 p-3 rounded-lg grid grid-cols-2 gap-x-4 gap-y-1">
              {Object.entries(silo_levels).map(([silo, level]) => (
                <div key={silo} className="flex justify-between">
                  <span className="text-gray-600">{formatSiloName(silo)}:</span>
                  <span className="font-bold text-indigo-600">{level}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OperationalMetrics;
