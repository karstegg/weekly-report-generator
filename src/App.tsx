import React, { useState } from 'react';
import { reportData } from './data/reportData';
import TitleSlide from './components/slides/TitleSlide';
import IndexSlide from './components/slides/IndexSlide';
import HealSlide from './components/slides/HealSlide';
import ShaftsWindersSlide from './components/slides/ShaftsWindersSlide';
import SitePerformanceSlide from './components/slides/SitePerformanceSlide';
import TrendChartSlide from './components/slides/TrendChartSlide';
import BevPerformanceSlide from './components/slides/BevPerformanceSlide';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <TitleSlide 
      data={reportData.cover} 
      weekNumber={reportData.weekNumber} 
      dateRange={reportData.dateRange} 
      footerSrc={reportData.footerSrc}
    />,
    <IndexSlide sites={reportData.sites} footerSrc={reportData.footerSrc} />,
    <HealSlide data={reportData.heal} footerSrc={reportData.footerSrc} />,
    <ShaftsWindersSlide data={reportData.shaftsAndWinders} footerSrc={reportData.footerSrc} />,
    <TrendChartSlide 
      title={`${reportData.sites.nchwaning3.name} Weekly Availability Trend`}
      src={reportData.sites.nchwaning3.trendChart.src}
      footerSrc={reportData.footerSrc}
    />,
    <SitePerformanceSlide data={reportData.sites.nchwaning3} footerSrc={reportData.footerSrc} />,
    <TrendChartSlide 
      title={`${reportData.sites.nchwaning2.name} Weekly Availability Trend`}
      src={reportData.sites.nchwaning2.trendChart.src}
      footerSrc={reportData.footerSrc}
    />,
    <SitePerformanceSlide data={reportData.sites.nchwaning2} footerSrc={reportData.footerSrc} />,
    <TrendChartSlide 
      title={`${reportData.sites.gloria.name} Weekly Availability Trend`}
      src={reportData.sites.gloria.trendChart.src}
      footerSrc={reportData.footerSrc}
    />,
    <SitePerformanceSlide data={reportData.sites.gloria} footerSrc={reportData.footerSrc} />,
    <BevPerformanceSlide data={reportData.bev} footerSrc={reportData.footerSrc} />,
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="font-sans bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto mb-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={goToPrevSlide} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Previous
          </button>
          <div className="text-center text-gray-600">
            Slide {currentSlide + 1} of {slides.length}
          </div>
          <button 
            onClick={goToNextSlide} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Next
          </button>
        </div>
      </div>
      <div className="w-full">
        {slides[currentSlide]}
      </div>
    </div>
  );
};

export default App;