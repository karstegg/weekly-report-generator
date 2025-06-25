import React from 'react';
import { EquipmentAvailabilityData } from '../../data/reportData';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { DataRow } from '../ui/data-display';

interface EquipmentAvailabilityProps {
  data: EquipmentAvailabilityData;
}

const equipmentNameMap: { [key: string]: string } = {
  dts: 'Dump Trucks',
  fls: 'LHDs',
  hds: 'Hydraulic Drills',
  rts: 'Roofbolters',
  srs: 'Scalers',
  dz13: 'Dozer (DZ13)',
  gd12: 'Grader (GD12)',
  emulsion_uvs: 'Emulsion UVs',
  logistics_uvs: 'Logistics UVs',
  manlifts: 'Manlifts',
  sampling_uvs: 'Sampling UVs',
  survey_equipment: 'Survey UVs'
};

const mainFleetKeys = ['dts', 'fls', 'hds', 'rts', 'srs'];

const EquipmentAvailability: React.FC<EquipmentAvailabilityProps> = ({ data }) => {
  if (!data) return <p>No equipment availability data available.</p>;

  const { tmm_fleet_availability, start_of_shift_status, support_equipment } = data;

  const mainFleetAvailability = Object.entries(tmm_fleet_availability).filter(([key]) => mainFleetKeys.includes(key));
  const supportFleetAvailability = Object.entries(tmm_fleet_availability).filter(([key]) => !mainFleetKeys.includes(key));

  return (
    <Card>
      <CardHeader>
        <CardTitle>4. Equipment</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Main Fleet */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Main Fleet</h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h4 className="font-semibold mb-2">TMM Fleet Availability (%)</h4>
              {mainFleetAvailability.map(([key, value]) => (
                <DataRow key={key}>
                  <span>{equipmentNameMap[key] || key.toUpperCase()}:</span>
                  <span className={value && value < 85 ? 'text-red-500' : 'text-green-500'}>
                    {value !== null ? `${value}%` : '?'}
                  </span>
                </DataRow>
              ))}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Start of Shift Status</h4>
              {Object.entries(start_of_shift_status).map(([key, value]) => (
                value && (
                  <DataRow key={key}>
                    <span>{equipmentNameMap[key] || key.toUpperCase()}:</span>
                    <div className="flex items-center text-sm">
                      <span className={value.available < value.total ? 'text-red-500 font-semibold' : 'text-green-500'}>
                        {value.available}/{value.total}
                      </span>
                    </div>
                  </DataRow>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Support Equipment */}
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Support Equipment</h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Availability (%)</h4>
              {supportFleetAvailability.map(([key, value]) => (
                <DataRow key={key}>
                  <span>{equipmentNameMap[key] || key.toUpperCase()}:</span>
                  <span>{value !== null ? `${value}%` : '?'}</span>
                </DataRow>
              ))}
              {Object.keys(support_equipment).map((key) => (
                <DataRow key={key}>
                  <span>{equipmentNameMap[key] || key.toUpperCase()}:</span>
                  <span>?</span>
                </DataRow>
              ))}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Status</h4>
              <p className="text-sm text-gray-500">No start-of-shift count for support equipment.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentAvailability;
