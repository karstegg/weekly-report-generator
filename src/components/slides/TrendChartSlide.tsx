import React from 'react';
import Footer from '../shared/Footer';

interface TrendChartSlideProps {
  title: string;
  src: string;
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

const TrendChartSlide: React.FC<TrendChartSlideProps> = ({ title, src, footerSrc }) => {
  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 pb-32 flex flex-col">
        <h2 className="text-4xl font-bold text-blue-800 mb-4 text-center">{title}</h2>
        <div className="flex-grow flex flex-col justify-center">
          <img src={src} alt={title} className="w-full h-auto object-contain max-h-[550px]" />
        </div>
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default TrendChartSlide;