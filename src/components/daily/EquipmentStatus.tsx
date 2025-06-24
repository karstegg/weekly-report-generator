import React from 'react';

interface EquipmentStatusProps {
  data: {
    current_breakdowns?: { equipment_id: string; fault: string }[];
    maintenance_activities?: string[];
    equipment_lockouts?: string[];
  } | null;
}

const EquipmentStatus: React.FC<EquipmentStatusProps> = ({ data }) => {
  if (!data) {
    return <div className="p-4 bg-gray-100 rounded-lg">Loading equipment status...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Equipment Status & Breakdowns</h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Breakdowns */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Current Breakdowns</h3>
          <div className="bg-red-50 p-3 rounded-lg space-y-2">
            {Array.isArray(data.current_breakdowns) && data.current_breakdowns.length > 0 ? data.current_breakdowns.map((bd, index) => (
              <div key={index} className="flex items-start">
                <span className="font-bold text-red-700 mr-2">•</span>
                <div>
                  <span className="font-semibold text-red-800">{bd.equipment_id}:</span>
                  <p className="text-red-600 text-sm">{bd.fault}</p>
                </div>
              </div>
            )) : <p className="text-gray-500">No breakdowns reported.</p>}
          </div>
        </div>

        {/* Maintenance & Lockouts */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">Maintenance Activities</h3>
            <ul className="list-disc list-inside bg-blue-50 p-3 rounded-lg text-blue-700 space-y-1">
              {Array.isArray(data.maintenance_activities) && data.maintenance_activities.length > 0 ? data.maintenance_activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              )) : <p className="text-gray-500">No maintenance activities.</p>}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">Equipment Lockouts</h3>
            <ul className="list-disc list-inside bg-yellow-50 p-3 rounded-lg text-yellow-700 space-y-1">
              {Array.isArray(data.equipment_lockouts) && data.equipment_lockouts.length > 0 ? data.equipment_lockouts.map((lockout, index) => (
                <li key={index}>{lockout}</li>
              )) : <p className="text-gray-500">No lockouts reported.</p>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentStatus;
