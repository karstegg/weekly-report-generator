import React from 'react';

interface EquipmentAvailabilityProps {
  data: {
    tmm_fleet_availability?: { [key: string]: number };
    start_of_shift_status?: { [key: string]: { available: number; total: number } };
    support_equipment?: { [key: string]: string };
  } | null;
}

const EquipmentAvailability: React.FC<EquipmentAvailabilityProps> = ({ data }) => {
  if (!data) {
    return <div className="p-4 bg-gray-100 rounded-lg">Loading equipment availability...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Equipment Availability</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TMM Fleet Availability */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">TMM Fleet Availability (%)</h3>
          <div className="bg-gray-50 p-3 rounded-lg space-y-1">
            {data.tmm_fleet_availability && Object.entries(data.tmm_fleet_availability).map(([type, percentage]) => (
              <div key={type} className="flex justify-between items-center">
                <span className="text-gray-600">{type}:</span>
                <span className="font-bold text-green-600">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start of Shift Status */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Start of Shift Status</h3>
          <div className="bg-gray-50 p-3 rounded-lg space-y-1">
            {data.start_of_shift_status && Object.entries(data.start_of_shift_status).map(([type, status]) => (
              <div key={type} className="flex justify-between items-center">
                <span className="text-gray-600">{type}:</span>
                <span className="font-bold text-gray-800">{status.available} / {status.total}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Support Equipment */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Support Equipment</h3>
          <div className="bg-gray-50 p-3 rounded-lg space-y-1">
            {data.support_equipment && Object.entries(data.support_equipment).map(([type, status]) => (
              <div key={type} className="flex justify-between items-center">
                <span className="text-gray-600">{type}:</span>
                <span className="font-semibold text-yellow-600">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentAvailability;
