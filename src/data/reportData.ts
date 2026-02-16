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
        { site: 'General', text: 'OEM coordinated effort to sort issues on UV137. Strata and ECS are working together.' },
        { site: 'Gloria', text: 'DT0184 & DT0185 COC completed and ready for production.' },
        { site: 'Gloria', text: 'UV0105 Water truck level 9 completed. TMM availability improved to 92%.' },
    ],
    lowlights: [
        { site: 'Nchwaning 3', text: 'Still have 2/3 charging UVs operation which is impacting charging.' },
        { site: 'Nchwaning 3', text: 'Barloworld site support is still an issue to attend DT121 which has been standing for more than 3 weeks.' },
        { site: 'Gloria', text: 'DT availability was booked incorrect. DT0174 waiting for Balows for level 9.' },
        { site: 'Gloria', text: 'DT0152 not selecting gears - Nerospec inspection required.' },
    ],
    emergingIssues: [
        { site: 'General', text: 'Lack of necessary skills for OEM support team.' },
        { site: 'Nchwaning 3', text: 'Required Engine upgrade for UV108 to be compatible with CAS L9.' },
        { site: 'Gloria', text: 'UV0068 Emulsion unit axle needs replacement - nothing available at store.' },
        { site: 'Gloria', text: 'Mechanical Foreman off sick continuously. Surface compressor commissioning challenges.' },
    ],
    priorities: [
        { site: 'General', text: 'Drive actions on Engineers action tracker.' },
        { site: 'General', text: 'Discuss availability contributing factors with the team.' },
        { site: 'Gloria', text: '74N tip liners to be repaired. CV0053 to do hot splice.' },
        { site: 'Gloria', text: 'Conveyor Watch to submit splice condition report.' },
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
      safety: { status: 'Good', details: 'Zero incidents this week (YTD: MTC=15, LTI=3, PD=54)' },
      weeklyAverage: { value: 80, target: 85 },
      serviceCompliance: { status: 'Issues', details: 'FL Diesel at 60.4% availability - lowest of the week' },
      availability: [
          { label: 'DT Diesel', percentage: 77.4, target: 85 },
          { label: 'DT BEV', percentage: 78.8, target: 85 },
          { label: 'FL Diesel', percentage: 60.4, target: 85 },
          { label: 'FL BEV', percentage: 85.8, target: 85 },
          { label: 'HD', percentage: 89.2, target: 90 },
          { label: 'RT', percentage: 88.4, target: 90 },
          { label: 'SR', percentage: 92.4, target: 85 },
      ],
      breakdowns: {
          'Dump Trucks (DTs)': ['DT145: Gears Faulty', 'DT148: Aircon issues', 'DT171: A Frame', 'DT146: Isolator faulty', 'DT121: Standing 3+ weeks (Barloworld support issue)'],
          'Front Loaders (FLs) - 60.4%': ['FL101: Steering Problem', 'FL103: Equipment issue'],
      },
    },
    nchwaning2: {
        name: 'Nchwaning 2',
        trendChart: { src: '/images/N2 Weekly availability chart.png', comment: '"Zero safety incidents this week. Support equipment availability at 94.7%. FL service compliance at 66.7% due to availability."' },
        safety: { status: 'Good', details: 'Zero incidents this week (YTD: MTC=1, LTI=0, PD=5)' },
        weeklyAverage: { value: 95, target: 85 },
        serviceCompliance: { status: 'Issues', details: 'DT: 100%, FL: 66.7% (rescheduled), HD: 100%, RT: 100%, Support: 120%' },
        availability: [
            { label: 'DT', percentage: 100 },
            { label: 'FL', percentage: 66.7 },
            { label: 'HD', percentage: 100 },
            { label: 'RT', percentage: 100 },
            { label: 'Support Equipment', percentage: 94.7 },
        ],
        breakdowns: [
            { category: 'FL Service Compliance', details: 'FL at 66.7% due to loader availability - rescheduled for next week' },
            { category: 'Support Equipment', details: '4 breakdowns out of 76 units. UV0053 still out for Level 9 upgrade.' },
        ],
    },
    gloria: {
        name: 'Gloria',
        trendChart: { src: '/images/Gloria Weekly availability Chart.png', comment: '"Strong HD availability at 99%. SR availability at 70% - needs attention. Zero safety incidents this week."' },
        safety: { status: 'Good', details: 'Zero incidents this week (YTD: MTC=2, LTI=1, PD=6)' },
        weeklyAverage: { value: 86, target: 85 },
        serviceCompliance: { status: 'Good', details: 'Production on track: ROM YTD 571,307t vs Plan 578,982t' },
        availability: [
            { label: 'HD', percentage: 99 },
            { label: 'RT', percentage: 88 },
            { label: 'DT', percentage: 86 },
            { label: 'SR', percentage: 70 },
        ],
        breakdowns: [
            { category: 'Scalers (SRs) - 70%', details: 'SR availability needs improvement - lowest of equipment types' },
        ],
    },
  },
  bev: {
    availability: [
        { label: 'DT BEV', value: 78.8, target: 85 },
        { label: 'FL BEV', value: 85.8, target: 85 },
    ],
    serviceCompliance: [
        { label: 'DT BEV', value: 78.8 },
        { label: 'FL BEV', value: 85.8 },
    ],
    breakdowns: [
        { equipment: 'DT BEV', details: ['DT146: Isolator faulty', 'Charging UVs: 2/3 operational - impacting charging'] },
        { equipment: 'UV Equipment', details: ['UV137: OEM coordinated effort (Strata & ECS)', 'UV108: Engine upgrade required for CAS L9'] },
    ],
    batteryThemes: ['OEM coordinated effort on UV137 with Strata and ECS working together.', 'Charging UV availability critical - only 2/3 operational.', 'UV108 requires engine upgrade for CAS L9 compatibility.'],
  },
  utilitySection: {
    fleetStatus: { available: 74, unavailable: 0 },
    areaSummary: [
      { area: 'Utility Vehicles', department: 'All Departments', total: 74, unavailable: 0 },
    ],
    breakdowns: [],
    oemAssistanceRequired: 0,
    dailyTracking: [
      { 
        area: 'Utility Vehicles', 
        mon: { available: 74, total: 74, color: 'green' }, 
        tue: { available: 74, total: 74, color: 'green' }, 
        wed: { available: 74, total: 74, color: 'green' }, 
        thu: { available: 74, total: 74, color: 'green' }, 
        fri: { available: 74, total: 74, color: 'green' }, 
        weeklyAvg: 100.0 
      },
    ],
  },
  utilitySectionCurrentStatus: {
    totalUnavailable: 0,
    areaStatus: [
      { area: 'Utility Vehicles', unavailable: 0, details: [] },
    ],
  },
};