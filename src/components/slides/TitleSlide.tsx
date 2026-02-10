import React from 'react';
import { ReportData } from '../../data/reportData';
import Footer from '../shared/Footer';
import { getImagePath } from '../../utils/imagePath';

interface TitleSlideProps {
  data: ReportData['cover'];
  weekNumber: number;
  dateRange: string;
  footerSrc: string;
}

const titleSlideStyle: React.CSSProperties = {
  width: '960px',
  height: '720px',
  margin: '0 auto 32px auto',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  padding: 0,
};

const TitleSlide: React.FC<TitleSlideProps> = ({ data, weekNumber, dateRange, footerSrc }) => {
  return (
    <div style={titleSlideStyle} className="shadow-md rounded-lg">
      <div className="absolute top-0 left-0 right-0 bottom-32 p-12">
        <header className="flex justify-between items-start">
          <div className="text-gray-700">
            <h1 className="text-5xl font-bold tracking-tight">Weekly Engineering Report</h1>
          </div>
          <div className="text-right text-blue-600">
            <p className="text-2xl font-semibold">Week {weekNumber}</p>
            <p className="text-2xl font-medium">{dateRange}</p>
          </div>
        </header>
        <div className="relative w-full h-full">
          {data.images.map((img, index) => (
            <img
              key={index}
              src={getImagePath(img.src)}
              alt={img.alt}
              className={img.className}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          ))}
        </div>
      </div>
      <Footer src={footerSrc} />
    </div>
  );
};

export default TitleSlide;