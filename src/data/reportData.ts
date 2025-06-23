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
  weekNumber: 26,
  dateRange: '17 June to 23 June 2025',
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
    tonsPerHour: { value: 3746, target: 6886 },
    rwAvailability: { value: 50, target: 95 },
    highlights: [
        'No Stoppages on Nch2 PW, Nch3 PW, GL PW.'
    ],
    lowlights: [
        'Shaft Barrel Repair Project on Nch2 RW.'
    ],
    emergingIssues: [],
    priorities: []
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
    n3: {
        name: 'N3',
        trendChart: { 
            src: '/images/N3 Weekly Fleet Availability Chart - Week 51.png',
            comment: 'Weekly trend for N3 fleet availability, showing consistent performance around the target.'
        },
        safety: { status: 'Good', details: 'Clear' },
        weeklyAverage: { value: 74, target: 90 },
        serviceCompliance: { status: 'Good', details: 'All services completed on time' },
        availability: [
            { label: 'HD', percentage: 93, target: 85 },
            { label: 'RT', percentage: 79, target: 85 },
            { label: 'SR', percentage: 92, target: 85 },
            { label: 'DT BEV', percentage: 84, target: 85 },
            { label: 'FL BEV', percentage: 65, target: 85 },
        ],
        breakdowns: [
            { category: 'Dt147', details: 'Red stop  lamp, standing at North West section 11w81n'},
            { category: 'Dt148', details: 'Strata, still standing.'},
            { category: 'Fl109', details: 'Windscreen.Standing whole shift.'},
            { category: 'Dt118', details: 'Strata, standing whole shift.'},
            { category: 'Dt119', details: 'Strata with Strata during the shift.'},
            { category: 'Dt154', details: 'Strata, standing whole shift.'},
            { category: 'Dt145', details: 'Strata: Standing whole shift.'},
            { category: 'Dt146', details: 'Battery low at 13H57, went to charge battery'},
            { category: 'Dt149', details: 'Battery low at 13H30, went to charge the battery.'},
            { category: 'Dt150', details: 'Battery low at 00H59, Went to charge battery.'},
            { category: 'Dt162', details: 'Battery low, went to charge the battery at 13H20.'},
            { category: 'Dt171', details: 'Battery low at 13H21, went to cahargecyhe battery.'},
            { category: 'Fl107', details: 'Hyd oil, from 08H58 until 10H00'},
            { category: 'Fl131', details: 'Propshaft, from 09H09 until 10H56.'}
        ]
    },
    gloria: {
        name: 'Gloria',
        trendChart: { src: '/images/Gloria Weekly Fleet Availability Chart - Week 51.png' },
        safety: { status: 'Good', details: 'All clear' },
        weeklyAverage: { value: 72, target: 85 },
        serviceCompliance: { status: 'Good', details: 'No issues reported' },
        availability: [
            { label: 'HD', percentage: 98 },
            { label: 'RT', percentage: 82 },
            { label: 'SR', percentage: 33 },
            { label: 'DT Diesel', percentage: 100 },
            { label: 'FL Diesel', percentage: 48 },
        ],
        breakdowns: [
            { category: 'FL0081', details: 'Oil leak transmission' },
            { category: 'FL0083', details: 'Aircon' },
            { category: 'DT0105', details: 'Yoke' },
            { category: 'SR0040', details: 'Tail frame' },
            { category: 'SR0037', details: 'Tail frame' },
        ],
    },
  },
  bev: {
    availability: [
        { label: 'DT BEV', value: 60, target: 85 },
        { label: 'FL BEV', value: 90, target: 85 },
    ],
    serviceCompliance: [
        { label: 'DT BEV', value: 100 },
        { label: 'FL BEV', value: 100 },
    ],
    breakdowns: [
        { equipment: 'Dt118', details: ['B/down'] },
        { equipment: 'Dt147', details: ['D/down'] },
        { equipment: 'Dt148', details: ['B/down'] },
        { equipment: 'Dt149', details: ['Not used'] },
        { equipment: 'Dt162', details: ['Not used'] },
        { equipment: 'Fl101', details: ['B/down'] },
        { equipment: 'Dt147', details: ['Red stop lamp'] },
        { equipment: 'Dt148', details: ['Strata'] },
        { equipment: 'Fl109', details: ['Windscreen'] },
        { equipment: 'Dt118', details: ['Strata'] },
        { equipment: 'Dt119', details: ['Strata'] },
        { equipment: 'Dt154', details: ['Strata'] },
        { equipment: 'Dt145', details: ['Strata'] },
        { equipment: 'Dt146', details: ['Battery low'] },
        { equipment: 'Dt149', details: ['Battery low'] },
        { equipment: 'Dt150', details: ['Battery low'] },
        { equipment: 'Dt162', details: ['Battery low'] },
        { equipment: 'Dt171', details: ['Battery low'] },
        { equipment: 'Fl107', details: ['Hyd oil'] },
        { equipment: 'Fl131', details: ['Propshaft'] }
    ],
    batteryThemes: [
        'Multiple units with low batteries',
        'Multiple units requiring swaps',
        '2 subpack repairs needed',
        '1 battery with rapid discharge fault'
    ],
  },
};
