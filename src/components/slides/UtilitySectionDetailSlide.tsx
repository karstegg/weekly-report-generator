import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ReportData } from '../../data/reportData';
import Footer from '../shared/Footer';

type UtilitySectionData = NonNullable<ReportData['utilitySection']>;

interface UtilitySectionDetailSlideProps {
  data: UtilitySectionData;
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

const UtilitySectionDetailSlide: React.FC<UtilitySectionDetailSlideProps> = ({ data, footerSrc, weekNumber }) => {
  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 pb-32 overflow-hidden">
        <h2 className="text-3xl font-bold text-blue-800 mb-2 text-center">UTILITY SECTION: UNAVAILABILITY DETAILS</h2>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Week {weekNumber} - All Unavailable Units</h3>
        
        {/* Breakdowns Table */}
        <div className="mt-2">
          <h3 className="text-sm font-bold mb-1 bg-red-100 p-2 rounded flex items-center">
            <AlertTriangle className="mr-2" size={16} />
            Weekly Breakdown Summary
          </h3>
          <div className="overflow-hidden">
            <table className="w-full border-collapse" style={{ fontSize: '12px' }}>
              <thead className="bg-gray-200">
                <tr style={{ height: '18px' }}>
                  <th className="border border-gray-300 px-1 py-0 text-left" style={{ width: '15%' }}>Area/Owner</th>
                  <th className="border border-gray-300 px-1 py-0 text-left" style={{ width: '10%' }}>TMM No.</th>
                  <th className="border border-gray-300 px-1 py-0 text-left" style={{ width: '20%' }}>Model</th>
                  <th className="border border-gray-300 px-1 py-0 text-left" style={{ width: '35%' }}>Description - EOS / Breakdown</th>
                  <th className="border border-gray-300 px-1 py-0 text-left" style={{ width: '20%' }}>Remarks / Comment</th>
                </tr>
              </thead>
              <tbody>
                {data.breakdowns.map((breakdown, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} style={{ height: '16px' }}>
                    <td className="border border-gray-300 px-1 py-0">{breakdown.area}</td>
                    <td className="border border-gray-300 px-1 py-0 font-semibold">{breakdown.tmmNo}</td>
                    <td className="border border-gray-300 px-1 py-0">{breakdown.model}</td>
                    <td className="border border-gray-300 px-1 py-0">{breakdown.description}</td>
                    <td className="border border-gray-300 px-1 py-0">{breakdown.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* OEM Assistance Note */}
        {data.oemAssistanceRequired > 0 && (
          <div className="mt-3 px-3 py-2 bg-yellow-50 border-l-4 border-yellow-500 text-sm italic text-yellow-800">
            <strong>Note:</strong> {data.oemAssistanceRequired} unit(s) require OEM assistance
          </div>
        )}
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default UtilitySectionDetailSlide;
