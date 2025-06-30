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
  weekNumber: 52,
  dateRange: '23 June 2025 to 29 June 2025',
  cover: {
    images: [
      { src: '/images/AD30.png', alt: 'AD30 Dump Truck', className: 'absolute top-[35%] -translate-y-1/2 left-[5%] w-[40%] transform transition-transform hover:scale-105' },
      { src: '/images/ST14.png', alt: 'ST14', className: 'absolute top-[35%] -translate-y-1/2 right-[5%] w-[40%] transform transition-transform hover:scale-105' },
      { src: '/images/S2.png', alt: 'S2', className: 'absolute top-[70%] -translate-y-1/2 left-[5%] w-[40%] transform transition-transform hover:scale-105' },
      { src: '/images/MT42B.png', alt: 'MT42B', className: 'absolute top-[70%] -translate-y-1/2 right-[5%] w-[40%] transform transition-transform hover:scale-105' },
      { src: '/images/cover-logo.png', alt: 'Logo', className: 'absolute top-[88%] left-1/2 -translate-x-1/2 w-1/4' }
    ],
  },
  footerSrc: '/images/Footer.png',
  heal: {
    highlights: [
      { site: 'Nchwaning 3', text: 'Improved production results for the week.' },
      { site: 'Nchwaning 3', text: 'BEV performed better' },
      { site: 'Nchwaning 2', text: 'Delivery of 2 emulsion UV\'s' },
      { site: 'Gloria', text: 'SR0040 back to production making 4 scalers 4/5' },
      { site: 'Gloria', text: 'FL0081 & FL0083 back to production making 5/5' },
    ],
    lowlights: [
      { site: 'Nchwaning 3', text: 'Diesel DT\'s performance' },
      { site: 'Nchwaning 2', text: 'Poor availability on loaders and RT\'s' },
      { site: 'Nchwaning 2', text: 'Poor production performance for the month of June' },
      { site: 'Gloria', text: 'TMM Availability below 74%' },
    ],
    emergingIssues: [
      { site: 'Nchwaning 3', text: 'Sick leave increase – winter conditions' },
      { site: 'Nchwaning 2', text: 'Results from maintenance of electrical switchgear over the past weekend' },
      { site: 'Nchwaning 2', text: 'Challenges with repairing RT38' },
      { site: 'Gloria', text: 'New dump trucks are available at Barlow\'s by 31 July 2025' },
    ],
    priorities: [
      { site: 'Nchwaning 3', text: 'Focus on Diesel primary production fleet (Strata, Neurospec, spares)' },
      { site: 'Nchwaning 2', text: 'Short and medium term resolution functionality and safety of switchgear' },
      { site: 'Nchwaning 2', text: 'Close out all outstanding capital orders for the financial year end' },
      { site: 'Gloria', text: 'Aard to assist SR0037- Tail wheel cracked waiting parts' },
      { site: 'Gloria', text: 'New 9 West dam to be completed' },
    ],
  },
  shaftsAndWinders: {
    tonsPerHour: { value: 294, target: 523 },
    rwAvailability: { value: 86, target: 95 },
    highlights: [
      'Solrock Shaft Repair Work Weekend No.2 Done',
      'Nch2 PW Ecam Locking Indication Sorted out',
      'Nch3 Decline-Waste Handling Facility:  Iceburg completed their Scope. Cameras and access to follow'
    ],
    lowlights: [
      'Nch3 PW Headgear Digicom Card Failure',
      'Skip No. 4 Rubbing against side wall'
    ],
    emergingIssues: [
      'Low compliment of Fitters and Riggers in Mechanical Section'
    ],
    priorities: [
      'Nch2 Main Fan No.1 Impeller and Bearings Replacement',
      'Completing Fitter & Rigger Positions in Winder Mechanical Section',
      'Shaft Repair Work with Solrock Team Weekend No.3'
    ],
  },
  sites: {
    n3: {
        name: 'Nchwaning 3',
        trendChart: { 
            src: '/images/Week52/Nchwaning 3 Weekly Availability Chart - Week 52.png',
            comment: 'Weekly trend for N3 fleet availability.'
        },
        safety: { status: 'Good', details: 'Clear' },
        weeklyAverage: { value: 86, target: 85 },
        serviceCompliance: { status: 'Good', details: 'All services completed on time' },
        availability: [
            { label: 'HD', percentage: 94, target: 85 },
            { label: 'RT', percentage: 77, target: 85 },
            { label: 'SR', percentage: 93, target: 85 },
            { label: 'DT Diesel', percentage: 71, target: 85 },
            { label: 'FL Diesel', percentage: 92, target: 85 },
            { label: 'DT BEV', percentage: 82, target: 85 },
            { label: 'FL BEV', percentage: 94, target: 85 },
        ],
        breakdowns: [
            { category: 'RT', details: 'Waiting for miner RT0054, Engine not starting RT0047, Elect cable RT0049'},
            { category: 'DT Diesel', details: 'Strata, awaiting parts (DT0109), Engine Cutt off'},
            { category: 'DT BEV', details: 'Multiple units reported with battery charging issues and strata faults.'},
        ]
    },
    n2: {
        name: 'Nchwaning 2',
        trendChart: { 
            src: '/images/Week52/Nchwaning 2 Weekly Availability Chart - Week 52.png',
            comment: 'Weekly trend for N2 fleet availability.'
        },
        safety: { status: 'Good', details: 'Clear' },
        weeklyAverage: { value: 87, target: 85 },
        serviceCompliance: { status: 'Issues', details: 'RT: 33% compliance. HD: 133% compliance due to major breakdowns (RT0056, RT0038)' },
        availability: [
            { label: 'DT', percentage: 91, target: 85 },
            { label: 'FL', percentage: 80, target: 85 },
            { label: 'HD', percentage: 91, target: 85 },
            { label: 'RT', percentage: 75, target: 85 },
            { label: 'SR', percentage: 92, target: 85 },
        ],
        breakdowns: [
            { category: 'FL', details: 'FL114 bucket' },
            { category: 'RT', details: 'RT56 transmission, RT43 percussion' },
        ],
    },
    gloria: {
        name: 'Gloria',
        trendChart: { 
            src: '/images/Week52/Gloria Weekly Availability Chart - Week 52.png',
            comment: 'Weekly trend for Gloria fleet availability.'
        },
        safety: { status: 'Good', details: 'Clear' },
        weeklyAverage: { value: 74, target: 85 },
        serviceCompliance: { status: 'Issues', details: 'RT service compliance at 50%. RT0045 & RT0037 to be serviced.' },
        availability: [
            { label: 'HD', percentage: 82, target: 85 },
            { label: 'DT', percentage: 90, target: 85 },
            { label: 'SR', percentage: 41, target: 85 },
            { label: 'FL', percentage: 64, target: 85 },
            { label: 'RT', percentage: 50, target: 85 },
        ],
        breakdowns: [
            { category: 'HD', details: 'HD66 Feed sling,HD0060 Loose fitting and parallel' },
            { category: 'SR', details: 'SR0037 &SR0040 Tail wheel cracked' },
            { category: 'DT', details: 'DT0152 Oil leak' },
            { category: 'FL', details: 'FL0081 Transmission leaking, FL0083 Aircon, FL0118' },
            { category: 'RT', details: 'RT service compliance at 50% - RT0045 & RT0037 to be serviced.' }
        ],
    },
  },
  bev: {
    availability: [
        { label: 'DT BEV', value: 82, target: 85 },
        { label: 'FL BEV', value: 94, target: 85 }
    ],
    serviceCompliance: [
        { label: 'DT BEV', value: 100 },
        { label: 'FL BEV', value: 100 },
    ],
    breakdowns: [
        { equipment: 'DT BEV', details: ['Multiple units reported with battery charging issues and strata faults.'] }
    ],
    batteryThemes: [
        'Charging bay capacity and availability impacting turnaround times.'
    ],
  },
};
