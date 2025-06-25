import React from 'react';
import { EquipmentStatusData } from '../../data/reportData';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

interface EquipmentStatusProps {
  data: EquipmentStatusData;
}

const mainFleetPrefixes = ['DT', 'FL', 'HD', 'RT', 'SR'];
const supportEquipmentPrefixes = ['UV', 'DZ', 'GD', 'WK', 'MN', 'EM']; // Assuming WK=Workshop, MN=Manlift, EM=Emulsion

const getEquipmentCategory = (equipmentId: string): 'Main Fleet' | 'Support Equipment' | 'Other' => {
  if (mainFleetPrefixes.some(prefix => equipmentId.toUpperCase().startsWith(prefix))) {
    return 'Main Fleet';
  }
  if (supportEquipmentPrefixes.some(prefix => equipmentId.toUpperCase().startsWith(prefix))) {
    return 'Support Equipment';
  }
  return 'Other';
};

const BreakdownList: React.FC<{ breakdowns: any[], title: string }> = ({ breakdowns, title }) => {
    if (breakdowns.length === 0) return null;
    return (
        <div className="mb-4">
            <h4 className="font-semibold text-md mb-2 text-gray-800 border-b pb-1">{title}</h4>
            <ul className="space-y-2 columns-1 sm:columns-2 lg:columns-3 xl:columns-4">
                {breakdowns.map((breakdown, index) => (
                    <li key={index} className="text-sm break-inside-avoid">
                        <span className="font-semibold text-red-600">{breakdown.equipment_id}:</span>
                        <span className="ml-2 text-gray-700">{breakdown.fault_description}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const EquipmentStatus: React.FC<EquipmentStatusProps> = ({ data }) => {
  if (!data || !data.current_breakdowns || data.current_breakdowns.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>5. Current Breakdowns</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-500">No breakdowns reported.</p>
            </CardContent>
        </Card>
    );
  }

  const { current_breakdowns } = data;

  const breakdownsByCat = {
    'Main Fleet': current_breakdowns.filter(b => getEquipmentCategory(b.equipment_id) === 'Main Fleet'),
    'Support Equipment': current_breakdowns.filter(b => getEquipmentCategory(b.equipment_id) === 'Support Equipment'),
    'Other': current_breakdowns.filter(b => getEquipmentCategory(b.equipment_id) === 'Other'),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>5. Current Breakdowns</CardTitle>
      </CardHeader>
      <CardContent>
        <BreakdownList breakdowns={breakdownsByCat['Main Fleet']} title="Main Fleet" />
        <BreakdownList breakdowns={breakdownsByCat['Support Equipment']} title="Support Equipment" />
        <BreakdownList breakdowns={breakdownsByCat['Other']} title="Other" />
      </CardContent>
    </Card>
  );
};

export default EquipmentStatus;
