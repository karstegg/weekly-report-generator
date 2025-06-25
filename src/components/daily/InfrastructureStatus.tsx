import React from 'react';
import { InfrastructureStatusData } from '../../data/reportData';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

interface InfrastructureStatusProps {
  data: InfrastructureStatusData | null;
}

const InfrastructureStatus: React.FC<InfrastructureStatusProps> = ({ data }) => {
  if (!data) {
    return (
        <Card>
            <CardContent className="p-4">
                Loading infrastructure status...
            </CardContent>
        </Card>
    );
  }

  const { plant_blockages, fire_alarms, main_fans_operational, chute_crusher_issues } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>6. Infrastructure Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
            
            {/* Plant Blockages */}
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Plant Blockages</h3>
              <div className="bg-orange-50 p-3 rounded-lg space-y-2">
                {plant_blockages && plant_blockages.length > 0 ? plant_blockages.map((blockage, index) => (
                  <div key={index} className="text-orange-700">
                    <p><span className="font-semibold">{blockage.location}:</span> {blockage.duration}</p>
                  </div>
                )) : <p className="text-gray-500">No blockages reported.</p>}
              </div>
            </div>

            {/* Fire Alarms */}
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Fire Alarms</h3>
              <div className="bg-red-50 p-3 rounded-lg space-y-2">
                {fire_alarms && fire_alarms.count > 0 ? (
                  <div className="text-red-700">
                    <p><span className="font-semibold">Count:</span> {fire_alarms.count}</p>
                    {fire_alarms.locations && fire_alarms.locations.length > 0 && (
                      <ul className="list-disc list-inside pl-4">
                        {fire_alarms.locations.map((loc, i) => <li key={i}>{loc}</li>)}
                      </ul>
                    )}
                  </div>
                ) : <p className="text-gray-500">No fire alarms reported.</p>}
              </div>
            </div>

            {/* Main Fans Status */}
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Main Fans</h3>
              <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                <p><strong>Status:</strong> {main_fans_operational ? 'Operational' : 'Not Operational'}</p>
              </div>
            </div>

            {/* Chute/Crusher Issues */}
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Chute/Crusher Issues</h3>
              <ul className="list-disc list-inside bg-gray-50 p-3 rounded-lg text-gray-700 space-y-1">
                {chute_crusher_issues.length > 0 ? chute_crusher_issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                )) : <p className="text-gray-500">No issues reported.</p>}
              </ul>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfrastructureStatus;
