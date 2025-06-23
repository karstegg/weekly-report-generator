import React from 'react';
import Footer from '../shared/Footer';
import { ReportData } from '../../data/reportData';

const slideStyle: React.CSSProperties = {
  width: '960px',
  height: '720px',
  margin: '0 auto 32px auto',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
};

interface IndexSlideProps {
  sites: ReportData['sites'];
  footerSrc: string;
}

const IndexSlide: React.FC<IndexSlideProps> = ({ sites, footerSrc }) => {
  const indexItems = [
    'Departmental Overview (HEAL)',
    'Shafts & Winders Performance',
    ...Object.values(sites).map(site => `${site.name} Performance Overview`),
    'BEV Performance Overview',
  ];

  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow flex flex-col justify-center items-center p-8 pb-32">
        <h2 className="text-4xl font-bold text-blue-800 mb-12 text-center">INDEX</h2>
        <div className="space-y-8 max-w-2xl mx-auto">
          {indexItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mr-6 text-2xl">
                {index + 1}
              </div>
              <span className="text-2xl font-medium">{item}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default IndexSlide;
