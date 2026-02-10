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
  weekNumber: 32,
  dateRange: '30 January - 05 February 2026',
  
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
      { site: 'Gloria', text: 'CV055 chute repairs and hot splice done successfully.' },
      { site: 'Gloria', text: 'Conveyor Watch completed scanning all steel cord belts.' },
      { site: 'Gloria', text: 'TMM availability improved to 89%.' },
      { site: 'N2', text: 'Improved HDs availability for the week.' },
      { site: 'N3', text: 'Good scaler availabilities. Plant upgrade: 55CV01 motor to 45kW enabling 650 tph.' },
    ],
    lowlights: [
      { site: 'Gloria', text: 'Diverter chute stuck between HG and LG silos.' },
      { site: 'Gloria', text: 'CV0051 - 50mm conveyor damaged from side, rolled around tail pulley.' },
      { site: 'Gloria', text: 'DTs availability 75% - Waiting Barloworld to assist.' },
      { site: 'N2', text: 'Still charging two UVs; UV108 repairs in progress, completion moved to 11 Feb.' },
      { site: 'N2', text: 'DT121 still standing with no clear indication of when OEM will assist.' },
      { site: 'N3', text: 'Poor HD/RT availability due to CAS L9 issues.' },
    ],
    emergingIssues: [
      { site: 'Gloria', text: 'Stores stock level raising concern - most spares not available but shows stock on system.' },
      { site: 'N2', text: 'Repetitive breakdown on HD53 on a prop shaft.' },
      { site: 'N2', text: 'Service at drill shop not effective due to consumables shortage.' },
    ],
    priorities: [
      { site: 'Gloria', text: '74N tip liners to be repaired.' },
      { site: 'Gloria', text: 'Conveyor Watch to submit splice condition report.' },
      { site: 'Gloria', text: 'Commission surface compressor.' },
      { site: 'N2', text: 'Drive actions on Engineers action tracker.' },
      { site: 'N2', text: 'Changes on program for UV108 to be done next week.' },
      { site: 'N3', text: 'DT0172 to be commissioned in place of DT0171.' },
    ],
  },
  shaftsAndWinders: {
    production: {
      tonsPerHour: { value: 674, target: 523 },
      rockWinderAvailability: { value: 98.3, target: 95 },
    },
    heal: {
      highlights: [
        'Steady water supply from Vaal Gamagarra Water Supply.',
      ],
      lowlights: [
        'Positions to be filled taking considerable time: 1x WTFitter @ Head-Hunting Stage.',
        'Plumber Contractor not on site due to PP360 related issues.',
        'Power outage experienced during the week.',
      ],
      emergingIssues: [
        'Low compliment of Fitters and Riggers in Mechanical Section putting pressure on the Section.',
        'Massive impact of providing full maintenance of Changehouses of all 3 Shafts.',
        'Additional low compliment due to WTF RFA related issue.',
      ],
      priorities: [
        'Shaft Repair Work with Solrock Team.',
        'Employee Engagement/IDP sessions with SGM.',
        'Shaft Exam with Machinery Inspector.',
        'Shaft Dewatering Pump Test (revised to Feb 2026).',
        'DMPR Instruction on Shafts & Winders.',
        'Prep for Opportunity Maintenance during power outage to repair Cap-Banks.',
      ],
    },
  },
  sites: {
    gloria: {
      name: 'Gloria',
      trendChart: {
        src: '/images/Week32/Gloria Weekly Availability Chart Week 32.png',
        comment: 'Week 32: Overall 88.5% above target. DT 75%. FL 97.4%. HD 93%. RT 90.4%. SR 86.8%.',
      },
      safety: { status: 'Good', details: '' },
      weeklyAverage: { value: 88.5, target: 85 },
      serviceCompliance: { status: 'Issues', details: 'DT 50% (DT0105 deferred). FL 100%. HD 100%. RT 100%. Support 100%. Overall 90%.' },
      availability: [
        { label: 'DT', percentage: 75, target: 85 },
        { label: 'FL', percentage: 97.4, target: 85 },
        { label: 'HD', percentage: 93, target: 85 },
        { label: 'RT', percentage: 90.4, target: 85 },
        { label: 'SR', percentage: 86.8, target: 85 }
      ],
      keyBreakdowns: [
        { equipment: 'DT', details: ['DT0174 - Not selecting gears (persistent).', 'DT0105 - Nerospec.'] },
      ],
    },
    n2: {
      name: 'Nchwaning 2',
      trendChart: {
        src: '/images/Week32/N2 Weekly Availability Chart Week 32.png',
        comment: 'Week 32: Data pending - chart shows Week 31 snapshot. Overall 82.31%. DT 70.56%. FL 89.37%. HD 78.54%. RT 92.43%. SR 86.55%.',
      },
      safety: { status: 'Good', details: '' },
      weeklyAverage: { value: 82.31, target: 85 },
      serviceCompliance: { status: 'Issues', details: 'Week 32 compliance data pending.' },
      availability: [
        { label: 'DT', percentage: 70.56, target: 85 },
        { label: 'FL', percentage: 89.37, target: 85 },
        { label: 'HD', percentage: 78.54, target: 85 },
        { label: 'RT', percentage: 92.43, target: 85 },
        { label: 'SR', percentage: 86.55, target: 85 }
      ],
      keyBreakdowns: [
        { equipment: 'DT', details: ['DT121 still standing - OEM (Barloworld) assistance not confirmed.'] },
        { equipment: 'HD', details: ['HD53 - Repetitive prop shaft breakdown.'] },
      ],
    },
    n3: {
      name: 'Nchwaning 3',
      trendChart: {
        src: '/images/Week32/N3 Weekly Availability Chart Week 32.png',
        comment: 'Week 32: Overall 79.8% below target. DT-D 81%. FL-D 55%. HD 78.8%. RT 80.8%. SR 93%.',
      },
      safety: { status: 'Good', details: '' },
      weeklyAverage: { value: 79.8, target: 85 },
      serviceCompliance: { status: 'Issues', details: 'FL 40% (2/5 planned). RT 60% (3/5). All other fleets 100%.' },
      availability: [
        { label: 'DT-Diesel', percentage: 81, target: 85 },
        { label: 'FL-Diesel', percentage: 55, target: 85 },
        { label: 'HD', percentage: 78.8, target: 85 },
        { label: 'RT', percentage: 80.8, target: 85 },
        { label: 'SR', percentage: 93, target: 85 }
      ],
      keyBreakdowns: [
        { equipment: 'FL-Diesel', details: ['FL-Diesel 55% - FL101 steering problem. FL91 Strata/no modular contact. FL103 not starting.'] },
        { equipment: 'HD', details: ['HD 78.8% - HD49 airco motor leak. HD52 boom guards active. HD62 booms not drilling. HD51 no diesel.'] },
        { equipment: 'DT-Diesel', details: ['DT-Diesel 81% - DT148 aircon/mainswitch. DT131 gears/strata. DT119 gears.'] },
        { equipment: 'RT', details: ['RT 80.8% - RT49 turning device. RT55 damaged. RT58 drifter oil leak. RT51 sprocket.'] },
      ],
    }
  },
  bev: {
    name: 'BEV Fleet',
    availability: [
      { label: 'DT BEV', value: 78, target: 85 },
      { label: 'FL BEV', value: 98, target: 85 }
    ],
    serviceCompliance: [
      { label: 'DT BEV', value: null },
      { label: 'FL BEV', value: null }
    ],
    breakdowns: [
      {
        equipment: 'DT BEV',
        details: [
          'DT0171 A-frame failure (16.3% avail) - 60-day lead time, expediting to fly in.',
          'DT0149 gearbox failure + electrical faults (76.3% avail). DT0162 STRATA breakdowns (72.3% avail).',
          'DT0150 Strata + electrical (94.2% avail). DT0146 isolation fault on HVIL cables (Tue).',
        ],
      },
      {
        equipment: 'FL BEV',
        details: [
          'FL BEV fleet performing well with 98% average availability.',
          'FL0112 HVIL fault (Sun, 23.5 hrs - resolved). FL0098 boilermaker half arrows (Mon).',
        ],
      },
    ],
    batteryThemes: [
      'Battery: 10 ST14-B4 packs (1.6 ratio), 12 MT42-B5 packs. Charger stops investigated.',
      'Critical: Aux motor spline grease campaign (only DT147 done). Post 7 CCS cables pending.',
      'CAS L9: Lab scale tests with new software. MH4.0 to be loaded on BEV machines.',
      '3 batteries down: VPY-00088 safe state (14d), VPX-00017 (12d), VPX-00028 pumps (4d).',
    ],
  },
  utility: {
    areas: [
      { name: 'Boilermaker', availability: 50.0, total: 6, available: 3 },
      { name: 'BEV', availability: 66.7, total: 6, available: 4 },
      { name: 'Main West', availability: 75.0, total: 4, available: 3 },
      { name: 'Logistics', availability: 80.0, total: 15, available: 12 },
      { name: 'Hyd Fitter', availability: 83.3, total: 12, available: 10 },
      { name: 'Mechanics', availability: 83.3, total: 6, available: 5 },
      { name: 'Electricians', availability: 85.7, total: 14, available: 12 },
      { name: 'Plant Fitter', availability: 92.9, total: 14, available: 13 },
      { name: 'Central', availability: 100.0, total: 4, available: 4 },
      { name: 'Explosive', availability: 100.0, total: 2, available: 2 },
      { name: 'X Cut', availability: 100.0, total: 2, available: 2 },
      { name: 'Utility TMM', availability: 100.0, total: 4, available: 4 },
    ],
  },
  utilitySection: {
    fleetStatus: { available: 60, unavailable: 11 },
    areaSummary: [
      { area: 'Boilermaker', department: 'Engineering', total: 6, unavailable: 3 },
      { area: 'BEV', department: 'Engineering', total: 6, unavailable: 2 },
      { area: 'Main West', department: 'Mining', total: 4, unavailable: 1 },
      { area: 'Logistics', department: 'Engineering', total: 15, unavailable: 3 },
      { area: 'Hyd Fitter', department: 'Engineering', total: 12, unavailable: 2 },
      { area: 'Electricians', department: 'Engineering', total: 14, unavailable: 2 },
      { area: 'Mechanics', department: 'Engineering', total: 6, unavailable: 1 },
      { area: 'Plant Fitter', department: 'Plant', total: 14, unavailable: 1 },
      { area: 'Central', department: 'Mining', total: 4, unavailable: 0 },
      { area: 'Explosive', department: 'Mining', total: 2, unavailable: 0 },
      { area: 'X Cut', department: 'Mining', total: 2, unavailable: 0 },
      { area: 'Utility TMM', department: 'Engineering', total: 4, unavailable: 0 },
    ],
    breakdowns: [
      { area: 'Boilermaker', tmmNo: 'LD0405', model: 'Maverick Dble Cab STD Load Bin', description: 'Engine commission (No communication between engine and Machine)', remarks: 'Requested assistance from OEM' },
      { area: 'BEV', tmmNo: 'LD0465', model: 'Toyota Hilux DC 2.4 GD6 SR', description: 'Damaged', remarks: 'Remove from U/G' },
      { area: 'Electricians', tmmNo: 'LD0480', model: 'Fermel Maverick 12 Man Trooper', description: 'Engine commission (No communication between engine and Machine)', remarks: 'Requested assistance from OEM' },
      { area: 'Main West', tmmNo: 'LD0520', model: 'Maverick Dble Cab STD Load Bin', description: 'Suspension', remarks: '' },
      { area: 'Plant Fitter', tmmNo: 'LD0452', model: 'Maverick Dble Cab STD Load Bin', description: 'Overheating and powerless', remarks: '' },
      { area: 'Logistics', tmmNo: 'UV0078', model: 'FERMEL UV80 (LIBERATOR ON/OFF)', description: 'Replace Axle', remarks: 'Waiting for spares' },
      { area: 'Hyd Fitter', tmmNo: 'UV0091', model: 'Fermel Kingcab Flatdeck with Crane', description: 'Hydraulics overheating', remarks: 'Waiting for charge valve spool' },
      { area: 'BEV', tmmNo: 'LD0645', model: 'Toyota Land Cruiser 79 4.2D 8 Man Carrier', description: 'Strata', remarks: '' },
      { area: 'Hyd Fitter', tmmNo: 'LD0612', model: 'Toyota Land Cruiser 79 4.2D', description: 'Over charging', remarks: '' },
      { area: 'Logistics', tmmNo: 'UV0082', model: 'FERMEL UV80 (LIBERATOR ON/OFF)', description: 'Oil leak', remarks: 'Engine oil overfilled' },
      { area: 'Logistics', tmmNo: 'UV0045', model: 'Bird flatbed', description: 'Engine Cut off', remarks: '' },
      { area: 'Mechanics', tmmNo: 'LD0607', model: 'Toyota Land Cruiser 79 4.2D (Lube Veh)', description: 'Nerospec', remarks: '' },
    ],
    oemAssistanceRequired: 2,
    dailyTracking: [
      { area: 'Boilermaker', mon: { available: 2, total: 3, color: 'yellow' }, tue: { available: 2, total: 3, color: 'yellow' }, wed: { available: 2, total: 3, color: 'yellow' }, thu: { available: 2, total: 3, color: 'yellow' }, fri: { available: 2, total: 3, color: 'yellow' }, weeklyAvg: 66.7 },
      { area: 'BEV', mon: { available: 1, total: 3, color: 'red' }, tue: { available: 2, total: 3, color: 'yellow' }, wed: { available: 2, total: 3, color: 'yellow' }, thu: { available: 2, total: 3, color: 'yellow' }, fri: { available: 2, total: 3, color: 'yellow' }, weeklyAvg: 60.0 },
      { area: 'Main West', mon: { available: 1, total: 2, color: 'yellow' }, tue: { available: 1, total: 2, color: 'yellow' }, wed: { available: 1, total: 2, color: 'yellow' }, thu: { available: 1, total: 2, color: 'yellow' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 75.0 },
      { area: 'Logistics', mon: { available: 5, total: 8, color: 'yellow' }, tue: { available: 6, total: 8, color: 'yellow' }, wed: { available: 6, total: 8, color: 'yellow' }, thu: { available: 6, total: 8, color: 'yellow' }, fri: { available: 6, total: 7, color: 'yellow' }, weeklyAvg: 74.4 },
      { area: 'Hyd Fitter', mon: { available: 4, total: 6, color: 'yellow' }, tue: { available: 5, total: 6, color: 'yellow' }, wed: { available: 5, total: 6, color: 'yellow' }, thu: { available: 5, total: 6, color: 'yellow' }, fri: { available: 5, total: 6, color: 'yellow' }, weeklyAvg: 80.0 },
      { area: 'Electricians', mon: { available: 5, total: 7, color: 'yellow' }, tue: { available: 6, total: 7, color: 'yellow' }, wed: { available: 6, total: 7, color: 'yellow' }, thu: { available: 6, total: 7, color: 'yellow' }, fri: { available: 6, total: 7, color: 'yellow' }, weeklyAvg: 82.9 },
      { area: 'Mechanics', mon: { available: 2, total: 3, color: 'yellow' }, tue: { available: 2, total: 3, color: 'yellow' }, wed: { available: 2, total: 3, color: 'yellow' }, thu: { available: 2, total: 3, color: 'yellow' }, fri: { available: 3, total: 3, color: 'green' }, weeklyAvg: 80.0 },
      { area: 'Plant Fitter', mon: { available: 6, total: 7, color: 'yellow' }, tue: { available: 7, total: 7, color: 'green' }, wed: { available: 7, total: 7, color: 'green' }, thu: { available: 7, total: 7, color: 'green' }, fri: { available: 7, total: 7, color: 'green' }, weeklyAvg: 97.1 },
      { area: 'Central', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 2, total: 2, color: 'green' }, thu: { available: 2, total: 2, color: 'green' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Explosive', mon: { available: 1, total: 1, color: 'green' }, tue: { available: 1, total: 1, color: 'green' }, wed: { available: 1, total: 1, color: 'green' }, thu: { available: 1, total: 1, color: 'green' }, fri: { available: 1, total: 1, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'X Cut', mon: { available: 1, total: 1, color: 'green' }, tue: { available: 1, total: 1, color: 'green' }, wed: { available: 1, total: 1, color: 'green' }, thu: { available: 1, total: 1, color: 'green' }, fri: { available: 1, total: 1, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Utility TMM', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 2, total: 2, color: 'green' }, thu: { available: 2, total: 2, color: 'green' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 100.0 },
    ],
  },
  utilitySectionCurrentStatus: {
    totalUnavailable: 8,
    areaStatus: [
      { area: 'Boilermaker', unavailable: 1, details: [
        { unit: 'LD0405', reason: 'Engine commission (No communication between engine and Machine) - OEM assistance requested' },
      ]},
      { area: 'Plant Fitter', unavailable: 1, details: [
        { unit: 'LD0452', reason: 'Overheating and powerless' },
      ]},
      { area: 'BEV', unavailable: 1, details: [
        { unit: 'LD0465', reason: 'Damaged - Remove from U/G' },
      ]},
      { area: 'Electricians', unavailable: 1, details: [
        { unit: 'LD0480', reason: 'Engine commission (No communication between engine and Machine) - OEM assistance requested' },
      ]},
      { area: 'Main West', unavailable: 1, details: [
        { unit: 'LD0520', reason: 'Suspension' },
      ]},
      { area: 'Logistics', unavailable: 1, details: [
        { unit: 'UV0078', reason: 'Replace Axle - Waiting for spares' },
      ]},
      { area: 'Hyd Fitter', unavailable: 1, details: [
        { unit: 'UV0091', reason: 'Hydraulics overheating - Waiting for charge valve spool' },
      ]},
      { area: 'Mechanics', unavailable: 1, details: [
        { unit: 'LD0607', reason: 'Nerospec' },
      ]},
    ],
  },
  bevDetail: {
    dt: {
      availability: 78,
      unitAvailability: [
        { id: 'DT0146', availability: 100 },
        { id: 'DT0147', availability: 93.24 },
        { id: 'DT0149', availability: 76.25 },
        { id: 'DT0150', availability: 94.20 },
        { id: 'DT0162', availability: 72.34 },
        { id: 'DT0163', availability: 96.49 },
        { id: 'DT0171', availability: 16.27 },
      ],
      breakdownDetails: [
        { type: 'Mechanical', machineId: 'DT0171', comment: 'A-Frame Failure (ongoing - 60 day lead time)', hours: 112.30 },
        { type: 'Mechanical', machineId: 'DT0149', comment: 'Gearbox failure @ 43N11W', hours: 26.30 },
        { type: 'Electrical', machineId: 'DT0149', comment: 'No feedback (Thu)', hours: 20.47 },
        { type: 'Strata', machineId: 'DT0162', comment: 'Machine not moving', hours: 8.40 },
        { type: 'Electrical', machineId: 'DT0150', comment: 'No feedback + Strata (Wed)', hours: 8.70 },
        { type: 'Strata', machineId: 'DT0162', comment: '@ sat tip nr 1', hours: 6.50 },
        { type: 'Auto Electrical', machineId: 'DT0149', comment: 'Isolation fault battery pack VPX-00036', hours: 5.68 },
        { type: 'Electrical', machineId: 'DT0150', comment: 'Strata (Tue)', hours: 3.90 },
        { type: 'Auto Electrical', machineId: 'DT0147', comment: 'No feedback (various)', hours: 3.50 },
        { type: 'Electrical', machineId: 'DT0146', comment: 'Isolation fault - HVIL cables (Tue)', hours: 2.96 },
        { type: 'Electrical', machineId: 'DT0162', comment: 'No feedback (Tue)', hours: 2.68 },
        { type: 'Electrical', machineId: 'DT0149', comment: 'Wipers / Wiper blade replaced', hours: 2.73 },
        { type: 'Mechanical', machineId: 'DT0162', comment: 'Replaced hydraulic hose (Sat)', hours: 58.43 },
        { type: 'Mechanical', machineId: 'DT0147', comment: 'No feedback (Sat)', hours: 2.13 },
      ],
    },
    fl: {
      availability: 98,
      unitAvailability: [
        { id: 'FL0098', availability: 94.88 },
        { id: 'FL0099', availability: 97.26 },
        { id: 'FL0107', availability: 100 },
        { id: 'FL0108', availability: 100 },
        { id: 'FL0112', availability: 97.02 },
        { id: 'FL0113', availability: 99.34 },
      ],
      breakdownDetails: [
        { type: 'Boilermaker', machineId: 'FL0098', comment: 'Half arrows (Mon)', hours: 33.72 },
        { type: 'Mechanical', machineId: 'FL0112', comment: 'HVIL fault, adjusted switch in HV box (Sun)', hours: 23.57 },
        { type: 'Electrical', machineId: 'FL0113', comment: 'No feedback (Thu)', hours: 8.67 },
        { type: 'Electrical', machineId: 'FL0098', comment: 'No feedback (Sun)', hours: 4.05 },
        { type: 'Mechanical', machineId: 'FL0099', comment: 'No feedback (Sat)', hours: 3.05 },
        { type: '3rd Party', machineId: 'FL0099', comment: 'Petroman (Tue)', hours: 2.23 },
        { type: 'Auto Electrical', machineId: 'FL0098', comment: 'No feedback (Sat)', hours: 1.17 },
        { type: 'Strata', machineId: 'FL0112', comment: 'Strata (Wed)', hours: 0.50 },
        { type: 'Strata', machineId: 'FL0108', comment: 'Strata (Wed)', hours: 0.42 },
      ],
    },
  },
};

