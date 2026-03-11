import React from 'react';
import { CheckCircle, AlertTriangle, Clock, Wrench } from 'lucide-react';
import { ReportData } from '../../data/reportData';
import Footer from '../shared/Footer';

interface ShaftsWindersSlideProps {
  data: ReportData['shaftsAndWinders'];
  footerSrc: string;
}

interface ProgressBarProps {
  label: string;
  value: number;
  target: number;
  unit: string;
  barHeight?: string;
  fontSize?: string;
}

const slideStyle: React.CSSProperties = {
  width: '960px',
  height: '720px',
  margin: '0 auto 32px auto',
  overflow: 'hidden',
  position: 'relative',
};

const getBarColor = (value: number, target: number) => {
  const percentage = (value / target) * 100;
  if (percentage >= 95) return 'bg-green-500';
  if (percentage >= 80) return 'bg-yellow-500';
  return 'bg-red-500';
};

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, target, unit, barHeight = 'h-8', fontSize = 'text-xl' }) => {
  const percentage = Math.min((value / target) * 100, 100);
  const color = getBarColor(value, target);

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-lg">{label}</span>
        <span className="text-base text-gray-500">Target: {target}{unit}</span>
      </div>
      <div className={`relative w-full bg-gray-200 rounded-full ${barHeight} dark:bg-gray-700`}>
        <div
          className={`${color} absolute top-0 left-0 ${barHeight} rounded-full flex items-center justify-center`}
          style={{ width: `${percentage}%` }}
        >
          <span className={`font-bold text-white ${fontSize}`}>{value}{unit}</span>
        </div>
      </div>
    </div>
  );
};

const ShaftsWindersSlide: React.FC<ShaftsWindersSlideProps> = ({ data, footerSrc }) => {
  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 flex flex-col">
        <h2 className="text-4xl font-bold text-blue-800 mb-4 text-center">Shafts & Winders Performance</h2>
        
        <div className="w-full px-12">
          <ProgressBar label="Weekly Tons/Hr" value={data.production.tonsPerHour.value} target={data.production.tonsPerHour.target} unit="" barHeight="h-6" fontSize="text-lg" />
          <ProgressBar label="Weekly RW Availability (%)" value={data.production.rockWinderAvailability.value} target={data.production.rockWinderAvailability.target} unit="%" barHeight="h-6" fontSize="text-lg" />
        </div>

        {/* HEAL Matrix */}
        <div className="w-full px-12 mt-2" style={{ height: '390px' }}>
          <div className="grid grid-cols-2 gap-4" style={{ gridTemplateRows: '160px 210px' }}>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex flex-col overflow-hidden">
              <div className="flex items-center mb-1 flex-shrink-0">
                <CheckCircle className="text-green-600 mr-2" size={18} />
                <h3 className="text-base font-bold text-green-800">Highlights</h3>
              </div>
              <ul className="text-sm list-disc pl-5 space-y-0.5 flex-grow overflow-y-auto pr-2">
                {data.heal.highlights.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex flex-col overflow-hidden">
              <div className="flex items-center mb-1 flex-shrink-0">
                <AlertTriangle className="text-red-600 mr-2" size={18} />
                <h3 className="text-base font-bold text-red-800">Lowlights</h3>
              </div>
              <ul className="text-sm list-disc pl-5 space-y-0.5 flex-grow overflow-y-auto pr-2">
                {data.heal.lowlights.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex flex-col overflow-hidden">
              <div className="flex items-center mb-1 flex-shrink-0">
                <Clock className="text-yellow-600 mr-2" size={18} />
                <h3 className="text-base font-bold text-yellow-800">Emerging Issues</h3>
              </div>
              <ul className="text-sm list-disc pl-5 space-y-0.5 flex-grow overflow-y-auto pr-2">
                {data.heal.emergingIssues.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex flex-col overflow-hidden">
              <div className="flex items-center mb-1 flex-shrink-0">
                <Wrench className="text-blue-600 mr-2" size={18} />
                <h3 className="text-base font-bold text-blue-800">Priorities</h3>
              </div>
              <ul className="text-sm list-disc pl-5 space-y-0.5 flex-grow overflow-y-auto pr-2">
                {data.heal.priorities.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default ShaftsWindersSlide;