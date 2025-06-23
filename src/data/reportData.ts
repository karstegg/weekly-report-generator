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
  weekNumber: 50,
  dateRange: '09 June to 15 June 2025',
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
        { site: 'Nchwaning 3', text: 'Good recovery on Drill Rigs and Roof Bolters.' },
        { site: 'Nchwaning 2', text: 'Good performance on Dump Trucks and Scalers.' },
        { site: 'Gloria', text: 'Good performance on Haul Trucks and Roof Bolters.' },
    ],
    lowlights: [
        { site: 'Nchwaning 3', text: 'Dump Trucks remain a concern.' },
        { site: 'Nchwaning 2', text: 'Front-end loaders are a concern.' },
        { site: 'Gloria', text: 'Drill Rigs and Scalers are a concern.' },
    ],
    emergingIssues: [
        { site: 'Nchwaning 3', text: 'DT0146 Inverter units.' },
        { site: 'Nchwaning 2', text: 'FL106 Lineboring.' },
        { site: 'Gloria', text: 'SR0037 & SR0040 Tail wheel cracked.' },
    ],
    priorities: [
        { site: 'Nchwaning 3', text: 'Improve DT BEV availability.' },
        { site: 'Nchwaning 2', text: 'Improve FL availability.' },
        { site: 'Gloria', text: 'Improve SR availability.' },
    ],
  },
  shaftsAndWinders: {
    tonsPerHour: { value: 950, target: 1000 },
    rwAvailability: { value: 98, target: 95 },
    highlights: ['Good RW availability.', 'Good tonnes per hour.'],
    lowlights: ['Minor issues with chairlifts.'],
    emergingIssues: ['None reported.'],
    priorities: ['Continue with current maintenance strategy.'],
  },
  sites: {
    nchwaning3: {
      name: 'Nchwaning 3',
      trendChart: { src: '/images/N3 Weekly availability chart.png', comment: '"Good recovery in the last week. DT\'s still a concern."' },
      safety: { status: 'Incident', details: 'FIRE Incident: Farmel L00377 smouldering wires.' },
      weeklyAverage: { value: 81, target: 85 },
      serviceCompliance: { status: 'Issues', details: 'Issues: DT BEV (50%), Support Diesel (50%)' },
      availability: [
          { label: 'DT', percentage: 77, target: 85 },
          { label: 'FL', percentage: 89, target: 85 },
          { label: 'HD', percentage: 95, target: 90 },
          { label: 'RT', percentage: 92, target: 90 },
          { label: 'SR', percentage: 88, target: 85 },
      ],
      breakdowns: {
          'Dump Trucks (DTs) - 77%': ['DT0146: Inverter units, flat battery, Transfer box', 'DT0147: Strata breakdown', 'DT0150: Flat battery, seat mechanics, battery comms'],
          'Front Loaders (FLs) - 89%': ['FL0135: Bucket cylinder drift'],
      },
    },
    nchwaning2: {
        name: 'Nchwaning 2',
        trendChart: { src: '/images/N2 Weekly availability chart.png', comment: '"Negative trend since start of year. Loaders are a concern."' },
        safety: { status: 'Good', details: 'No incidents reported' },
        weeklyAverage: { value: 85, target: 85 },
        serviceCompliance: { status: 'Good', details: 'All fleets above 80%' },
        availability: [
            { label: 'DT', percentage: 88.5 },
            { label: 'FL', percentage: 72.8 },
            { label: 'HD', percentage: 92.8 },
            { label: 'RT', percentage: 90.2 },
            { label: 'SR', percentage: 79.4 },
        ],
        breakdowns: [
            { category: 'FL', details: 'Lineboring on FL106.' },
            { category: 'DT', details: 'Multiple minor breakdowns impacting fleet.' },
        ],
    },
    gloria: {
        name: 'Gloria',
        trendChart: { src: '/images/Gloria Weekly availability Chart.png', comment: '"Negative trend since start of year. Trucks are a concern. New loader FL119 in production."' },
        safety: { status: 'Good', details: 'No incidents reported' },
        weeklyAverage: { value: 79, target: 85 },
        serviceCompliance: { status: 'Issues', details: 'Issues: UV 50%, Support 60%' },
        availability: [
            { label: 'HD', percentage: 93 },
            { label: 'RT', percentage: 91 },
            { label: 'DT', percentage: 80 },
            { label: 'FL', percentage: 71 },
            { label: 'SR', percentage: 59 },
        ],
        breakdowns: [
            { category: 'Drill Trucks (DTs) - 80%', details: 'Key Failures: DT0106: Gears' },
            { category: 'Front Loaders (FLs) - 71%', details: 'Key Failures: FL0081: Transmission' },
            { category: 'Scalers (SRs) - 59%', details: 'Key Failures: SR0037 & SR0040: Tail wheel cracked' },
        ],
    },
  },
  bev: {
    availability: [
        { label: 'DT BEV', value: 77, target: 85 },
        { label: 'FL BEV', value: 89, target: 85 },
    ],
    serviceCompliance: [
        { label: 'DT BEV', value: 50 },
        { label: 'FL BEV', value: 100 },
    ],
    breakdowns: [
        { equipment: 'DT BEV', details: ['DT0146: Inverter units, flat battery, Transfer box', 'DT0147: Strata breakdown', 'DT0150: Flat battery, seat mechanics, battery comms'] },
    ],
    batteryThemes: ['Reliability of batteries on DT fleet is a focus area.', 'Issues with sub-packs and pumps noted.', '6 sub-banks received for battery maintenance program.'],
  },
};