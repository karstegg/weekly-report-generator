import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Footer from '../shared/Footer';

interface BEVDTBreakdownSlideProps {
  footerSrc: string;
  weekNumber: number;
}

const slideStyle: React.CSSProperties = {
  width: '960px',
  height: '720px',
  margin: '0 auto 32px auto',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white'
};

const BEVDTBreakdownSlide: React.FC<BEVDTBreakdownSlideProps> = ({ footerSrc, weekNumber }) => {
  const dtAvailability = 81;
  const target = 85;
  const variance = dtAvailability - target;

  const unitAvailability = [
    { unit: 'DT0146', availability: 85.0 },
    { unit: 'DT0147', availability: 36.0 },
    { unit: 'DT0149', availability: 97.0 },
    { unit: 'DT0150', availability: 90.0 },
    { unit: 'DT0162', availability: 97.0 },
    { unit: 'DT0163', availability: 100.0 },
    { unit: 'DT0172', availability: 55.0 },
  ];

  const breakdowns = [
    { type: 'Mechanical', machine: 'DT0147', comment: 'Inverter error and Hydraulic oil leak @ battery bay', hours: 96.74 },
    { type: 'Electrical', machine: 'DT0172', comment: 'HVIL fault', hours: 72.00 },
    { type: 'Strata', machine: 'DT0146', comment: 'Collision avoidance warning @ battery bay', hours: 24.60 },
    { type: 'Tyre Bay', machine: 'DT0163', comment: 'Tyre bay change rear tyre', hours: 14.17 },
    { type: 'Electrical', machine: 'DT0150', comment: 'Battery insulation fault @ 31W/54S R5', hours: 11.25 },
    { type: 'Tyre Bay', machine: 'DT0163', comment: 'Puncture @ 107S/13E NW', hours: 6.72 },
    { type: 'Strata', machine: 'DT0150', comment: 'Comms error @ 13W/112S NW', hours: 3.03 },
    { type: 'Electrical', machine: 'DT0149', comment: 'Machine powerless @ 17N/12W MW', hours: 2.63 },
    { type: 'Strata', machine: 'DT0162', comment: 'STRATA @ old tips', hours: 3.63 },
    { type: 'Electrical', machine: 'DT0172', comment: 'Battery not connecting @ battery bay', hours: 1.95 },
    { type: 'Electrical', machine: 'DT0150', comment: 'Battery insulation fault @ 16W/103S MW', hours: 1.25 },
  ];

  const getAvailabilityColor = (availability: number) => {
    if (availability >= 85) return 'bg-blue-500';
    if (availability >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 pb-32 flex flex-col">
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
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default BEVDTBreakdownSlide;
