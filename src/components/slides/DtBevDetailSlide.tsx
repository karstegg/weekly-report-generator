import React from 'react';
import { Battery } from 'lucide-react';
import { ReportData } from '../../data/reportData';
import Footer from '../shared/Footer';

type BevDetailDt = NonNullable<ReportData['bevDetail']>['dt'];

interface DtBevDetailSlideProps {
  data: BevDetailDt;
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

const DtBevDetailSlide: React.FC<DtBevDetailSlideProps> = ({ data, footerSrc, weekNumber: _weekNumber }) => {
  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 pb-32 overflow-auto">
        <h2 className="text-4xl font-bold text-blue-800 mb-4 text-center">DT: AVAILABILITY & BREAKDOWNS</h2>
        
        <div className="grid grid-cols-2 gap-6 mb-4">
          {/* Left side - Availability summary */}
          <div className="bg-orange-50 border-orange-200 rounded-lg p-4">
            <div className="flex items-center mb-2 text-orange-800">
              <Battery className="mr-2" size={24} />
              <h3 className="text-xl font-bold">BEV Availability</h3>
            </div>
            <div className="text-center">
              <div className={`text-6xl font-bold ${data.availability >= 85 ? 'text-green-700' : 'text-yellow-700'}`}>
                {data.availability}%
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Goal: 85% ({data.availability >= 85 ? '+' : ''}{(data.availability - 85).toFixed(1)}%)
              </div>
            </div>
          </div>

          {/* Right side - Availability by Unit chart */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-center">BEV Availability by Unit</h3>
            <div className="space-y-1">
              {data.unitAvailability.map((unit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs font-semibold w-16">{unit.id}</span>
                  <div className="flex-grow bg-gray-200 rounded h-6 relative">
                    <div 
                      className={`${unit.availability >= 85 ? 'bg-blue-500' : unit.availability >= 50 ? 'bg-yellow-500' : 'bg-red-500'} h-6 rounded flex items-center justify-center`}
                      style={{ width: `${unit.availability}%` }}
                    >
                      <span className="text-xs font-bold text-white">{unit.availability}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Breakdown details table */}
        <div className="mt-2">
          <h3 className="text-sm font-bold mb-1 bg-gray-100 p-1 rounded">Breakdown Details</h3>
          <div className="overflow-hidden">
            <table className="w-full border-collapse" style={{ fontSize: '9px' }}>
              <thead className="bg-gray-200">
                <tr style={{ height: '18px' }}>
                  <th className="border border-gray-300 px-1 py-0 text-left" style={{ width: '8%' }}>Type</th>
                  <th className="border border-gray-300 px-1 py-0 text-left" style={{ width: '12%' }}>Machine_id</th>
                  <th className="border border-gray-300 px-1 py-0 text-left" style={{ width: '70%' }}>Comment</th>
                  <th className="border border-gray-300 px-1 py-0 text-right" style={{ width: '10%' }}>Hours</th>
                </tr>
              </thead>
              <tbody>
                {data.breakdownDetails.slice(0, 15).map((breakdown, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} style={{ height: '16px' }}>
                    <td className="border border-gray-300 px-1 py-0">{breakdown.type}</td>
                    <td className="border border-gray-300 px-1 py-0 font-semibold">{breakdown.machineId}</td>
                    <td className="border border-gray-300 px-1 py-0">{breakdown.comment}</td>
                    <td className="border border-gray-300 px-1 py-0 text-right">{breakdown.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default DtBevDetailSlide;
