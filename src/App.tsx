import React, { useState } from 'react';
import { reportData } from './data/reportData';
import TitleSlide from './components/slides/TitleSlide';
import IndexSlide from './components/slides/IndexSlide';
import HealSlide from './components/slides/HealSlide';
import ShaftsWindersSlide from './components/slides/ShaftsWindersSlide';
import SitePerformanceSlide from './components/slides/SitePerformanceSlide';
import TrendChartSlide from './components/slides/TrendChartSlide';
import BevPerformanceSlide from './components/slides/BevPerformanceSlide';
import DtBevDetailSlide from './components/slides/DtBevDetailSlide';
import FlBevDetailSlide from './components/slides/FlBevDetailSlide';
import UtilitySectionSlide from './components/slides/UtilitySectionSlide';
import UtilitySectionDetailSlide from './components/slides/UtilitySectionDetailSlide';
import UtilitySectionCurrentStatusSlide from './components/slides/UtilitySectionCurrentStatusSlide';
import PrintLayout from './components/shared/PrintLayout';
import './print-styles.css';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);

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
      title={`${reportData.sites.n3.name} Weekly Availability Trend`}
      src={reportData.sites.n3.trendChart.src}
      footerSrc={reportData.footerSrc}
    />,
    <SitePerformanceSlide data={reportData.sites.n3} footerSrc={reportData.footerSrc} />,
    <TrendChartSlide 
      title={`${reportData.sites.n2.name} Weekly Availability Trend`}
      src={reportData.sites.n2.trendChart.src}
      footerSrc={reportData.footerSrc}
    />,
    <SitePerformanceSlide data={reportData.sites.n2} footerSrc={reportData.footerSrc} />,
    <TrendChartSlide 
      title={`${reportData.sites.gloria.name} Weekly Availability Trend`}
      src={reportData.sites.gloria.trendChart.src}
      footerSrc={reportData.footerSrc}
    />,
    <SitePerformanceSlide data={reportData.sites.gloria} footerSrc={reportData.footerSrc} />,
    <BevPerformanceSlide data={reportData.bev} footerSrc={reportData.footerSrc} weekNumber={reportData.weekNumber} />,
    <DtBevDetailSlide data={reportData.bevDetail!.dt} footerSrc={reportData.footerSrc} weekNumber={reportData.weekNumber} />,
    <FlBevDetailSlide data={reportData.bevDetail!.fl} footerSrc={reportData.footerSrc} weekNumber={reportData.weekNumber} />,
    <UtilitySectionSlide data={reportData.utilitySection!} footerSrc={reportData.footerSrc} weekNumber={reportData.weekNumber} />,
    <UtilitySectionDetailSlide data={reportData.utilitySection!} footerSrc={reportData.footerSrc} weekNumber={reportData.weekNumber} />,
    <UtilitySectionCurrentStatusSlide data={reportData.utilitySectionCurrentStatus!} footerSrc={reportData.footerSrc} />,
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100); // Allow time for render
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-screen-xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
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
          <button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors ml-4"
          >
            Print to PDF
          </button>
        </div>
        <div className="w-full">
          {isPrinting ? <PrintLayout /> : slides[currentSlide]}
        </div>
      </div>
    </div>
  );
};

export default App;