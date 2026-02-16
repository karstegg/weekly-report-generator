export interface Availability {
  label: string;
  percentage: number;
  target?: number;
}

export interface ReportData {
  weekNumber: number;
  dateRange: string;
  cover: {
    images: {
      src: string;
      alt: string;
      className: string;
    }[];
  };
  footerSrc: string;
  heal: {
    highlights: { site: string; text: string; }[];
    lowlights: { site: string; text: string; }[];
    emergingIssues: { site: string; text: string; }[];
    priorities: { site: string; text: string; }[];
  };
  shaftsAndWinders: {
    tonsPerHour: { value: number; target: number };
    rwAvailability: { value: number; target: number };
    highlights: string[];
    lowlights: string[];
    emergingIssues: string[];
    priorities: string[];
  };
  sites: {
    [key: string]: SitePerformance;
  };
  bev: {
    availability: { label: string; value: number; target: number }[];
    serviceCompliance: { label: string; value: number }[];
    breakdowns: { equipment: string; details: string[] }[];
    batteryThemes: string[];
  };
  utilitySection?: {
    fleetStatus: { available: number; unavailable: number };
    areaSummary: { area: string; department: string; total: number; unavailable: number }[];
    breakdowns: { area: string; tmmNo: string; model: string; description: string; remarks: string }[];
    oemAssistanceRequired: number;
    dailyTracking: { 
      area: string; 
      mon: { available: number; total: number; color: string };
      tue: { available: number; total: number; color: string };
      wed: { available: number; total: number; color: string };
      thu: { available: number; total: number; color: string };
      fri: { available: number; total: number; color: string };
      weeklyAvg: number;
    }[];
  };
  utilitySectionCurrentStatus?: {
    totalUnavailable: number;
    areaStatus: { area: string; unavailable: number; details: { unit: string; reason: string }[] }[];
  };
}

export interface SitePerformance {
  name: string;
  trendChart: {
    src: string;
    comment?: string;
  };
  safety: {
    status: 'Good' | 'Incident' | 'Concern';
    details: string;
  };
  weeklyAverage: { value: number; target: number };
  serviceCompliance: {
    status: 'Good' | 'Issues';
    details: string;
  };
  availability: Availability[];
  breakdowns: { [key: string]: string[] } | { category: string; details: string }[];
}


