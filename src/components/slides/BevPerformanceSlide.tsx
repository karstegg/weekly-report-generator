import React from 'react';
import { Battery, Zap } from 'lucide-react';
import { ReportData } from '../../data/reportData';
import Footer from '../shared/Footer';

interface BevPerformanceSlideProps {
  data: ReportData['bev'];
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

const BevPerformanceSlide: React.FC<BevPerformanceSlideProps> = ({ data, footerSrc }) => {
  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 pb-32">
        <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">BEV Performance Overview (Nchwaning 3)</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2"><Battery className="text-green-600 mr-2" size={24} /><h3 className="text-xl font-bold text-green-800">BEV Availability (Wk 36)</h3></div>
            <ul className="list-disc pl-5 text-lg mt-1">
              {data.availability.map((item, i) => (
                <li key={i} className={`${item.value >= item.target ? 'text-green-700' : 'text-yellow-700'} font-semibold`}>{item.label}: {item.value}% ({item.value >= item.target ? 'Above' : 'Below'} Target)</li>
              ))}
            </ul>
          </div>
          <div className="bg-yellow-50 border-yellow-200 rounded-lg p-4">
            <div className="flex items-center mb-2"><Zap className="text-yellow-600 mr-2" size={24} /><h3 className="text-xl font-bold text-yellow-800">BEV Service Compliance</h3></div>
            <ul className="list-disc pl-5 text-lg mt-1">
              {data.serviceCompliance.map((item, i) => (
                <li key={i} className={`${item.value === 100 ? 'text-green-700' : 'text-yellow-700'} font-semibold`}>{item.label}: {item.value}%</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-3 text-center">BEV Availability by Equipment Type</h3>
          <div className="space-y-4">
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
        <div className="flex-grow overflow-y-auto pr-2 text-sm">
          <h3 className="text-xl font-bold mb-2 text-center">Key BEV & Battery Themes</h3>
          <div className="grid grid-cols-2 gap-x-6">
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Performance Summary:</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>DT BEV at 83% - below target by 2%. DT0147 inverter error (24hrs), DT0149 no contact to modules (24hrs), DT0150 battery insulation fault (21hrs), DT0172 HVIL fault (10hrs).</li>
                <li>FL BEV at 87% - above target by 2%. FL0098 red stop lamp + battery not connecting (29hrs), FL0112 red stop lamp + oil leak (13hrs), FL0113 battery not connecting (11hrs).</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Battery & Charger Status:</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>B4 Batteries: 10 Working, 1 Breakdown (VPY-00034 TMS replaced, cooling pump issues) | B5 Batteries: 11 Working, 1 Breakdown (VPX-00010 TMS fault), 1 on DT-171 (out of production)</li>
                <li>All chargers operational. Charger 2 Module 2 faulty - other modules working. Charger 7 Module 4 switched on.</li>
                <li>TMS hyper care underway. Battery overheating: VPY-00011 condenser cleaned, VPY-00051 cooling pump failed, VPY-00088 pump fuse trip.</li>
                <li>Post 3, 6 and 7 cables replaced. Charger DCDC campaign 95% complete.</li>
                <li>Auxiliary motor spline grease TSNB: Only DT147 completed. Need to schedule remaining machines. Grease on site.</li>
                <li>Critical: Job cards not being filled properly on Click View - limiting root cause analysis capability for recurring faults.</li>
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