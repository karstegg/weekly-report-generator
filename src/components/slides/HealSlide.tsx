import React from 'react';
import { TrendingUp, TrendingDown, Clock, Wrench, CheckCircle, AlertTriangle, Bolt, Bot } from 'lucide-react';
import { ReportData } from '../../data/reportData';
import Footer from '../shared/Footer';

interface HealSlideProps {
  data: ReportData['heal'];
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

// Helper to summarize and bound list items so quadrants never scroll
const MAX_CHARS_PER_ITEM = 180;
const LIMITS = {
  highlights: 8,
  lowlights: 6,
  emerging: 6,
  priorities: 6,
};

type Item = { site: string; text: string };

function prepareItems(items: Item[], maxItems: number) {
  const filtered = (items || []).filter(
    (i) =>
      i &&
      typeof i.text === 'string' &&
      i.text.trim() &&
      i.text.trim() !== '–' &&
      // Data segregation: exclude Shafts & Winders from HEAL
      (typeof i.site !== 'string' || i.site.trim().toLowerCase() !== 'shafts & winders')
  );
  const truncated = filtered.map((i) => ({
    ...i,
    text:
      i.text.length > MAX_CHARS_PER_ITEM
        ? i.text.slice(0, MAX_CHARS_PER_ITEM).replace(/[\s,.;&-]+$/, '').trimEnd() + '…'
        : i.text,
  }));
  const display = truncated.slice(0, maxItems);
  const more = Math.max(truncated.length - display.length, 0);
  return { display, more };
}

const HealSlide: React.FC<HealSlideProps> = ({ data, footerSrc }) => {
  const { display: highlights, more: highlightsMore } = prepareItems(
    data.highlights as Item[],
    LIMITS.highlights
  );
  const { display: lowlights, more: lowlightsMore } = prepareItems(
    data.lowlights as Item[],
    LIMITS.lowlights
  );
  const { display: emergingIssues, more: emergingMore } = prepareItems(
    data.emergingIssues as Item[],
    LIMITS.emerging
  );
  const { display: priorities, more: prioritiesMore } = prepareItems(
    data.priorities as Item[],
    LIMITS.priorities
  );

  return (
    <div className="bg-white shadow-md rounded-lg" style={slideStyle}>
      <main className="flex-grow p-6 flex flex-col">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-3xl font-bold text-center text-blue-800">DEPARTMENTAL OVERVIEW (HEAL)</h2>

        </div>
        <div className="grid grid-cols-2 gap-4" style={{ height: '580px', gridTemplateRows: '1fr 1fr' }}>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex flex-col overflow-hidden">
            <div className="flex items-center mb-1.5 flex-shrink-0"><TrendingUp className="text-green-600 mr-2" size={18} /><h3 className="text-base font-bold text-green-800">Highlights</h3></div>
            <ul className="space-y-1.5 flex-grow overflow-hidden pr-1" style={{ fontSize: '13px' }}>
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start"><CheckCircle className="text-green-600 mr-2 mt-0.5 flex-shrink-0" size={14} /><span><span className="font-semibold">[{item.site}]</span> {item.text}</span></li>
              ))}
            </ul>
            {highlightsMore > 0 && (
              <div className="mt-1 text-xs text-gray-500">+{highlightsMore} more</div>
            )}
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex flex-col overflow-hidden">
            <div className="flex items-center mb-1.5 flex-shrink-0"><TrendingDown className="text-red-600 mr-2" size={18} /><h3 className="text-base font-bold text-red-800">Lowlights</h3></div>
            <ul className="space-y-1.5 flex-grow overflow-hidden pr-1" style={{ fontSize: '13px' }}>
              {lowlights.map((item, i) => (
                <li key={i} className="flex items-start"><AlertTriangle className="text-red-600 mr-2 mt-0.5 flex-shrink-0" size={14} /><span><span className="font-semibold">[{item.site}]</span> {item.text}</span></li>
              ))}
            </ul>
            {lowlightsMore > 0 && (
              <div className="mt-1 text-xs text-gray-500">+{lowlightsMore} more</div>
            )}
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex flex-col overflow-hidden">
            <div className="flex items-center mb-1.5 flex-shrink-0"><Clock className="text-yellow-600 mr-2" size={18} /><h3 className="text-base font-bold text-yellow-800">Emerging Issues</h3></div>
            <ul className="space-y-1.5 flex-grow overflow-hidden pr-1" style={{ fontSize: '13px' }}>
              {emergingIssues.map((item, i) => (
                <li key={i} className="flex items-start"><Clock className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" size={14} /><span><span className="font-semibold">[{item.site}]</span> {item.text}</span></li>
              ))}
            </ul>
            {emergingMore > 0 && (
              <div className="mt-1 text-xs text-gray-500">+{emergingMore} more</div>
            )}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex flex-col overflow-hidden">
            <div className="flex items-center mb-1.5 flex-shrink-0"><Wrench className="text-blue-600 mr-2" size={18} /><h3 className="text-base font-bold text-blue-800">Priorities</h3></div>
            <ul className="space-y-1.5 flex-grow overflow-hidden pr-1" style={{ fontSize: '13px' }}>
              {priorities.map((item, i) => (
                <li key={i} className="flex items-start"><Bolt className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={14} /><span className="break-words"><span className="font-semibold">[{item.site}]</span> {item.text}</span></li>
              ))}
            </ul>
            {prioritiesMore > 0 && (
              <div className="mt-1 text-xs text-gray-500">+{prioritiesMore} more</div>
            )}
          </div>
        </div>
      </main>
      <Footer src={footerSrc} />
    </div>
  );
};

export default HealSlide;