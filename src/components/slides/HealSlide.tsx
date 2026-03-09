import React from 'react';
import { TrendingUp, TrendingDown, Clock, Wrench, CheckCircle, AlertTriangle, Bolt } from 'lucide-react';
import { ReportData } from '../../data/reportData';
import Footer from '../shared/Footer';

interface HealSlideProps {
  data: ReportData['heal'];
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

const HealSlide: React.FC<HealSlideProps> = ({ data, footerSrc }) => {
  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 pb-20 flex flex-col">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-2">DEPARTMENTAL OVERVIEW (HEAL)</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3" style={{ display: 'grid', gridTemplateRows: '55% 45%', height: '100%' }}>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex flex-col">
            <div className="flex items-center mb-2"><TrendingUp className="text-green-600 mr-2" size={24} /><h3 className="text-xl font-bold text-green-800">Highlights</h3></div>
            <ul className="space-y-2 text-sm overflow-y-auto">
              {data.highlights.map((item, i) => (
                <li key={i} className="flex items-start"><CheckCircle className="text-green-600 mr-2 mt-0.5 flex-shrink-0" size={16} /><span><span className="font-semibold">[{item.site}]</span> {item.text}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex flex-col">
            <div className="flex items-center mb-2"><TrendingDown className="text-red-600 mr-2" size={24} /><h3 className="text-xl font-bold text-red-800">Lowlights</h3></div>
            <ul className="space-y-2 text-sm overflow-y-auto">
              {data.lowlights.map((item, i) => (
                <li key={i} className="flex items-start"><AlertTriangle className="text-red-600 mr-2 mt-0.5 flex-shrink-0" size={16} /><span><span className="font-semibold">[{item.site}]</span> {item.text}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex flex-col">
            <div className="flex items-center mb-2"><Clock className="text-yellow-600 mr-2" size={24} /><h3 className="text-xl font-bold text-yellow-800">Emerging Issues</h3></div>
            <ul className="space-y-2 text-sm overflow-y-auto">
              {data.emergingIssues.map((item, i) => (
                <li key={i} className="flex items-start"><AlertTriangle className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" size={16} /><span><span className="font-semibold">[{item.site}]</span> {item.text}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex flex-col">
            <div className="flex items-center mb-2"><Wrench className="text-blue-600 mr-2" size={24} /><h3 className="text-xl font-bold text-blue-800">Priorities</h3></div>
            <ul className="space-y-2 text-sm overflow-y-auto">
              {data.priorities.map((item, i) => (
                <li key={i} className="flex items-start"><Bolt className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} /><span><span className="font-semibold">[{item.site}]</span> {item.text}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default HealSlide;