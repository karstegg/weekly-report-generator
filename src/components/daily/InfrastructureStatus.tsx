import React from 'react';

interface InfrastructureStatusProps {
  data: {
    plant_blockages?: { location: string; duration: string }[];
    fire_alarms?: { count: number; locations: string[] };
    main_fans_status?: string;
    chute_crusher_issues?: string[];
  } | null;
}

const InfrastructureStatus: React.FC<InfrastructureStatusProps> = ({ data }) => {
  if (!data) {
    return <div className="p-4 bg-gray-100 rounded-lg">Loading infrastructure status...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Infrastructure Status</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Plant Blockages */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Plant Blockages</h3>
          <div className="bg-orange-50 p-3 rounded-lg space-y-2">
            {Array.isArray(data.plant_blockages) && data.plant_blockages.length > 0 ? data.plant_blockages.map((blockage, index) => (
              <div key={index} className="text-orange-700">
                <span className="font-semibold">{blockage.location}:</span> {blockage.duration}
              </div>
            )) : <p className="text-gray-500">No blockages reported.</p>}
          </div>
        </div>

        {/* Fire Alarms */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Fire Alarms</h3>
          <div className="bg-red-50 p-3 rounded-lg">
            {data.fire_alarms ? (
              <div>
                <p className="text-red-700"><span className="font-bold">{data.fire_alarms.count}</span> alarms</p>
                <p className="text-sm text-red-600">Locations: {Array.isArray(data.fire_alarms.locations) ? data.fire_alarms.locations.join(', ') : 'N/A'}</p>
              </div>
            ) : <p className="text-gray-500">No fire alarms reported.</p>}
          </div>
        </div>

        {/* Main Fans Status */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Main Fans</h3>
          <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-lg">{data.main_fans_status || 'Status not reported.'}</p>
        </div>

        {/* Chute/Crusher Issues */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Chute/Crusher Issues</h3>
          <ul className="list-disc list-inside bg-gray-50 p-3 rounded-lg text-gray-700 space-y-1">
            {Array.isArray(data.chute_crusher_issues) && data.chute_crusher_issues.length > 0 ? data.chute_crusher_issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            )) : <p className="text-gray-500">No issues reported.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureStatus;
