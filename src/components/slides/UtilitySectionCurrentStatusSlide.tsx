import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ReportData } from '../../data/reportData';
import Footer from '../shared/Footer';

interface UtilitySectionCurrentStatusSlideProps {
  data: ReportData['utilitySectionCurrentStatus'];
  footerSrc: string;
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

const UtilitySectionCurrentStatusSlide: React.FC<UtilitySectionCurrentStatusSlideProps> = ({ data, footerSrc }) => {
  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 pb-32 overflow-hidden">
        <h2 className="text-3xl font-bold text-blue-800 mb-2 text-center">UTILITY SECTION CURRENT STATUS</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Friday, 27 February 2026</h3>
        
        <div className="mt-2">
          <h3 className="text-sm font-bold mb-1 bg-red-100 p-2 rounded flex items-center">
            <AlertTriangle className="mr-2" size={16} />
            Unavailable Units by Area/Owner
          </h3>
          <div className="overflow-hidden">
            <table className="w-full border-collapse" style={{ fontSize: '12px' }}>
              <thead className="bg-gray-200">
                <tr style={{ height: '18px' }}>
                  <th className="border border-gray-300 px-2 py-0 text-left" style={{ width: '20%' }}>Area/Owner</th>
                  <th className="border border-gray-300 px-2 py-0 text-center" style={{ width: '10%' }}>Unavailable</th>
                  <th className="border border-gray-300 px-2 py-0 text-left" style={{ width: '70%' }}>Details (Unit - Reason/Comment)</th>
                </tr>
              </thead>
              <tbody>
                {data.areaStatus.map((area, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} style={{ minHeight: '16px' }}>
                    <td className="border border-gray-300 px-2 py-1 font-semibold align-top">{area.area}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center font-bold text-red-700 align-top">{area.unavailable}</td>
                    <td className="border border-gray-300 px-2 py-1">
                      <ul className="list-none space-y-0.5">
                        {area.details.map((detail, j) => (
                          <li key={j}>
                            <span className="font-semibold">{detail.unit}</span> - {detail.reason}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3 px-3 py-2 bg-blue-50 border-l-4 border-blue-500 text-sm">
          <strong>Total Unavailable:</strong> {data.totalUnavailable} units across {data.areaStatus.length} areas
        </div>
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default UtilitySectionCurrentStatusSlide;
