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
  const siteOrder = ['n3', 'n2', 'gloria'] as const;
  const siteItems = siteOrder.flatMap(siteKey => {
    const site = sites[siteKey];
    return [
      `${site.name} Weekly Availability Trend`,
      `${site.name} Performance Overview`
    ];
  });

  const indexItems = [
    'Departmental Overview (HEAL)',
    'Shafts & Winders Performance',
    ...siteItems,
    'BEV Performance Overview',
    'Utility Section Performance',
  ];

  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow flex flex-col p-6 pb-24">
        <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">INDEX</h2>
        <div className="space-y-3 max-w-3xl mx-auto">
          {indexItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 text-lg">
                {index + 1}
              </div>
              <span className="text-lg font-medium">{item}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default IndexSlide;
