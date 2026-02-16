import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Availability } from '../../data/reportData';

const AvailabilityBar: React.FC<Availability> = ({ label, percentage, target = 85 }) => {
  const roundedPercentage = Math.round(percentage);
  let barColor = 'bg-red-500';
  let textColor = 'text-white';
  let icon = <AlertTriangle className="text-red-600" size={22} />;

  if (roundedPercentage >= target) {
    barColor = 'bg-green-500';
    icon = <CheckCircle className="text-green-600" size={22} />;
  } else if (roundedPercentage >= 80) {
    barColor = 'bg-yellow-500';
    textColor = 'text-black';
    icon = <AlertTriangle className="text-yellow-600" size={22} />;
  }

  return (
    <div className="text-center">
      <div className="text-xl font-semibold mb-1">{label}</div>
      <div className={`w-full ${barColor} rounded-full h-8 flex items-center justify-center mb-1`}>
        <span className={`text-lg font-bold ${textColor}`}>{roundedPercentage}%</span>
      </div>
      <div>{icon}</div>
    </div>
  );
};

export default AvailabilityBar;