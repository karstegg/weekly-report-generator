import React from 'react';
import { reportData } from '../../data/reportData';
import TitleSlide from '../slides/TitleSlide';
import IndexSlide from '../slides/IndexSlide';
import HealSlide from '../slides/HealSlide';
import SitePerformanceSlide from '../slides/SitePerformanceSlide';
import TrendChartSlide from '../slides/TrendChartSlide';
import BevPerformanceSlide from '../slides/BevPerformanceSlide';
import BEVDTBreakdownSlide from '../slides/BEVDTBreakdownSlide';
import BEVFLBreakdownSlide from '../slides/BEVFLBreakdownSlide';
import UtilitySectionSlide from '../slides/UtilitySectionSlide';
import UtilitySectionDetailSlide from '../slides/UtilitySectionDetailSlide';
import UtilitySectionCurrentStatusSlide from '../slides/UtilitySectionCurrentStatusSlide';

const PrintLayout: React.FC = () => {
  const slides = [
    <TitleSlide 
      data={reportData.cover} 
      weekNumber={reportData.weekNumber} 
      dateRange={reportData.dateRange} 
      footerSrc={reportData.footerSrc}
    />,
    <IndexSlide sites={reportData.sites} footerSrc={reportData.footerSrc} />,
    <HealSlide data={reportData.heal} footerSrc={reportData.footerSrc} />,
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
    <BEVDTBreakdownSlide footerSrc={reportData.footerSrc} weekNumber={reportData.weekNumber} />,
    <BEVFLBreakdownSlide footerSrc={reportData.footerSrc} weekNumber={reportData.weekNumber} />,
    ...(reportData.utilitySection ? [
      <UtilitySectionSlide data={reportData.utilitySection} footerSrc={reportData.footerSrc} weekNumber={reportData.weekNumber} />,
      <UtilitySectionDetailSlide data={reportData.utilitySection} footerSrc={reportData.footerSrc} weekNumber={reportData.weekNumber} />,
    ] : []),
    ...(reportData.utilitySectionCurrentStatus ? [
      <UtilitySectionCurrentStatusSlide data={reportData.utilitySectionCurrentStatus} footerSrc={reportData.footerSrc} />,
    ] : []),
  ];

  return (
    <div id="print-container">
      {slides.map((slide, index) => (
        <div key={index} className="page-container">
          {slide}
        </div>
      ))}
    </div>
  );
};

export default PrintLayout;
