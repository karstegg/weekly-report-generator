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
    production: {
      tonsPerHour: { value: number; target: number };
      rockWinderAvailability: { value: number; target: number };
    };
    heal: {
      highlights: string[];
      lowlights: string[];
      emergingIssues: string[];
      priorities: string[];
    };
  };
  sites: {
    [key: string]: SitePerformance;
  };
  bev: {
    name: string;
    availability: { label: string; value: number; target: number }[];
    serviceCompliance: { label: string; value: number | null }[];
    breakdowns: { equipment: string; details: string[] }[];
    batteryThemes: string[];
  };
  utility?: {
    areas: { name: string; availability: number; total: number; available: number }[];
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
  bevDetail?: {
    dt: {
      availability: number;
      unitAvailability: { id: string; availability: number }[];
      breakdownDetails: { type: string; machineId: string; comment: string; hours: number }[];
    };
    fl: {
      availability: number;
      unitAvailability: { id: string; availability: number }[];
      breakdownDetails: { type: string; machineId: string; comment: string; hours: number }[];
    };
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
  keyBreakdowns?: { equipment: string; details: string[] }[];
}

export const reportData: ReportData = {
  weekNumber: 31,
  dateRange: '23 - 29 January 2026',
  
  cover: {
    images: [
      { src: '/images/AD30.png', alt: 'AD30 Dump Truck', className: 'absolute top-[35%] -translate-y-1/2 left-[5%] w-[40%] transform transition-transform hover:scale-105' },
      { src: '/images/ST14.png', alt: 'ST14', className: 'absolute top-[35%] -translate-y-1/2 right-[5%] w-[40%] transform transition-transform hover:scale-105' },
      { src: '/images/S2.png', alt: 'S2', className: 'absolute top-[70%] -translate-y-1/2 left-[5%] w-[40%] transform transition-transform hover:scale-105' },
      { src: '/images/Winder.png', alt: 'Winder - Shafts & Winders', className: 'absolute top-[70%] -translate-y-1/2 right-[5%] w-[40%] transform transition-transform hover:scale-105' },
      { src: '/images/cover-logo.png', alt: 'Logo', className: 'absolute top-[88%] left-1/2 -translate-x-1/2 w-1/4' }
    ],
  },
  footerSrc: '/images/Footer.png',
  heal: {
    highlights: [
      { site: 'Gloria', text: 'UV0128 Emulsion tank fitment completed, waiting BME to complete the plant.' },
      { site: 'Gloria', text: 'Delivery of DT015 and 106 replacement AD30s.' },
      { site: 'N2', text: 'Production performance (tons) above target for the month - will close with ~8,000t.' },
      { site: 'N3', text: 'Continued progress on CAS L9 installations to comply with MHSA.' },
      { site: 'Shafts & Winders', text: 'Improved water supply from Vaal Gamagarra Water Supply.' },
    ],
    lowlights: [
      { site: 'Gloria', text: '74N Tip - CV0052 ISLR failure resulting in no production on Thursday.' },
      { site: 'Gloria', text: 'Low Availabilities: DT 66%, RT 78%, SR 79%.' },
      { site: 'N2', text: 'Emulsion UV137 frequently stopping, making charging to faces difficult.' },
      { site: 'N2', text: 'Park brake breakdowns decreased availability on DTs (DT121 & DT169 waiting Barloworld).' },
      { site: 'N3', text: 'Locker handle fingers laceration - FAC reported.' },
      { site: 'N3', text: 'Poor HD availability 72%.' },
      { site: 'Shafts & Winders', text: 'Plumber Contractor currently not on site due to PP360 related issues.' },
    ],
    emergingIssues: [
      { site: 'Gloria', text: 'Stores stock level raising concern - most spares not available but shows stock on system.' },
      { site: 'N2', text: 'Poor OEM legal compliance on PP360 making support difficult to render on time.' },
      { site: 'N2', text: 'No service provider for lifting equipment renewal - will affect authorisation when licenses expire.' },
      { site: 'N3', text: 'UG Plant Reliability: Continued delayed start ups due to instrumentation breakdowns (Comms failures).' },
      { site: 'N3', text: 'Radios and telephones comms not stable post past weeks breakdown.' },
      { site: 'Shafts & Winders', text: 'Low compliment of Fitters and Riggers putting pressure on Mechanical Section.' },
      { site: 'Shafts & Winders', text: 'Massive impact of providing full maintenance of Changehouses of all 3 Shafts.' },
      { site: 'Shafts & Winders', text: 'WTF: RFA Related issue.' },
    ],
    priorities: [
      { site: 'Gloria', text: '74N tip liners to be repaired; Commission surface compressor.' },
      { site: 'N2', text: 'Finish commissioning of UV108 and fix UV137 to be back on 3/3 compliment.' },
      { site: 'N3', text: 'SAT TIP 1 & 2 speed up: Focus on conveyor belt 55CV01 cable and motor replacements.' },
      { site: 'N3', text: 'IGS session to improve reliability of HD and RTs.' },
      { site: 'N3', text: 'Completion of Foremen and GES appointments.' },
      { site: 'N3', text: 'DT0172 commissioning to improve on KPIs.' },
      { site: 'Shafts & Winders', text: 'Shaft Repair Work with Solrock Team (de-establish Jan 2026).' },
      { site: 'Shafts & Winders', text: 'Employee Engagement - IDP sessions with SGM.' },
      { site: 'Shafts & Winders', text: 'Shaft Exam with Machinery Inspector.' },
      { site: 'Shafts & Winders', text: 'Shaft Dewatering Pump Test (revised to Feb 2026).' },
      { site: 'Shafts & Winders', text: 'Prep for Opportunity Maintenance during power outage to repair Cap-Banks.' },
    ],
  },
  shaftsAndWinders: {
    production: {
      tonsPerHour: { value: 690, target: 523 },
      rockWinderAvailability: { value: 95, target: 95 },
    },
    heal: {
      highlights: [
        'Improved Water supply from Vaal Gamagarra Water Supply.',
      ],
      lowlights: [
        'Plumber Contractor currently not on site due to PP360 related issues.',
      ],
      emergingIssues: [
        'Low compliment of Fitters and Riggers in Mechanical Section is still putting pressure on the Section.',
        'Massive impact of providing full Maintenance of Changehouses of all 3 x Shafts.',
        'WTF: RFA Related issue.',
      ],
      priorities: [
        'Shaft Exam with Machinery Inspector.',
        'Shaft Dewatering - Pump Test_Scheduled for Jan2026_Revised Date: Feb 2026.',
        'DMPR Instruction on Shafts & Winders.',
        'Prep for Opportunity Maintenance during Power outage to repair Cap-Banks at Consumer Substation.',
      ],
    },
  },
  sites: {
    gloria: {
      name: 'Gloria',
      trendChart: {
        src: '/images/Week31/Gloria Weekly Availability Chart Week 31.png',
        comment: 'Week 31: Overall 85% at target. DT 66%. FL 100%. HD 94%. RT 78%. SR 79%.',
      },
      safety: { status: 'Good', details: '' },
      weeklyAverage: { value: 85, target: 85 },
      serviceCompliance: { status: 'Issues', details: 'DT 100%, HD 100%, RT 100%, Support 50% (Weekly Quality Service Report). FL and SR data pending.' },
      availability: [
        { label: 'DT', percentage: 66, target: 85 },
        { label: 'FL', percentage: 100, target: 85 },
        { label: 'HD', percentage: 94, target: 85 },
        { label: 'RT', percentage: 78, target: 85 },
        { label: 'SR', percentage: 79, target: 85 }
      ],
      keyBreakdowns: [
        { equipment: 'DT', details: ['DT0174 - Not selecting gears (persistent, entire week).', 'DT0106 - Prop shaft.', 'DT0105 - Nerospec.', 'DT0153 - Strata.'] },
        { equipment: 'RT', details: ['RT0037 - Engine oil cooler.'] },
        { equipment: 'SR', details: ['SR0040 - Strata (wiring) and exhaust.', 'SR0037 - Petroman & Strata.'] },
      ],
    },
    n2: {
      name: 'Nchwaning 2',
      trendChart: {
        src: '/images/Week31/N2 Weekly Availability Chart Week 31.png',
        comment: 'Week 31: Overall 82.31% below target. DT 70.56%. Load & Haul 80.57%. Drill & Blast 85.33%. FL 89.37%, RT 92.43%, SR 86.55%. HD 78.54%.',
      },
      safety: { status: 'Good', details: '' },
      weeklyAverage: { value: 82.31, target: 85 },
      serviceCompliance: { status: 'Issues', details: 'DT 100%, HD 100%, RT 100%, SR Inspection 100%. FL 50% (25002316/A7). Support 80% (FL0100 on breakdown).' },
      availability: [
        { label: 'DT', percentage: 70.56, target: 85 },
        { label: 'FL', percentage: 89.37, target: 85 },
        { label: 'HD', percentage: 78.54, target: 85 },
        { label: 'RT', percentage: 92.43, target: 85 },
        { label: 'SR', percentage: 86.55, target: 85 }
      ],
      keyBreakdowns: [
        { equipment: 'DT', details: ['DT121 & DT0189 - Park brake (needs OEM assistant from Barloworld).', 'DT157 - Engine cut off.'] },
        { equipment: 'HD', details: ['HD046 - Oil leak and not starting.', 'HD065 - Engine not starting.', 'HD035 - Oil engine cooler.'] },
      ],
    },
    n3: {
      name: 'Nchwaning 3',
      trendChart: {
        src: '/images/Week31/N3 Weekly Availability Chart Week 31.png',
        comment: 'Week 31: Overall 84% below target. DT 79%. FL 95%. HD 72%. RT 88%. SR 85%.',
      },
      safety: { status: 'Good', details: '' },
      weeklyAverage: { value: 84, target: 85 },
      serviceCompliance: { status: 'Good', details: 'Service compliance maintained across all fleets.' },
      availability: [
        { label: 'DT-Diesel', percentage: 79, target: 85 },
        { label: 'FL-Diesel', percentage: 95, target: 85 },
        { label: 'HD', percentage: 72, target: 85 },
        { label: 'RT', percentage: 88, target: 85 },
        { label: 'SR', percentage: 85, target: 85 }
      ],
      keyBreakdowns: [
        { equipment: 'DT', details: ['DT-Diesel 79% - DT0148 aircon/main switch (spares) and Strata-related issues on diesel fleet.'] },
        { equipment: 'HD', details: ['HD 72% - HD0049 aircon gear motor leak (persistent, entire week). HD0069 engine oil leak. HD0062/HD0056 drifter failures.'] },
      ],
    }
  },
  bev: {
    name: 'BEV Fleet',
    availability: [
      { label: 'DT BEV', value: 76, target: 85 },
      { label: 'FL BEV', value: 98, target: 85 }
    ],
    serviceCompliance: [
      { label: 'DT BEV', value: null },
      { label: 'FL BEV', value: 100 }
    ],
    breakdowns: [
      {
        equipment: 'DT BEV',
        details: [
          'DT0171 A-frame failure (8.99% availability, 112.35 hrs downtime - 60-day lead time, expediting to fly in).',
          'Battery/charging issues: DT0147 DC/DC converter (4.13 hrs), DT0149 steering transducer short circuit (26.18 hrs), DT0150 battery safe state (6.45 hrs).',
          'Strata breakdowns: DT0162 (15.96 hrs), DT0163 (2.53 hrs).',
        ],
      },
      {
        equipment: 'FL BEV',
        details: [
          'FL BEV fleet performing well with 98% average availability.',
          'Minor issues: FL0098 electrical fuse (5.71 hrs), FL0113 transmission rubbers and hydraulic (4.27 hrs).',
        ],
      },
    ],
    batteryThemes: [
      'Battery Status: 10 ST14-B4 packs (1.6 ratio), 12 MT42-B5 packs (above 1.6 ratio). Charger stops being investigated.',
      'Critical Actions: Auxiliary motor spline grease campaign (only DT147 completed), Post 7 CCS connector cables replacement pending.',
      'CAS L9 Implementation: Lab scale tests with new software underway. MH4.0 software to be loaded on BEV machines.',
      '3 loader batteries with faulty TMS requiring replacement.',
    ],
  },
  utility: {
    areas: [
      { name: 'Main West', availability: 50.0, total: 10, available: 5 },
      { name: 'Boilermaker', availability: 53.3, total: 15, available: 8 },
      { name: 'BEV', availability: 60.0, total: 15, available: 9 },
      { name: 'Security', availability: 60.0, total: 5, available: 3 },
      { name: 'Logistics', availability: 78.9, total: 38, available: 30 },
      { name: 'Hyd Fitter', availability: 83.3, total: 30, available: 25 },
      { name: 'Electricians', availability: 85.7, total: 35, available: 30 },
      { name: 'Mechanics', availability: 86.7, total: 15, available: 13 },
      { name: 'Sampling', availability: 90.0, total: 10, available: 9 },
      { name: 'Construction', availability: 95.0, total: 20, available: 19 },
      { name: 'Plant Fitter', availability: 97.1, total: 35, available: 34 },
      { name: 'Ambulance', availability: 100.0, total: 5, available: 5 },
      { name: 'Central', availability: 100.0, total: 10, available: 10 },
      { name: 'Christo', availability: 100.0, total: 5, available: 5 },
      { name: 'Drill Shop', availability: 100.0, total: 10, available: 10 },
      { name: 'Explosive', availability: 100.0, total: 5, available: 5 },
      { name: 'Geology', availability: 100.0, total: 5, available: 5 },
      { name: 'Instrumentation', availability: 100.0, total: 5, available: 5 },
      { name: 'Itireleng', availability: 100.0, total: 5, available: 5 },
      { name: 'Manager', availability: 100.0, total: 5, available: 5 },
      { name: 'Roadway', availability: 100.0, total: 5, available: 5 },
      { name: 'Rock Engineering', availability: 100.0, total: 5, available: 5 },
      { name: 'SWD', availability: 100.0, total: 5, available: 5 },
      { name: 'Sanitec', availability: 100.0, total: 5, available: 5 },
      { name: 'Sim 2', availability: 100.0, total: 5, available: 5 },
      { name: 'Survey', availability: 100.0, total: 10, available: 10 },
      { name: 'Tramming', availability: 100.0, total: 10, available: 10 },
      { name: 'Training Center', availability: 100.0, total: 10, available: 10 },
      { name: 'Tyre Bay', availability: 100.0, total: 5, available: 5 },
      { name: 'Utility TMM', availability: 100.0, total: 10, available: 10 },
      { name: 'X Cut', availability: 100.0, total: 5, available: 5 },
    ],
  },
  utilitySection: {
    fleetStatus: { available: 220, unavailable: 48 },
    areaSummary: [
      { area: 'Main West', department: 'Mining', total: 10, unavailable: 5 },
      { area: 'Boilermaker', department: 'Engineering', total: 15, unavailable: 7 },
      { area: 'BEV', department: 'Engineering', total: 15, unavailable: 6 },
      { area: 'Security', department: 'Mining', total: 5, unavailable: 2 },
      { area: 'Logistics', department: 'Engineering', total: 38, unavailable: 8 },
      { area: 'Hyd Fitter', department: 'Engineering', total: 30, unavailable: 5 },
      { area: 'Electricians', department: 'Engineering', total: 35, unavailable: 5 },
      { area: 'Mechanics', department: 'Engineering', total: 15, unavailable: 2 },
      { area: 'Sampling', department: 'Plant', total: 10, unavailable: 1 },
      { area: 'Construction', department: 'Plant', total: 20, unavailable: 1 },
      { area: 'Plant Fitter', department: 'Plant', total: 35, unavailable: 1 },
      { area: 'Central', department: 'Mining', total: 10, unavailable: 0 },
      { area: 'Explosive', department: 'Mining', total: 5, unavailable: 0 },
      { area: 'X Cut', department: 'Mining', total: 5, unavailable: 0 },
      { area: 'Utility TMM', department: 'Engineering', total: 10, unavailable: 0 },
    ],
    breakdowns: [
      { area: 'Boilermaker', tmmNo: 'LD0405', model: 'Maverick Dble Cab STD Load Bin', description: 'Engine commision (No communication between engine and Machine)', remarks: 'Requested assistance from OEM' },
      { area: 'BEV', tmmNo: 'LD0465', model: 'Toyota Hilux DC 2.4 GD6 SR', description: 'Damaged', remarks: 'Remove from U/G' },
      { area: 'Electricians', tmmNo: 'LD0480', model: 'Fermel Maverick 12 Man Trooper', description: 'Engine commision (No communication between engine and Machine)', remarks: 'Requested assistance from OEM' },
      { area: 'Main West', tmmNo: 'LD0520', model: 'Maverick Dble Cab STD Load Bin', description: 'Suspension', remarks: '' },
      { area: 'Mechanics', tmmNo: 'LD0570', model: 'Toyota Land Cruiser 79 4.2D', description: 'U-bolts broken', remarks: 'Waiting for spares' },
      { area: 'Construction', tmmNo: 'LD0613', model: 'Toyota Land Cruiser 79 4.2D', description: 'Starting', remarks: '' },
      { area: 'Boilermaker', tmmNo: 'UV0071', model: 'Fermel Kingcab Flatdeck without Crane', description: 'Replace axle', remarks: '' },
      { area: 'Logistics', tmmNo: 'UV0078', model: 'FERMEL UV80 (LIBERATOR ON/OFF)', description: 'Replace Axle', remarks: 'Waiting for spares' },
      { area: 'Hyd Fitter', tmmNo: 'UV0091', model: 'Fermel Kingcab Flatdeck with Crane', description: 'Hydraulics overheating', remarks: 'Waiting for charge valve spool' },
      { area: 'BEV', tmmNo: 'LD0645', model: 'Toyota Land Cruiser 79 4.2D 8 Man Carrier', description: 'Strata', remarks: '' },
      { area: 'Security', tmmNo: 'LD0595', model: 'Toyota Land Cruiser 79 4.2D', description: 'CWS error', remarks: '' },
      { area: 'Hyd Fitter', tmmNo: 'LD0612', model: 'Toyota Land Cruiser 79 4.2D', description: 'Over charging', remarks: '' },
      { area: 'Logistics', tmmNo: 'UV0082', model: 'FERMEL UV80 (LIBERATOR ON/OFF)', description: 'Oil leak', remarks: 'Engine oil overfilled' },
      { area: 'Logistics', tmmNo: 'UV0045', model: 'Bird flatbed', description: 'Engine Cut off', remarks: '' },
      { area: 'Sampling', tmmNo: 'UV0074', model: 'Fermel Single cab man lift', description: 'Door not closing and diesel filler pipe', remarks: '' },
      { area: 'Mechanics', tmmNo: 'LD0607', model: 'Toyota Land Cruiser 79 4.2D (Lube Veh)', description: 'Nerospec', remarks: '' },
      { area: 'Plant Fitter', tmmNo: 'LD0452', model: 'Maverick Dble Cab STD Load Bin', description: 'Overheating and powerless', remarks: '' },
    ],
    oemAssistanceRequired: 3,
    dailyTracking: [
      { area: 'Main West', mon: { available: 1, total: 2, color: 'yellow' }, tue: { available: 1, total: 2, color: 'yellow' }, wed: { available: 1, total: 2, color: 'yellow' }, thu: { available: 1, total: 2, color: 'yellow' }, fri: { available: 1, total: 2, color: 'yellow' }, weeklyAvg: 50.0 },
      { area: 'Boilermaker', mon: { available: 1, total: 3, color: 'red' }, tue: { available: 1, total: 3, color: 'red' }, wed: { available: 2, total: 3, color: 'yellow' }, thu: { available: 2, total: 3, color: 'yellow' }, fri: { available: 2, total: 3, color: 'yellow' }, weeklyAvg: 53.3 },
      { area: 'BEV', mon: { available: 1, total: 3, color: 'red' }, tue: { available: 2, total: 3, color: 'yellow' }, wed: { available: 2, total: 3, color: 'yellow' }, thu: { available: 2, total: 3, color: 'yellow' }, fri: { available: 2, total: 3, color: 'yellow' }, weeklyAvg: 60.0 },
      { area: 'Security', mon: { available: 1, total: 1, color: 'green' }, tue: { available: 0, total: 1, color: 'red' }, wed: { available: 1, total: 1, color: 'green' }, thu: { available: 1, total: 1, color: 'green' }, fri: { available: 0, total: 1, color: 'red' }, weeklyAvg: 60.0 },
      { area: 'Logistics', mon: { available: 6, total: 7, color: 'yellow' }, tue: { available: 5, total: 7, color: 'yellow' }, wed: { available: 6, total: 8, color: 'yellow' }, thu: { available: 6, total: 8, color: 'yellow' }, fri: { available: 7, total: 8, color: 'yellow' }, weeklyAvg: 78.9 },
      { area: 'Hyd Fitter', mon: { available: 5, total: 6, color: 'yellow' }, tue: { available: 4, total: 6, color: 'yellow' }, wed: { available: 5, total: 6, color: 'yellow' }, thu: { available: 5, total: 6, color: 'yellow' }, fri: { available: 6, total: 6, color: 'green' }, weeklyAvg: 83.3 },
      { area: 'Electricians', mon: { available: 6, total: 7, color: 'yellow' }, tue: { available: 6, total: 7, color: 'yellow' }, wed: { available: 6, total: 7, color: 'yellow' }, thu: { available: 6, total: 7, color: 'yellow' }, fri: { available: 6, total: 7, color: 'yellow' }, weeklyAvg: 85.7 },
      { area: 'Mechanics', mon: { available: 2, total: 3, color: 'yellow' }, tue: { available: 3, total: 3, color: 'green' }, wed: { available: 3, total: 3, color: 'green' }, thu: { available: 2, total: 3, color: 'yellow' }, fri: { available: 3, total: 3, color: 'green' }, weeklyAvg: 86.7 },
      { area: 'Sampling', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 1, total: 2, color: 'yellow' }, thu: { available: 2, total: 2, color: 'green' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 90.0 },
      { area: 'Construction', mon: { available: 3, total: 4, color: 'yellow' }, tue: { available: 4, total: 4, color: 'green' }, wed: { available: 4, total: 4, color: 'green' }, thu: { available: 4, total: 4, color: 'green' }, fri: { available: 4, total: 4, color: 'green' }, weeklyAvg: 95.0 },
      { area: 'Plant Fitter', mon: { available: 7, total: 7, color: 'green' }, tue: { available: 7, total: 7, color: 'green' }, wed: { available: 7, total: 7, color: 'green' }, thu: { available: 7, total: 7, color: 'green' }, fri: { available: 6, total: 7, color: 'yellow' }, weeklyAvg: 97.1 },
      { area: 'Central', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 2, total: 2, color: 'green' }, thu: { available: 2, total: 2, color: 'green' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Explosive', mon: { available: 1, total: 1, color: 'green' }, tue: { available: 1, total: 1, color: 'green' }, wed: { available: 1, total: 1, color: 'green' }, thu: { available: 1, total: 1, color: 'green' }, fri: { available: 1, total: 1, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'X Cut', mon: { available: 1, total: 1, color: 'green' }, tue: { available: 1, total: 1, color: 'green' }, wed: { available: 1, total: 1, color: 'green' }, thu: { available: 1, total: 1, color: 'green' }, fri: { available: 1, total: 1, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Utility TMM', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 2, total: 2, color: 'green' }, thu: { available: 2, total: 2, color: 'green' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Other', mon: { available: 18, total: 18, color: 'green' }, tue: { available: 18, total: 18, color: 'green' }, wed: { available: 18, total: 18, color: 'green' }, thu: { available: 18, total: 18, color: 'green' }, fri: { available: 18, total: 18, color: 'green' }, weeklyAvg: 100.0 },
    ],
  },
  utilitySectionCurrentStatus: {
    totalUnavailable: 7,
    areaStatus: [
      { area: 'Boilermaker', unavailable: 1, details: [
        { unit: 'LD0405', reason: 'Engine commision (No communication between engine and Machine) - OEM assistance requested' },
      ]},
      { area: 'Plant Fitter', unavailable: 1, details: [
        { unit: 'LD0452', reason: 'Overheating and powerless' },
      ]},
      { area: 'BEV', unavailable: 1, details: [
        { unit: 'LD0465', reason: 'Damaged - Remove from U/G' },
      ]},
      { area: 'Electricians', unavailable: 1, details: [
        { unit: 'LD0480', reason: 'Engine commision (No communication between engine and Machine) - OEM assistance requested' },
      ]},
      { area: 'Main West', unavailable: 1, details: [
        { unit: 'LD0520', reason: 'Suspension' },
      ]},
      { area: 'Security', unavailable: 1, details: [
        { unit: 'LD0595', reason: 'Nerospec' },
      ]},
      { area: 'Logistics', unavailable: 1, details: [
        { unit: 'UV0078', reason: 'Replace Axle - Waiting for spares' },
      ]},
    ],
  },
  bevDetail: {
    dt: {
      availability: 76,
      unitAvailability: [
        { id: 'DT0146', availability: 100 },
        { id: 'DT0147', availability: 86.44 },
        { id: 'DT0149', availability: 72.41 },
        { id: 'DT0150', availability: 93.26 },
        { id: 'DT0162', availability: 77.80 },
        { id: 'DT0163', availability: 95.93 },
        { id: 'DT0171', availability: 8.99 },
      ],
      breakdownDetails: [
        { type: 'Mechanical', machineId: 'DT0171', comment: 'A-Frame Failure', hours: 112.35 },
        { type: 'Mechanical', machineId: 'DT0149', comment: 'Gears - 43n11w mw', hours: 26.28 },
        { type: 'Battery', machineId: 'DT0147', comment: 'Flat Battery - Charging', hours: 16.77 },
        { type: 'Battery', machineId: 'DT0147', comment: 'Charging Battery', hours: 15.87 },
        { type: 'Strata', machineId: 'DT0162', comment: 'Machine not moving @ 110S/14W NW', hours: 8.43 },
        { type: 'Strata', machineId: 'DT0162', comment: '@ sat tip nr 1', hours: 6.53 },
        { type: 'Electrical', machineId: 'DT0149', comment: 'Red stop light @ 54s r5', hours: 4.88 },
        { type: 'Auto Electrical', machineId: 'DT0147', comment: 'Inverter error @ wshop', hours: 3.43 },
        { type: 'Auto Electrical', machineId: 'DT0149', comment: 'Engine cut off 54s30w r5', hours: 3.63 },
        { type: 'Electrical', machineId: 'DT0150', comment: 'Invertor error @ old tip 3', hours: 3.37 },
        { type: 'Electrical', machineId: 'DT0150', comment: 'Powerless @ Battery Bay', hours: 3.08 },
        { type: 'Battery', machineId: 'DT0149', comment: 'Changing Battery', hours: 5.90 },
        { type: 'Battery', machineId: 'DT0150', comment: 'Change Battery', hours: 3.95 },
        { type: 'Battery', machineId: 'DT0162', comment: 'Charging Battery - No extra battery', hours: 1.30 },
        { type: 'Electrical', machineId: 'DT0163', comment: 'No contact with modules @ Battery Bay', hours: 1.55 },
      ],
    },
    fl: {
      availability: 98,
      unitAvailability: [
        { id: 'FL0098', availability: 94.05 },
        { id: 'FL0099', availability: 92.15 },
        { id: 'FL0107', availability: 100 },
        { id: 'FL0108', availability: 100 },
        { id: 'FL0112', availability: 99.57 },
        { id: 'FL0113', availability: 99.23 },
      ],
      breakdownDetails: [
        { type: 'Battery', machineId: 'FL0107', comment: 'Charging', hours: 7.68 },
        { type: 'Battery', machineId: 'FL0108', comment: 'Charging', hours: 7.68 },
        { type: 'Boilermaker', machineId: 'FL0112', comment: 'Weld Bucket @ Boilers', hours: 3.92 },
        { type: 'Electrical', machineId: 'FL0098', comment: 'Warning sign on and red stop lamp error @ sat tip nr 1', hours: 2.97 },
        { type: 'Battery', machineId: 'FL0112', comment: 'Charging Battery', hours: 2.37 },
        { type: 'Battery', machineId: 'FL0113', comment: 'Charging', hours: 2.37 },
        { type: 'Electrical', machineId: 'FL0098', comment: 'Red stop warning sign is on @ S2N 9E', hours: 1.57 },
        { type: 'Auto Electrical', machineId: 'FL0098', comment: 'Green Light', hours: 1.17 },
        { type: 'Battery', machineId: 'FL0113', comment: 'Charging Battery', hours: 1.12 },
        { type: 'Mechanical', machineId: 'FL0113', comment: 'Engine oil leak @ Battery Bay', hours: 0.73 },
        { type: 'Battery', machineId: 'FL0113', comment: 'Change Battery', hours: 0.72 },
      ],
    },
  },
};

