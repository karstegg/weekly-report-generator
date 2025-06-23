import React from 'react';
import { AlertTriangle, BarChart2, Bolt, CheckCircle } from 'lucide-react';
import { SitePerformance } from '../../data/reportData';
import AvailabilityBar from '../shared/AvailabilityBar';
import Footer from '../shared/Footer';

interface SitePerformanceSlideProps {
  data: SitePerformance;
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

const SitePerformanceSlide: React.FC<SitePerformanceSlideProps> = ({ data, footerSrc }) => {
  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 pb-32">
        <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">{data.name} Performance Overview</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`border rounded-lg p-4 ${data.safety.status === 'Good' ? 'bg-green-50 border-green-200' : 'bg-orange-100 border-orange-200'}`}>
            <div className={`flex items-center mb-1 ${data.safety.status === 'Good' ? 'text-green-800' : 'text-orange-800'}`}>
              {data.safety.status === 'Good' ? <CheckCircle className="mr-2 flex-shrink-0" size={24} /> : <AlertTriangle className="mr-2 flex-shrink-0" size={24} />}
              <h3 className="text-xl font-semibold">Safety</h3>
            </div>
            <p className={`text-lg pl-8 ${data.safety.status === 'Good' ? 'text-green-700' : 'text-orange-700'}`}>{data.safety.details}</p>
          </div>
          <div className={`bg-${data.weeklyAverage.value >= data.weeklyAverage.target ? 'green' : data.weeklyAverage.value >= data.weeklyAverage.target - 2 ? 'yellow' : 'red'}-50 border-${data.weeklyAverage.value >= data.weeklyAverage.target ? 'green' : data.weeklyAverage.value >= data.weeklyAverage.target - 2 ? 'yellow' : 'red'}-200 rounded-lg p-4 text-center`}>
            <div className={`flex items-center justify-center mb-1 text-${data.weeklyAverage.value >= data.weeklyAverage.target ? 'green' : data.weeklyAverage.value >= data.weeklyAverage.target - 2 ? 'yellow' : 'red'}-700`}>
              <BarChart2 className="mr-2 flex-shrink-0" size={24} />
              <h3 className="text-xl font-semibold">Weekly Avg.</h3>
            </div>
            <p className={`font-bold text-4xl text-${data.weeklyAverage.value >= data.weeklyAverage.target ? 'green' : data.weeklyAverage.value >= data.weeklyAverage.target - 2 ? 'yellow' : 'red'}-700`}>{data.weeklyAverage.value}%</p>
            <p className={`text-lg text-${data.weeklyAverage.value >= data.weeklyAverage.target ? 'green' : data.weeklyAverage.value >= data.weeklyAverage.target - 2 ? 'yellow' : 'red'}-500`}>(Target: {data.weeklyAverage.target}%)</p>
          </div>
          <div className={`bg-${data.serviceCompliance.status === 'Good' ? 'green' : 'yellow'}-50 border-${data.serviceCompliance.status === 'Good' ? 'green' : 'yellow'}-200 rounded-lg p-4`}>
            <div className={`flex items-center mb-1 text-${data.serviceCompliance.status === 'Good' ? 'green' : 'yellow'}-700`}>
              <Bolt className="mr-2 flex-shrink-0" size={24} />
              <h3 className="text-xl font-semibold">Compliance</h3>
            </div>
            <p className={`text-lg text-${data.serviceCompliance.status === 'Good' ? 'green' : 'yellow'}-600 pl-8`}>{data.serviceCompliance.details}</p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4 text-center">Equipment Availability</h3>
          <div className="grid grid-cols-5 gap-4">
            {data.availability.map((item, i) => <AvailabilityBar key={i} {...item} />)}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2 text-center">Key Breakdowns</h3>
          <div className="grid grid-cols-2 gap-x-4 text-sm">
            {Array.isArray(data.breakdowns) && data.breakdowns.map((item: any, i: number) => (
              <div key={i} className="mb-1">
                <h4 className="font-semibold text-red-700">{item.category}</h4>
                {Array.isArray(item.details) ? (
                  <ul className="list-disc pl-5">
                    {item.details.map((detail: string, j: number) => <li key={j}>{detail}</li>)}
                  </ul>
                ) : (
                  <p>{item.details}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default SitePerformanceSlide;