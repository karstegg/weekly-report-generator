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
  const dtAvailability = 78;
  const target = 85;
  const variance = dtAvailability - target;

  const unitAvailability = [
    { unit: 'DT0146', availability: 99.0 },
    { unit: 'DT0147', availability: 51.0 },
    { unit: 'DT0149', availability: 99.0 },
    { unit: 'DT0150', availability: 97.0 },
    { unit: 'DT0162', availability: 94.0 },
    { unit: 'DT0163', availability: 62.0 },
    { unit: 'DT0172', availability: 43.0 },
  ];

  const breakdowns = [
    { type: 'Electrical', machine: 'DT0172', comment: 'HVEL Fault @ Batt Bay', hours: 37.17 },
    { type: 'Electrical', machine: 'DT0147', comment: 'Emergency stop @ tramming parking', hours: 31.18 },
    { type: 'Electrical', machine: 'DT0163', comment: 'Red Stop Lamb @ Batt Bay', hours: 26.38 },
    { type: 'Mechanical', machine: 'DT0162', comment: 'Tyre @ Batt Bay', hours: 3.95 },
    { type: 'Electrical', machine: 'DT0150', comment: 'Invertor @ Batt Bay', hours: 2.27 },
    { type: 'Mechanical', machine: 'DT0149', comment: 'Tyre @ Batt Bay', hours: 1.00 },
    { type: 'Electrical', machine: 'DT0146', comment: 'Invertor @ Batt Bay', hours: 0.67 },
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
