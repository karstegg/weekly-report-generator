import React from 'react';
import { CheckCircle, AlertTriangle, Clock, Wrench } from 'lucide-react';
import { ReportData } from '../../data/reportData';
import Footer from '../shared/Footer';

interface ShaftsWindersSlideProps {
  data: ReportData['shaftsAndWinders'];
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

const ShaftsWindersSlide: React.FC<ShaftsWindersSlideProps> = ({ data, footerSrc }) => {
    const tonsPerHourPercentage = Math.min((data.tonsPerHour.value / data.tonsPerHour.target) * 100, 100);
    const rwAvailabilityPercentage = Math.min(data.rwAvailability.value, 100);

  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 pb-32 flex flex-col">
        <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">Shafts & Winders Performance</h2>
        <div className="mb-6 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1"><span className="font-semibold text-lg">Weekly Tons/Hr</span><span className="text-base text-gray-500">Target: {data.tonsPerHour.target}</span></div>
            <div className="w-full bg-gray-200 rounded-full h-8">
              <div className="bg-red-500 h-8 rounded-full flex items-center justify-center" style={{ width: `${tonsPerHourPercentage}%`}}>
                <span className="font-bold text-white text-lg">{Math.round(data.tonsPerHour.value)}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1"><span className="font-semibold text-lg">Weekly RW Availability (%)</span><span className="text-base text-gray-500">Target: {data.rwAvailability.target}%</span></div>
            <div className="w-full bg-gray-200 rounded-full h-8">
              <div className="bg-yellow-500 h-8 rounded-full flex items-center justify-center" style={{ width: `${rwAvailabilityPercentage}%`}}>
                <span className="font-bold text-black text-lg">{rwAvailabilityPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-4 h-[380px]">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5 flex flex-col"><div className="flex items-center mb-2"><CheckCircle className="text-green-600 mr-2" size={22} /><h3 className="text-xl font-bold text-green-800">Highlights</h3></div><ul className="text-sm list-disc pl-5 space-y-1 ">{data.highlights.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-5 flex flex-col"><div className="flex items-center mb-2"><AlertTriangle className="text-red-600 mr-2" size={22} /><h3 className="text-xl font-bold text-red-800">Lowlights</h3></div><ul className="text-sm list-disc pl-5 ">{data.lowlights.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 flex flex-col"><div className="flex items-center mb-2"><Clock className="text-yellow-600 mr-2" size={22} /><h3 className="text-xl font-bold text-yellow-800">Emerging Issues</h3></div><ul className="text-sm list-disc pl-5 ">{data.emergingIssues.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 flex flex-col"><div className="flex items-center mb-2"><Wrench className="text-blue-600 mr-2" size={22} /><h3 className="text-xl font-bold text-blue-800">Priorities</h3></div><ul className="text-sm list-disc pl-5 space-y-1 ">{data.priorities.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
        </div>
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default ShaftsWindersSlide;