import React from 'react';
import { Battery, Zap } from 'lucide-react';
import { ReportData } from '../../data/reportData';
import Footer from '../shared/Footer';

interface BevPerformanceSlideProps {
  data: ReportData['bev'];
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

type Breakdown = { equipment: string; details: string[] };

function summarizeBreakdown(bd: Breakdown) {
  const details = Array.isArray(bd.details) ? bd.details : [];
  return { issues: details };
}

const BevPerformanceSlide: React.FC<BevPerformanceSlideProps> = ({ data, footerSrc, weekNumber }) => {
  const isAvailabilityGood = data.availability.every(item => item.value >= item.target);
  const isComplianceGood = data.serviceCompliance.every(item => item.value === 100);
  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 pb-32">
        <h2 className="text-4xl font-bold text-blue-800 mb-4 text-center">{data.name}</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={`rounded-lg p-4 ${isAvailabilityGood ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
            <div className={`flex items-center mb-2 ${isAvailabilityGood ? 'text-green-800' : 'text-orange-800'}`}>
            <Battery className="mr-2" size={24} /><h3 className="text-xl font-bold">BEV Availability (Wk {weekNumber})</h3></div>
            <ul className="list-disc pl-5 text-lg mt-1">
              {data.availability.map((item, i) => (
                <li key={i} className={`${item.value >= item.target ? 'text-green-700' : 'text-yellow-700'} font-semibold`}>{item.label}: {item.value}% ({item.value >= item.target ? 'Above' : 'Below'} Target)</li>
              ))}
            </ul>
          </div>
          <div className={`rounded-lg p-4 ${isComplianceGood ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className={`flex items-center mb-2 ${isComplianceGood ? 'text-green-800' : 'text-yellow-800'}`}>
            <Zap className="mr-2" size={24} /><h3 className="text-xl font-bold">BEV Service Compliance</h3></div>
            <ul className="list-disc pl-5 text-lg mt-1">
              {data.serviceCompliance.map((item, i) => (
                <li key={i} className={`${item.value === 100 || item.value === null ? 'text-green-700' : 'text-yellow-700'} font-semibold`}>
                  {item.label}: {item.value === null ? 'None scheduled' : `${item.value}%`}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-grow overflow-hidden pr-2 text-sm mt-3">
          <h3 className="text-xl font-bold mb-1 text-center">BEV Availability by Equipment Type</h3>
          <div className="space-y-2">
            {data.availability.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1 px-1"><span className="font-semibold text-lg">{item.label}</span><span className="text-base text-gray-500">Target: {item.target}%</span></div>
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div className={`${item.value >= item.target ? 'bg-green-500' : 'bg-yellow-500'} h-8 rounded-full flex items-center justify-center`} style={{ width: `${item.value}%` }}>
                    <span className={`font-bold ${item.value >= item.target ? 'text-white' : 'text-black'} text-lg`}>{item.value}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow overflow-hidden pr-2 text-xs mt-3">
          <h3 className="text-xl font-bold mb-1 text-center">Key BEV & Battery Themes</h3>
          <div className="grid grid-cols-2 gap-x-6">
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Key Breakdowns:</h4>
              <ul className="space-y-2">
                {data.breakdowns.map((bd, i) => {
                  const s = summarizeBreakdown(bd);
                  return (
                    <li key={i}>
                      <div className="font-semibold">{bd.equipment}</div>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {s.issues.map((issue, j) => <li key={j}>{issue}</li>)}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Key Battery Themes:</h4>
              <ul className="list-disc pl-4 space-y-1">
                {data.batteryThemes.map((theme, i) => <li key={i}>{theme}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default BevPerformanceSlide;