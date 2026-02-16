import React from 'react';
import { CheckCircle } from 'lucide-react';
import Footer from '../shared/Footer';

interface BEVFLBreakdownSlideProps {
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

const BEVFLBreakdownSlide: React.FC<BEVFLBreakdownSlideProps> = ({ footerSrc, weekNumber }) => {
  const flAvailability = 85;
  const target = 85;
  const variance = flAvailability - target;

  const unitAvailability = [
    { unit: 'FL0098', availability: 88.1 },
    { unit: 'FL0099', availability: 70.4 },
    { unit: 'FL0107', availability: 90.9 },
    { unit: 'FL0108', availability: 73.7 },
    { unit: 'FL0112', availability: 84.1 },
    { unit: 'FL0113', availability: 89.6 },
  ];

  const breakdowns = [
    { type: 'Boilermaker', machine: 'FL0099', comment: 'Half Arrows@Boilershop', hours: 31.45 },
    { type: 'Boilermaker', machine: 'FL0108', comment: 'Half Arrows @ boilershop', hours: 41.50 },
    { type: 'Strata', machine: 'FL0112', comment: 'GEN 2 COMMS ERROR@BATTERY BAY', hours: 6.52 },
    { type: 'Strata', machine: 'FL0112', comment: 'MACHINE CUT OUT DURING LOADING@14W/21 NW', hours: 5.13 },
    { type: 'Strata', machine: 'FL0112', comment: 'strata system faulty @ mw,105n 18w', hours: 4.28 },
    { type: 'Damages', machine: 'FL0113', comment: 'WINDSCREEN CRACKED@BATTERY BAY', hours: 15.42 },
    { type: 'Auto Electrical', machine: 'FL0107', comment: 'Hydraulic Level sensor@107 13XCUT', hours: 12.30 },
    { type: 'Electrical', machine: 'FL0098', comment: 'TCU Error @ sim2n,27w 7n', hours: 11.40 },
    { type: 'Auto Electrical', machine: 'FL0099', comment: 'Tag box off (battery bay)', hours: 8.03 },
    { type: 'Mechanical', machine: 'FL0098', comment: 'Transm Oil Press WL@22n5w S2N', hours: 7.42 },
    { type: 'Auto Electrical', machine: 'FL0099', comment: 'Not Starting at Boilershop', hours: 4.00 },
    { type: 'Electrical', machine: 'FL0099', comment: 'not starting @ boilershop', hours: 3.55 },
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
        <h1 className="text-5xl font-bold text-blue-900 mb-8">FL: AVAILABILITY & BREAKDOWNS</h1>
        
        <div className="flex gap-8 mb-6">
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600 w-80">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-900 font-semibold">BEV Availability</span>
            </div>
            <div className="text-6xl font-bold text-green-700 mb-1">{flAvailability}%</div>
            <div className="text-sm text-gray-600">
              Goal: {target}% (+{variance.toFixed(1)}%)
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

export default BEVFLBreakdownSlide;
