import React, { useState } from 'react';
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
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 pb-32 flex flex-col">
        <h2 className="text-4xl font-bold text-blue-800 mb-4 text-center">{title}</h2>
        <div className="flex-grow flex flex-col justify-center items-center">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded">
              <div className="text-center">
                <p className="text-gray-600 font-semibold mb-2">Trend Chart Placeholder</p>
                <p className="text-gray-500 text-sm">{src.split('/').pop()}</p>
                <p className="text-gray-400 text-xs mt-2">(Pending system recovery)</p>
              </div>
            </div>
          ) : (
            <img 
              src={src} 
              alt={title} 
              className="w-full h-auto object-contain max-h-[550px]"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default TrendChartSlide;