export const reportData: ReportData = {
  weekNumber: 33,
  dateRange: '06 - 12 February 2026',
  cover: {
    images: [
      { src: '/images/AD30.png', alt: 'AD30 Dump Truck', className: 'absolute top-[42%] -translate-y-1/2 left-0 w-1/2 transform transition-transform hover:scale-105' },
      { src: '/images/ST14.png', alt: 'ST14', className: 'absolute top-[30%] -translate-y-1/2 right-0 w-[45%] transform transition-transform hover:scale-105' },
      { src: '/images/MT42B.png', alt: 'BEV Dump Truck', className: 'absolute bottom-0 left-16 w-1/3 transform transition-transform hover:scale-105' },
      { src: '/images/S2.png', alt: 'S2 Drill Rig', className: 'absolute bottom-0 right-10 w-[40%] transform transition-transform hover:scale-105' },
    ],
  },
  footerSrc: '/images/Footer.png',
  heal: {
    highlights: [
        { site: 'N2', text: 'OEM coordinated effort to sort issues on UV137. Strata and ECS are working together.' },
        { site: 'N3', text: 'DT0172 UG.' },
        { site: 'N3', text: 'Much improved performance on HD, RTs.' },
        { site: 'GLA', text: 'DT0184 & DT0185 COC completed and ready for production.' },
        { site: 'GLA', text: 'UV0105 Water truck level 9 completed.' },
        { site: 'GLA', text: 'TMM availability improve to 92%.' },
    ],
    lowlights: [
        { site: 'N2', text: 'Still have 2/3 charging UVs operation.' },
        { site: 'N2', text: 'Barloworld site support is still a concern to attend DT121.' },
        { site: 'N3', text: 'Scaler SR30 running out of control incident.' },
        { site: 'N3', text: 'Poor UV availabilities, affecting blasting.' },
        { site: 'N3', text: 'Sat Tip 1 Tip 1 Rock breaker boom failure.' },
        { site: 'GLA', text: 'DT0174 & DT0152 Waiting Balow\'s for level 9.' },
    ],
    emergingIssues: [
        { site: 'N2', text: 'Lack of necessary skills for OEM support team.' },
        { site: 'N2', text: 'Required Engine upgrade for UV108 to be compatible with CAS L9.' },
        { site: 'N3', text: 'Roadway Conditions.' },
        { site: 'GLA', text: 'UV 0068 Emulsion unit axle to be replace nothing available at the store.' },
        { site: 'GLA', text: 'Commission surface compressor – Challenge 4 inch from the compressor to 2-inch line in the shaft and keep tripping the compressor.' },
    ],
    priorities: [
        { site: 'N2', text: 'Drive actions on Engineers action tracker.' },
        { site: 'N2', text: 'Discuss availability contributing factors with the team.' },
        { site: 'N3', text: 'Commission DT0172 over the weekend (Strata).' },
        { site: 'GLA', text: '74N tip liners to be repairs.' },
        { site: 'GLA', text: 'Conveyor Watch to submit splice condition report.' },
        { site: 'GLA', text: 'CV0053 to do hot splice.' },
    ],
  },
  shaftsAndWinders: {
    tonsPerHour: { value: 950, target: 1000 },
    rwAvailability: { value: 95, target: 95 },
    highlights: ['Zero safety incidents across all shafts this week.', 'Nch2 support equipment at 94.7% availability.'],
    lowlights: ['Nch2 ROM variance MTD: -8,046t', 'Nch2 Product variance MTD: -10,423t'],
    emergingIssues: ['Charging UV capacity issues impacting operations.', 'OEM support skill gaps identified.'],
    priorities: ['Address DT121 standing for 3+ weeks.', 'Improve N3 FL Diesel availability (60.4%).'],
  },
  sites: {
    nchwaning3: {
      name: 'Nchwaning 3',
      trendChart: { src: '/images/N3 Weekly availability chart.png', comment: '"Zero safety incidents this week. FL Diesel availability at 60.4% - critical concern. DT121 standing for 3+ weeks."' },
      safety: { status: 'Concern', details: 'Scaler brake failure incident - Dangerous Occurrence (YTD: MTC=15, LTI=3, PD=54)' },
      weeklyAverage: { value: 81.8, target: 85 },
      serviceCompliance: { status: 'Issues', details: 'DT BEV at 66.7% (DT0171 on breakdown), Support Equip at 80%' },
      availability: [
          { label: 'DT', percentage: 78.1, target: 85 },
          { label: 'FL', percentage: 73.1, target: 85 },
          { label: 'HD', percentage: 89.2, target: 85 },
          { label: 'RT', percentage: 88.4, target: 85 },
          { label: 'SR', percentage: 92.4, target: 85 },
      ],
      breakdowns: [
          { category: 'Dump Trucks (78.1%)', details: 'DT145: Gears Faulty, DT148: Aircon/Mainswitch, DT171: A Frame, DT146: Isolator faulty, DT149: Invertor Error, DT162: Battery Overheat' },
          { category: 'Front Loaders (73.1%)', details: 'FL101: Steering Problem, FL103: Not Starting/Aircon/Tagbox, FL90: Comms Error' },
      ],
    },
    nchwaning2: {
        name: 'Nchwaning 2',
        trendChart: { src: '/images/N2 Weekly availability chart.png', comment: '"Zero safety incidents this week. FL service compliance at 66.7% due to availability. Support equipment at 94.7%."' },
        safety: { status: 'Good', details: 'Zero incidents this week (YTD: MTC=1, LTI=0, PD=5)' },
        weeklyAverage: { value: 81.56, target: 85 },
        serviceCompliance: { status: 'Issues', details: 'FL: 66.7% (rescheduled), Support: 120% (over-serviced)' },
        availability: [
            { label: 'DT', percentage: 71.8, target: 85 },
            { label: 'FL', percentage: 76.6, target: 85 },
            { label: 'HD', percentage: 89.6, target: 85 },
            { label: 'RT', percentage: 85.8, target: 85 },
            { label: 'SR', percentage: 85.0, target: 85 },
        ],
        breakdowns: [
            { category: 'Dump Trucks (71.8%)', details: 'FL102 repair leaks and DT120 lubrication' },
            { category: 'Front Loaders (76.6%)', details: 'FL106 overheating - replacing radiator, FL0102 engine cut-off' },
        ],
    },
    gloria: {
        name: 'Gloria',
        trendChart: { src: '/images/Gloria Weekly availability Chart.png', comment: '"Strong HD availability at 97.2%. FL availability at 99.0%. Zero safety incidents this week."' },
        safety: { status: 'Good', details: 'Zero incidents this week (YTD: MTC=2, LTI=1, PD=6)' },
        weeklyAverage: { value: 91.6, target: 85 },
        serviceCompliance: { status: 'Issues', details: 'HD: 50% (RT0046; RT0060), RT: 100%, Support: 100%' },
        availability: [
            { label: 'DT', percentage: 75, target: 85 },
            { label: 'FL', percentage: 99, target: 85 },
            { label: 'HD', percentage: 96, target: 85 },
            { label: 'RT', percentage: 95, target: 85 },
            { label: 'SR', percentage: 93, target: 85 },
        ],
        breakdowns: [
            { category: 'DT (75%)', details: 'DT0174 & DT0152 Waiting Balow\'s for level 9' },
        ],
    },
  },
  bev: {
    availability: [
        { label: 'DT BEV', value: 78, target: 85 },
        { label: 'FL BEV', value: 85, target: 85 },
    ],
    serviceCompliance: [
        { label: 'DT BEV', value: 66.7 },
        { label: 'FL BEV', value: 100 },
    ],
    breakdowns: [
        { equipment: 'DT BEV', details: ['DT0171: A-Frame Failure @ WS (167.22 hrs)', 'DT0149: Electrical Issues (58.77 hrs)', 'DT0162: Battery Overheating (7.58 hrs)', 'DT0146: Invertor & Fan issues (8.37 hrs)'] },
        { equipment: 'FL BEV', details: ['FL0099: Boilermaker & Multiple (49.91 hrs)', 'FL0108: Boilermaker Half Arrows (41.50 hrs)', 'FL0112: Strata System failures (26.82 hrs)', 'FL0113: Windscreen damage (15.42 hrs)'] },
    ],
    batteryThemes: ['DT BEV at 78% - below target by 7%. Critical: DT0171 A-Frame failure (167 hrs).', 'FL BEV at 85% - meets target. Boilermaker work and Strata issues main constraints.', 'Battery VPY00076 isolation fault affecting FL0099. Charger status: 7/8 operational.'],
  },
  utilitySection: {
    fleetStatus: { available: 61, unavailable: 4 },
    areaSummary: [
      { area: 'Main West', department: 'Operations', total: 2, unavailable: 0 },
      { area: 'Boilermaker', department: 'Maintenance', total: 3, unavailable: 1 },
      { area: 'Logistics', department: 'Operations', total: 7, unavailable: 1 },
      { area: 'Hyd Fitter', department: 'Maintenance', total: 6, unavailable: 0 },
      { area: 'Plant Fitter', department: 'Maintenance', total: 7, unavailable: 1 },
      { area: 'Utility TMM', department: 'Operations', total: 2, unavailable: 0 },
    ],
    breakdowns: [
      { area: 'Boilermaker', tmmNo: 'LD0405', model: 'Maverick', description: 'Not Available', remarks: 'Engine commission (No communication between engine and machine)' },
      { area: 'Plant Fitter', tmmNo: 'LD0620', model: 'Maverick', description: 'Not Available', remarks: 'Strata (Surface decline & No access to gate, locked)' },
      { area: 'Logistics', tmmNo: 'UV0078', model: 'RORO', description: 'Not Available', remarks: 'Rear axle' },
    ],
    oemAssistanceRequired: 2,
    dailyTracking: [
      { area: 'Main West', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 1, total: 2, color: 'yellow' }, thu: { available: 1, total: 2, color: 'yellow' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 80.0 },
      { area: 'Boilermaker', mon: { available: 2, total: 3, color: 'yellow' }, tue: { available: 2, total: 3, color: 'yellow' }, wed: { available: 2, total: 3, color: 'yellow' }, thu: { available: 2, total: 3, color: 'yellow' }, fri: { available: 2, total: 3, color: 'yellow' }, weeklyAvg: 66.7 },
      { area: 'BEV', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 2, total: 2, color: 'green' }, thu: { available: 2, total: 2, color: 'green' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Security', mon: { available: 1, total: 1, color: 'green' }, tue: { available: 1, total: 1, color: 'green' }, wed: { available: 1, total: 1, color: 'green' }, thu: { available: 1, total: 1, color: 'green' }, fri: { available: 1, total: 1, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Logistics', mon: { available: 5, total: 7, color: 'yellow' }, tue: { available: 6, total: 7, color: 'yellow' }, wed: { available: 6, total: 7, color: 'yellow' }, thu: { available: 6, total: 7, color: 'yellow' }, fri: { available: 6, total: 7, color: 'yellow' }, weeklyAvg: 82.9 },
      { area: 'Hyd Fitter', mon: { available: 6, total: 6, color: 'green' }, tue: { available: 6, total: 6, color: 'green' }, wed: { available: 6, total: 6, color: 'green' }, thu: { available: 5, total: 6, color: 'yellow' }, fri: { available: 6, total: 6, color: 'green' }, weeklyAvg: 96.7 },
      { area: 'Electricians', mon: { available: 4, total: 4, color: 'green' }, tue: { available: 4, total: 4, color: 'green' }, wed: { available: 4, total: 4, color: 'green' }, thu: { available: 4, total: 4, color: 'green' }, fri: { available: 4, total: 4, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Mechanics', mon: { available: 3, total: 3, color: 'green' }, tue: { available: 3, total: 3, color: 'green' }, wed: { available: 3, total: 3, color: 'green' }, thu: { available: 3, total: 3, color: 'green' }, fri: { available: 3, total: 3, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Sampling', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 2, total: 2, color: 'green' }, thu: { available: 2, total: 2, color: 'green' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Construction', mon: { available: 3, total: 3, color: 'green' }, tue: { available: 3, total: 3, color: 'green' }, wed: { available: 3, total: 3, color: 'green' }, thu: { available: 3, total: 3, color: 'green' }, fri: { available: 3, total: 3, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Plant Fitter', mon: { available: 6, total: 7, color: 'yellow' }, tue: { available: 5, total: 7, color: 'yellow' }, wed: { available: 6, total: 7, color: 'yellow' }, thu: { available: 6, total: 7, color: 'yellow' }, fri: { available: 6, total: 7, color: 'yellow' }, weeklyAvg: 82.9 },
      { area: 'Central', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 2, total: 2, color: 'green' }, thu: { available: 2, total: 2, color: 'green' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Explosive', mon: { available: 1, total: 1, color: 'green' }, tue: { available: 1, total: 1, color: 'green' }, wed: { available: 1, total: 1, color: 'green' }, thu: { available: 1, total: 1, color: 'green' }, fri: { available: 1, total: 1, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'X Cut', mon: { available: 1, total: 1, color: 'green' }, tue: { available: 1, total: 1, color: 'green' }, wed: { available: 1, total: 1, color: 'green' }, thu: { available: 1, total: 1, color: 'green' }, fri: { available: 1, total: 1, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Utility TMM', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 2, total: 2, color: 'green' }, thu: { available: 1, total: 2, color: 'yellow' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 90.0 },
      { area: 'Other', mon: { available: 18, total: 18, color: 'green' }, tue: { available: 18, total: 18, color: 'green' }, wed: { available: 18, total: 18, color: 'green' }, thu: { available: 18, total: 18, color: 'green' }, fri: { available: 18, total: 18, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'TOTAL', mon: { available: 61, total: 65, color: 'green' }, tue: { available: 61, total: 65, color: 'green' }, wed: { available: 61, total: 65, color: 'green' }, thu: { available: 59, total: 65, color: 'green' }, fri: { available: 61, total: 65, color: 'green' }, weeklyAvg: 93.8 },
    ],
  },
  utilitySectionCurrentStatus: {
    totalUnavailable: 3,
    areaStatus: [
      { area: 'Boilermaker', unavailable: 1, details: [{ unit: 'LD0405', reason: 'Engine commission issue - No solution from Fermel (Deutz EMR4 upgrade to EMR5)' }] },
      { area: 'Plant Fitter', unavailable: 1, details: [{ unit: 'LD0620', reason: 'Strata (Surface decline & No access to gate, locked)' }] },
      { area: 'Logistics', unavailable: 1, details: [{ unit: 'UV0078', reason: 'Rear axle (Propshaft ordered 06 Oct 2025 - No stock at Fermel)' }] },
    ],
  },
};