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
  footerNote?: string;
}

export const reportData: ReportData = {
  weekNumber: 36,
  dateRange: '02 Mar - 06 Mar 2026',
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
      { site: 'N3', text: 'Successfully hosted the ARM leadership at the BEV workshops' },
      { site: 'N2', text: 'The average availability is above 85% for the week on all TMMs' },
      { site: 'N2', text: 'Commissioned a new load FL0122 for capital development' },
      { site: 'Gloria', text: 'Zennith serviced three compressors' },
      { site: 'Gloria', text: 'Good improvement in CPS level 9' },
    ],
    lowlights: [
      { site: 'N3', text: 'LTI Case – Index Finger fracture' },
      { site: 'N3', text: 'Overall sustained machines availability' },
      { site: 'N3', text: 'Overall work attendance below par' },
      { site: 'N2', text: 'Schematic diagram on SR46 is not as the actual circuit' },
      { site: 'Gloria', text: 'Experiencing CV0052 safe line breakdowns resulting to remove guard limit switch and install locks' },
      { site: 'Gloria', text: 'DTs availability was 79% - DT0174 Powelses, DT0152 Engine cut off' },
      { site: 'Gloria', text: 'FLs availability was 77% - FL0119 No turbo available, FL0064 Overheating' },
    ],
    emergingIssues: [
      { site: 'N3', text: 'CAS L9: LD's and UV's impacting productivity (Reliability of system)' },
      { site: 'N3', text: 'Water management and balancing of the system at mining areas' },
      { site: 'N2', text: 'OEM companies are not consistent in keeping PP360 compliant' },
      { site: 'N2', text: 'DT121 and 122 indicated possible fuel dilution on Perfect Filtration report' },
    ],
    priorities: [
      { site: 'N3', text: 'Complete GES and Forman's appointments' },
      { site: 'N2', text: 'Enforce compliance through action plans' },
      { site: 'N2', text: 'Align the team on factors affecting production' },
      { site: 'Gloria', text: 'CV0088 and 51H Conveyor replacement' },
      { site: 'Gloria', text: 'UV0129 axle to be delivered and replaced' },
    ],
  },
  shaftsAndWinders: {
    tonsPerHour: { value: 950, target: 1000 },
    rwAvailability: { value: 95, target: 95 },
    highlights: ['Zero safety incidents across all shafts this week.', 'Nch2 support equipment at 94.7% availability.'],
    lowlights: ['Nch2 ROM variance MTD: -8,046t', 'Nch2 Product variance MTD: -10,423t'],
    emergingIssues: ['Charging UV capacity issues impacting operations.', 'OEM support skill gaps identified.'],
    priorities: ['Address DT121 standing for 3+ weeks.', 'Improve N3 FL Diesel availability (75%).'],
  },
  sites: {
    nchwaning3: {
      name: 'Nchwaning 3',
      trendChart: { src: '/images/N3 Weekly availability chart.png', comment: '"Fleet average at 83%. DT at 76%, FL at 77%, HD at 87%, RT at 87%, SR at 78%."' },
      safety: { status: 'Concern', details: 'LTI - Finger injury while moving a KSB pump' },
      weeklyAverage: { value: 83, target: 85 },
      serviceCompliance: { status: 'Issues', details: 'DT Diesel: 50%, SR: 60%, All others: 100%' },
      availability: [
          { label: 'DT', percentage: 76, target: 85 },
          { label: 'FL', percentage: 77, target: 85 },
          { label: 'HD', percentage: 87, target: 85 },
          { label: 'RT', percentage: 87, target: 85 },
          { label: 'SR', percentage: 78, target: 85 },
      ],
      breakdowns: [
          { category: 'Dump Trucks (76%)', details: 'DT148 No Aircon/Mainswitch, DT131 Transmission Casing Cracked, DT118 Aircon' },
          { category: 'Front Loaders (77%)', details: 'FL103 Starting Problem, FL101 Steering problem/Fire Supp/Bucket Control' },
          { category: 'Road Trucks (87%)', details: 'RT47 Radiator, RT51 Compressor' },
          { category: 'Scalers (78%)', details: 'SR35 Engine Smoke, SR26 Boom Cylinder Broken, SR51 Fire Supp, SR38 Boom Nuts Broken' },
      ],
      footerNote: 'Combined DT availability (Diesel 72.6% + BEV 82.7%) = 78%. Combined FL (Diesel 65.2% + BEV 82.7%) = 74%. MTD Fleet Average: 82.57%',
    },
    nchwaning2: {
        name: 'Nchwaning 2',
        trendChart: { src: '/images/N2 Weekly availability chart.png', comment: '"All equipment types above 85% target. Fleet average at 88%."' },
        safety: { status: 'Good', details: 'Zero incidents this week' },
        weeklyAverage: { value: 88.09, target: 85 },
        serviceCompliance: { status: 'Issues', details: 'FL: 100%, HD: 100%, SR: 100%, RT: 75%, Support: 67%' },
        availability: [
            { label: 'DT', percentage: 80.73, target: 85 },
            { label: 'FL', percentage: 91.12, target: 85 },
            { label: 'HD', percentage: 80.90, target: 85 },
            { label: 'RT', percentage: 96.10, target: 85 },
            { label: 'SR', percentage: 94.68, target: 85 },
        ],
        breakdowns: [
            { category: 'RT (75%)', details: 'RT compliance at 75% - LD0591 not available, will service tomorrow' },
            { category: 'Support Equipment (67%)', details: 'Support equipment compliance at 67% - Unit 19.18.15' },
        ],
    },
    gloria: {
        name: 'Gloria',
        trendChart: { src: '/images/Gloria Weekly availability Chart.png', comment: '"Fleet average at 87%. DT at 77%, FL at 86%, HD at 93%, RT at 93%, SR at 96%."' },
        safety: { status: 'Good', details: 'Zero incidents this week' },
        weeklyAverage: { value: 87, target: 85 },
        serviceCompliance: { status: 'Issues', details: 'FL: 100%, SR: 100%, Support: 100%, DT: 0%, HD: 50%, RT: 67%' },
        availability: [
            { label: 'DT', percentage: 77, target: 85 },
            { label: 'FL', percentage: 86, target: 85 },
            { label: 'HD', percentage: 93, target: 85 },
            { label: 'RT', percentage: 93, target: 85 },
            { label: 'SR', percentage: 96, target: 85 },
        ],
        breakdowns: [
          { category: 'Dump Trucks (77%)', details: 'DT Diesel at 77%' },
          { category: 'Front Loaders (86%)', details: 'FL0093 Steering' },
        ],
        footerNote: 'MTD Fleet Average: 87%. CV0052 safe line breakdowns continue.',
    },
  },
  bev: {
    availability: [
        { label: 'DT BEV', value: 83, target: 85 },
        { label: 'FL BEV', value: 83, target: 85 },
    ],
    serviceCompliance: [
        { label: 'DT BEV', value: 100 },
        { label: 'FL BEV', value: 0 },
    ],
    breakdowns: [
        { equipment: 'DT BEV (83%)', details: ['DT0147: Inverter error @ battery bay (24.38 hrs)', 'DT0149: No contact to modules (23.82 hrs)', 'DT0172: HVIL fault @ 13N (9.50 hrs)', 'DT0150: Battery insulation fault (21.01 hrs)'] },
        { equipment: 'FL BEV (83%)', details: ['FL0098: Red stop lamp & battery not connecting (28.97 hrs)', 'FL0112: Red stop lamp & oil leak (12.22 hrs)', 'FL0113: Battery not connecting (10.51 hrs)', 'FL0107: Gears faulty & battery issues (5.61 hrs)'] },
    ],
    batteryThemes: [
      'DT BEV at 83% - DT0147 inverter error (24hrs), DT0149 no contact to modules (24hrs), DT0150 battery insulation fault (21hrs), DT0172 HVIL fault (10hrs).',
      'FL BEV at 83% - FL0098 red stop lamp and battery connection issues (29hrs), FL0112 red stop lamp and oil leak (12hrs), FL0113 battery not connecting (11hrs).',
      'Battery operational delays: Multiple units experiencing flat battery and charging delays - DT0146, DT0149, DT0150, DT0162, DT0163 all had battery change/charging delays.',
      'Technical issues: HVIL terminology correction - use HVIL (High Voltage Interlock Loop) not HBIL. Battery connection issues remain primary concern for FL fleet.'
    ],
  },
  utilitySection: {
    fleetStatus: { available: 62, unavailable: 3 },
    areaSummary: [
      { area: 'Maverick Double cab', department: 'Operations', total: 9, unavailable: 2 },
      { area: 'Toyota Landcruiser Minespec', department: 'Operations', total: 33, unavailable: 1 },
      { area: 'ROROs', department: 'Operations', total: 5, unavailable: 1 },
      { area: 'Boilermaker', department: 'Maintenance', total: 3, unavailable: 1 },
      { area: 'Plant Fitter', department: 'Maintenance', total: 7, unavailable: 1 },
      { area: 'Logistics', department: 'Operations', total: 7, unavailable: 1 },
    ],
    breakdowns: [
      { area: 'Maverick Double cab', tmmNo: 'LD0520, LD0572', model: 'Maverick', description: 'Weekly Avg 77.8%', remarks: 'LD0520: Not Starting/Warning Signs (Tue-Wed), LD0572: Tag box damaged (Tue-Wed)' },
      { area: 'Boilermaker', tmmNo: 'LD0405', model: 'Maverick', description: 'Weekly Avg 66.7%', remarks: 'Engine commission - No communication between engine and machine (All week)' },
      { area: 'ROROs', tmmNo: 'UV0078, UV0081, UV0116', model: 'RORO', description: 'Weekly Avg 72%', remarks: 'UV0078: Rear axle/Steering cylinder (Mon-Fri), UV0081: Not selecting gears (Wed), UV0116: Front axle (Tue-Wed)' },
    ],
    oemAssistanceRequired: 1,
    dailyTracking: [
      { area: 'Main West', mon: { available: 1, total: 2, color: 'yellow' }, tue: { available: 1, total: 2, color: 'yellow' }, wed: { available: 1, total: 2, color: 'yellow' }, thu: { available: 1, total: 2, color: 'yellow' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 70.0 },
      { area: 'Boilermaker', mon: { available: 2, total: 3, color: 'yellow' }, tue: { available: 2, total: 3, color: 'yellow' }, wed: { available: 2, total: 3, color: 'yellow' }, thu: { available: 2, total: 3, color: 'yellow' }, fri: { available: 2, total: 3, color: 'yellow' }, weeklyAvg: 66.7 },
      { area: 'BEV', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 1, total: 2, color: 'yellow' }, thu: { available: 1, total: 2, color: 'yellow' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 80.0 },
      { area: 'Security', mon: { available: 1, total: 1, color: 'green' }, tue: { available: 1, total: 1, color: 'green' }, wed: { available: 1, total: 1, color: 'green' }, thu: { available: 1, total: 1, color: 'green' }, fri: { available: 1, total: 1, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Logistics', mon: { available: 6, total: 7, color: 'yellow' }, tue: { available: 6, total: 7, color: 'yellow' }, wed: { available: 6, total: 7, color: 'yellow' }, thu: { available: 6, total: 7, color: 'yellow' }, fri: { available: 6, total: 7, color: 'yellow' }, weeklyAvg: 85.7 },
      { area: 'Hyd Fitter', mon: { available: 6, total: 6, color: 'green' }, tue: { available: 6, total: 6, color: 'green' }, wed: { available: 6, total: 6, color: 'green' }, thu: { available: 6, total: 6, color: 'green' }, fri: { available: 6, total: 6, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Electricians', mon: { available: 3, total: 4, color: 'yellow' }, tue: { available: 4, total: 4, color: 'green' }, wed: { available: 4, total: 4, color: 'green' }, thu: { available: 4, total: 4, color: 'green' }, fri: { available: 4, total: 4, color: 'green' }, weeklyAvg: 95.0 },
      { area: 'Mechanics', mon: { available: 3, total: 3, color: 'green' }, tue: { available: 3, total: 3, color: 'green' }, wed: { available: 3, total: 3, color: 'green' }, thu: { available: 3, total: 3, color: 'green' }, fri: { available: 3, total: 3, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Sampling', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 2, total: 2, color: 'green' }, thu: { available: 2, total: 2, color: 'green' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Construction', mon: { available: 3, total: 3, color: 'green' }, tue: { available: 3, total: 3, color: 'green' }, wed: { available: 3, total: 3, color: 'green' }, thu: { available: 3, total: 3, color: 'green' }, fri: { available: 3, total: 3, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Plant Fitter', mon: { available: 6, total: 7, color: 'yellow' }, tue: { available: 6, total: 7, color: 'yellow' }, wed: { available: 6, total: 7, color: 'yellow' }, thu: { available: 6, total: 7, color: 'yellow' }, fri: { available: 6, total: 7, color: 'yellow' }, weeklyAvg: 85.7 },
      { area: 'Central', mon: { available: 1, total: 2, color: 'yellow' }, tue: { available: 1, total: 2, color: 'yellow' }, wed: { available: 1, total: 2, color: 'yellow' }, thu: { available: 1, total: 2, color: 'yellow' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 70.0 },
      { area: 'Explosive', mon: { available: 1, total: 1, color: 'green' }, tue: { available: 1, total: 1, color: 'green' }, wed: { available: 1, total: 1, color: 'green' }, thu: { available: 1, total: 1, color: 'green' }, fri: { available: 1, total: 1, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'X Cut', mon: { available: 1, total: 1, color: 'green' }, tue: { available: 1, total: 1, color: 'green' }, wed: { available: 1, total: 1, color: 'green' }, thu: { available: 1, total: 1, color: 'green' }, fri: { available: 1, total: 1, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Utility TMM', mon: { available: 2, total: 2, color: 'green' }, tue: { available: 2, total: 2, color: 'green' }, wed: { available: 2, total: 2, color: 'green' }, thu: { available: 2, total: 2, color: 'green' }, fri: { available: 2, total: 2, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'Other', mon: { available: 18, total: 18, color: 'green' }, tue: { available: 18, total: 18, color: 'green' }, wed: { available: 18, total: 18, color: 'green' }, thu: { available: 18, total: 18, color: 'green' }, fri: { available: 18, total: 18, color: 'green' }, weeklyAvg: 100.0 },
      { area: 'TOTAL', mon: { available: 60, total: 66, color: 'green' }, tue: { available: 62, total: 66, color: 'green' }, wed: { available: 58, total: 66, color: 'yellow' }, thu: { available: 58, total: 66, color: 'yellow' }, fri: { available: 63, total: 66, color: 'green' }, weeklyAvg: 89.1 },
    ],
  },
  utilitySectionCurrentStatus: {
    totalUnavailable: 3,
    areaStatus: [
      { area: 'Boilermaker', unavailable: 1, details: [{ unit: 'LD0405', reason: 'Engine commission (No communication between engine and machine) - No solution from Fermel (Deutz EMR4 upgrade to EMR5)' }] },
      { area: 'Plant Fitter', unavailable: 1, details: [{ unit: 'LD0620', reason: 'Strata (Surface decline & No access to the gate, its locked) - (SOS - EOS)' }] },
      { area: 'Logistics', unavailable: 1, details: [{ unit: 'UV0078', reason: 'Rear axle - (SOS - EOS)' }] },
    ],
  },
};