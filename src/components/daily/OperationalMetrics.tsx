import React from 'react';

interface OperationalMetricsProps {
  data: {
    loads?: { [key: string]: number };
    blast_performance?: { [key: string]: string | number };
    silo_levels?: { [key: string]: number };
  } | null;
}

const OperationalMetrics: React.FC<OperationalMetricsProps> = ({ data }) => {
  if (!data) {
    return <div className="p-4 bg-gray-100 rounded-lg">Loading operational metrics...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Operational Metrics</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Loads Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Loads by Area</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            {data.loads && Object.entries(data.loads).map(([area, count]) => (
              <div key={area} className="flex justify-between items-center py-1">
                <span className="text-gray-600">{area}:</span>
                <span className="font-bold text-blue-600">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Blast Performance Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Blast Performance</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            {data.blast_performance && Object.entries(data.blast_performance).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-1">
                <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}:</span>
                <span className="font-bold text-purple-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Silo Levels Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Silo Levels (%)</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            {data.silo_levels && Object.entries(data.silo_levels).map(([silo, level]) => (
              <div key={silo} className="flex justify-between items-center py-1">
                <span className="text-gray-600">{silo}:</span>
                <span className="font-bold text-indigo-600">{level}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalMetrics;
