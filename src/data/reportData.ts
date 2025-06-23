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
  weekNumber: 49,
  dateRange: '02 June to 08 June 2025',
  cover: {
    images: [
      { src: '/images/AD30.png', alt: 'AD30 Dump Truck', className: 'absolute top-[42%] -translate-y-1/2 left-0 w-1/2 transform transition-transform hover:scale-105' },
      { src: '/images/ST14.png', alt: 'ST14', className: 'absolute top-[30%] -translate-y-1/2 right-0 w-[45%] transform transition-transform hover:scale-105' },
      { src: '/images/cover-logo.png', alt: 'Logo', className: 'absolute top-[65%] left-1/2 -translate-x-1/2 w-1/4' }
    ],
  },
  footerSrc: '/images/footer-logo.png',
  heal: {
    highlights: [
      { site: 'Gloria', text: 'FL0119 Transported safely to underground' },
      { site: 'Gloria', text: 'SR0017 - Transported safely to underground' },
      { site: 'Nchwaning 3', text: 'FL0089 Transported safely to Broncoh Engineering' },
      { site: 'Nchwaning 3', text: 'BT100 Brake test – concrete work including office completed safely' },
      { site: 'Nchwaning 3', text: 'N3 Decline and workshop non-slip surface – Phase 1 completed safely' },
      { site: 'Nchwaning 3', text: 'Hand over done properly' },
    ],
    lowlights: [
      { site: 'Gloria', text: 'TMM Availability below 79%' },
      { site: 'Gloria', text: 'SR0037 & SR0040 Tail wheel cracked, SR0017 to be taken underground' },
      { site: 'Gloria', text: 'DT0106 Gears' },
      { site: 'Gloria', text: 'FL0081 Transmission' },
      { site: 'Nchwaning 3', text: 'TMM Availability below 80%' },
      { site: 'Nchwaning 3', text: 'HD0056 Radiator, HD0055 Tag not responding' },
      { site: 'Nchwaning 3', text: 'RT0055 Power pack, RT0049 Strata' },
      { site: 'Nchwaning 3', text: 'SR0030 Shovel safety pin out, SR0044 Aircon, SR0035 Exhaust system' },
      { site: 'Nchwaning 3', text: 'DT0118 No acceleration & Brakes, DT0161 Oil leak & Gears, DT0154 Left mirror bended' },
      { site: 'Nchwaning 3', text: 'FL0101 Steering not turning, FL0091 Aircon' },
      { site: 'Nchwaning 3', text: 'DT0147 Auxiliary motors, DT063 Repair articulation door at boilershop, DT0149 Strata, DT0162 Brake not releasing' },
      { site: 'Nchwaning 3', text: 'FL0098 Comms error, FL0107 Battery not connecting, FL0108 Oil leak' },
    ],
    emergingIssues: [
        { site: 'Nchwaning 3', text: 'UV0045 Bird machine – Failed the dynamic brake test.' },
    ],
    priorities: [
      { site: 'Gloria', text: 'Epiroc to attend DT0106 Gears,FL0081 Transmission' },
      { site: 'Gloria', text: 'Aard to assist SR0037 &SR0040 Tail wheel cracked' },
    ],
  },
  shaftsAndWinders: {
    tonsPerHour: { value: 0, target: 450 },
    rwAvailability: { value: 0, target: 96 },
    highlights: [],
    lowlights: [],
    emergingIssues: [],
    priorities: [],
  },
  sites: {
    gloria: {
      name: 'Gloria',
      trendChart: { src: '/images/Gloria Weekly Chart - Wk49.png' },
      safety: { status: 'Good', details: 'No incidents reported.' },
      weeklyAverage: { value: 77.8, target: 80 },
      serviceCompliance: { status: 'Issues', details: 'HD at 50%, RT at 33%, UV Emulsion at 0%.' },
      availability: [
        { label: 'DT', percentage: 73.63, target: 80 },
        { label: 'FL', percentage: 64.87, target: 80 },
        { label: 'HD', percentage: 94.41, target: 90 },
        { label: 'RT', percentage: 95.09, target: 90 },
        { label: 'SR', percentage: 59.98, target: 80 },
      ],
      breakdowns: [
        { category: 'DT', details: 'DT0106 - Equipment/Operational Delays/No Operator' },
        { category: 'FL', details: 'FL0081 - /Equipment/Breakdown Mechanical' },
      ],
    },
    nchwaning2: {
        name: 'Nchwaning 2',
        trendChart: { src: '' },
        safety: { status: 'Good', details: 'No data provided.' },
        weeklyAverage: { value: 0, target: 85 },
        serviceCompliance: { status: 'Good', details: 'No data provided.' },
        availability: [],
        breakdowns: [],
    },
    nchwaning3: {
      name: 'Nchwaning 3',
      trendChart: { src: '/images/N3 Weekly Chart - Wk49.png' },
      safety: { status: 'Good', details: 'No incidents reported.' },
      weeklyAverage: { value: 83.24, target: 85 },
      serviceCompliance: { status: 'Issues', details: 'HD at 75%, RT at 75%, SR at 50%.' },
      availability: [
        { label: 'DT', percentage: 72.54, target: 80 },
        { label: 'FL', percentage: 78.09, target: 80 },
        { label: 'HD', percentage: 81.90, target: 90 },
        { label: 'RT', percentage: 86.90, target: 90 },
        { label: 'SR', percentage: 84.93, target: 80 },
      ],
      breakdowns: [
        { category: 'DT', details: 'DT0118 - /Equipment/Breakdown Mechanical/Brake System, DT0147 - /Equipment/Breakdown Electrical, DT0161 - /Equipment/Breakdown Auto Electrical/Control Systems/Control Units' },
        { category: 'FL', details: 'FL0101 - /Equipment/Breakdown Mechanical' },
      ],
    },
  },
  bev: {
    availability: [
      { label: 'DTe', value: 80, target: 76 },
      { label: 'FLe', value: 80, target: 71 },
    ],
    serviceCompliance: [
        { label: 'DTe', value: 100 },
        { label: 'FLe', value: 100 },
    ],
    breakdowns: [
      { equipment: 'DTe', details: ["DT0147 Auxiliary motors", "DT063 Repair articulation door at boilershop", "DT0149 Strata", "DT0162 Brake not releasing"] },
      { equipment: 'FLe', details: ["FL0098 Comms error", "FL0107 Battery not connecting", "FL0108 Oil leak"] },
    ],
    batteryThemes: [],
  },
};