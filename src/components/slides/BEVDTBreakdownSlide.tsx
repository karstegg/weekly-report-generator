import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Footer from '../shared/Footer';

interface BEVDTBreakdownSlideProps {
  footerSrc: string;
  weekNumber: number;
}

const BEVDTBreakdownSlide: React.FC<BEVDTBreakdownSlideProps> = ({ footerSrc, weekNumber }) => {
  const dtAvailability = 76;
  const target = 85;
  const variance = dtAvailability - target;

  const unitAvailability = [
    { unit: 'DT0146', availability: 100 },
    { unit: 'DT0147', availability: 86.44 },
    { unit: 'DT0149', availability: 72.41 },
    { unit: 'DT0150', availability: 93.26 },
    { unit: 'DT0162', availability: 77.8 },
    { unit: 'DT0163', availability: 95.93 },
    { unit: 'DT0171', availability: 3.99 },
  ];

  const breakdowns = [
    { type: 'Mechanical', machine: 'DT0171', comment: 'A-Frame Failure', hours: 112.35 },
    { type: 'Mechanical', machine: 'DT0149', comment: 'Gears - 43n11w mw', hours: 26.28 },
    { type: 'Battery', machine: 'DT0147', comment: 'Flat Battery - Charging', hours: 16.77 },
    { type: 'Battery', machine: 'DT0147', comment: 'Charging Battery', hours: 15.87 },
    { type: 'Strata', machine: 'DT0162', comment: 'Machine not moving @ 110S/14W NW', hours: 8.43 },
    { type: 'Strata', machine: 'DT0162', comment: '@ sat tip nr 1', hours: 6.53 },
    { type: 'Electrical', machine: 'DT0149', comment: 'Red stop light @ S4s r5', hours: 4.88 },
    { type: 'Auto Electrical', machine: 'DT0147', comment: 'Inverter error @ wshop', hours: 3.43 },
    { type: 'Auto Electrical', machine: 'DT0149', comment: 'Engine cut off S4s30w r5', hours: 3.63 },
    { type: 'Electrical', machine: 'DT0150', comment: 'Invertor error @ old tip 3', hours: 3.37 },
    { type: 'Electrical', machine: 'DT0150', comment: 'Powerless @ Battery Bay', hours: 3.08 },
    { type: 'Battery', machine: 'DT0149', comment: 'Changing Battery', hours: 5.9 },
    { type: 'Battery', machine: 'DT0150', comment: 'Change Battery', hours: 3.95 },
    { type: 'Battery', machine: 'DT0162', comment: 'Charging Battery - No extra battery', hours: 1.3 },
    { type: 'Electrical', machine: 'DT0163', comment: 'No contact with modules @ Battery Bay', hours: 1.55 },
  ];

  const getAvailabilityColor = (availability: number) => {
    if (availability >= 85) return 'bg-blue-500';
    if (availability >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col p-12 relative overflow-hidden">
      <div className="flex-1 flex flex-col">
        <h1 className="text-5xl font-bold text-blue-900 mb-8">DT: AVAILABILITY & BREAKDOWNS</h1>
        
        <div className="flex gap-8 mb-6">
          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600 w-80">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span className="text-orange-900 font-semibold">BEV Availability</span>
            </div>
            <div className="text-6xl font-bold text-orange-700 mb-1">{dtAvailability}%</div>
            <div className="text-sm text-gray-600">
              Goal: {target}% ({variance > 0 ? '+' : ''}{variance.toFixed(1)}%)
            </div>
          </div>

          <div className="flex-1 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">BEV Availability by Unit</h3>
            <div className="space-y-2">
              {unitAvailability.map((item) => (
                <div key={item.unit} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 w-20">{item.unit}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div
                      className={`${getAvailabilityColor(item.availability)} h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold transition-all`}
                      style={{ width: `${item.availability}%` }}
                    >
                      {item.availability}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Breakdown Details</h3>
          <div className="overflow-auto h-full">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="text-left p-2 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-2 font-semibold text-gray-700">Machine_id</th>
                  <th className="text-left p-2 font-semibold text-gray-700">Comment</th>
                  <th className="text-right p-2 font-semibold text-gray-700">Hours</th>
                </tr>
              </thead>
              <tbody>
                {breakdowns.map((breakdown, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-2 text-gray-700">{breakdown.type}</td>
                    <td className="p-2 text-gray-700">{breakdown.machine}</td>
                    <td className="p-2 text-gray-700">{breakdown.comment}</td>
                    <td className="p-2 text-right text-gray-700">{breakdown.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer src={footerSrc} />
    </div>
  );
};

export default BEVDTBreakdownSlide;
