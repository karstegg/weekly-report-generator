import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { ReportData } from '../../data/reportData';
import Footer from '../shared/Footer';

interface UtilitySectionSlideProps {
  data: ReportData['utilitySection'];
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

const UtilitySectionSlide: React.FC<UtilitySectionSlideProps> = ({ data, footerSrc, weekNumber }) => {
  const totalUnits = data.fleetStatus.available + data.fleetStatus.unavailable;
  const availabilityPercentage = ((data.fleetStatus.available / totalUnits) * 100).toFixed(0);

  const getCellColor = (color: string) => {
    if (color === 'green') return 'bg-green-100';
    if (color === 'yellow') return 'bg-yellow-100';
    if (color === 'red') return 'bg-red-100';
    return 'bg-white';
  };

  const getAvailabilityColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-700 bg-green-100';
    if (percentage >= 80) return 'text-yellow-700 bg-yellow-100';
    return 'text-red-700 bg-red-100';
  };

  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-4 pb-24 overflow-hidden">
        <h2 className="text-3xl font-bold text-blue-800 mb-3 text-center">UTILITY SECTION PERFORMANCE OVERVIEW</h2>

        <div className="grid grid-cols-[1fr_2fr_1fr] gap-2 mb-3">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 rounded-lg p-2 text-center">
            <CheckCircle className="mx-auto mb-1 text-green-600" size={24} />
            <div className="text-3xl font-bold text-green-700">{data.fleetStatus.available}</div>
            <div className="text-xs font-semibold text-green-800">Available</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-lg p-2 text-center">
            <div className="text-xs font-semibold text-blue-800 mb-1">Overall Fleet Availability</div>
            <div className={`text-4xl font-bold ${Number(availabilityPercentage) >= 85 ? 'text-green-700' : 'text-yellow-700'}`}>
              {availabilityPercentage}%
            </div>
            <div className="text-xs text-gray-600">
              {data.fleetStatus.available} of {totalUnits} units available
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-500 rounded-lg p-2 text-center">
            <AlertTriangle className="mx-auto mb-1 text-red-600" size={24} />
            <div className="text-3xl font-bold text-red-700">{data.fleetStatus.unavailable}</div>
            <div className="text-xs font-semibold text-red-800">Unavailable</div>
          </div>
        </div>

        <div className="overflow-auto" style={{ maxHeight: '520px' }}>
          <table className="w-full border-collapse text-xs">
            <thead className="sticky top-0 bg-blue-900 text-white">
              <tr>
                <th className="border border-gray-300 px-2 py-1 text-left font-bold">Area / Owner</th>
                <th className="border border-gray-300 px-1 py-1 text-center font-bold">Mon</th>
                <th className="border border-gray-300 px-1 py-1 text-center font-bold">Tue</th>
                <th className="border border-gray-300 px-1 py-1 text-center font-bold">Wed</th>
                <th className="border border-gray-300 px-1 py-1 text-center font-bold">Thu</th>
                <th className="border border-gray-300 px-1 py-1 text-center font-bold">Fri</th>
                <th className="border border-gray-300 px-2 py-1 text-center font-bold">Weekly Av. Avail.</th>
              </tr>
            </thead>
            <tbody>
              {data.dailyTracking.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 px-2 py-1 font-semibold">{row.area}</td>
                  <td className={`border border-gray-300 px-1 py-1 text-center ${getCellColor(row.mon.color)}`}>
                    {row.mon.available}/{row.mon.total}
                  </td>
                  <td className={`border border-gray-300 px-1 py-1 text-center ${getCellColor(row.tue.color)}`}>
                    {row.tue.available}/{row.tue.total}
                  </td>
                  <td className={`border border-gray-300 px-1 py-1 text-center ${getCellColor(row.wed.color)}`}>
                    {row.wed.available}/{row.wed.total}
                  </td>
                  <td className={`border border-gray-300 px-1 py-1 text-center ${getCellColor(row.thu.color)}`}>
                    {row.thu.available}/{row.thu.total}
                  </td>
                  <td className={`border border-gray-300 px-1 py-1 text-center ${getCellColor(row.fri.color)}`}>
                    {row.fri.available}/{row.fri.total}
                  </td>
                  <td className={`border border-gray-300 px-2 py-1 text-center font-bold ${getAvailabilityColor(row.weeklyAvg)}`}>
                    {row.weeklyAvg.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer src={footerSrc} />
      <div className="absolute bottom-2 right-4 text-xs text-gray-500">
        Week {weekNumber} | Utility Vehicle Tracking
      </div>
    </div>
  );
};

export default UtilitySectionSlide;
