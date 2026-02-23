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
  weekNumber: 34,
  dateRange: '16 - 20 February 2026',
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
        { site: 'N2', text: 'The average TMM availability improved.' },
        { site: 'N2', text: 'All the emulsion UVs are back to production' },
        { site: 'N3', text: 'Scaler 49 and 51 delivered to site.' },
        { site: 'GLA', text: 'Conveyor Watch submitted the splice condition report and is looking good only small damages need to be fixed' },
        { site: 'GLA', text: 'Scaler audits on brakes after incident in NCHIII – all brakes were operational and good condition' },
    ],
    lowlights: [
        { site: 'N2', text: 'The UV 137 is switched back to Level 7' },
        { site: 'N2', text: 'Increased breakdowns on utility LDOs.' },
        { site: 'N3', text: 'SR0028 brakes failure, found on inspection' },
        { site: 'N3', text: 'Poor availabilities of DT, FL and HD' },
        { site: 'GLA', text: 'Shift Foreman stopped the 74N plant due to non compliance' },
        { site: 'GLA', text: 'DT0106 on breakdown relating to Nerospec' },
    ],
    emergingIssues: [
        { site: 'N2', text: 'Electrical reticulation network is getting overloaded' },
        { site: 'N3', text: 'Spares for S2 and Scalers (engines)' },
        { site: 'N3', text: 'Roadway conditions' },
        { site: 'GLA', text: 'UV 0068 Emulsion unit axle to be replace nothing available at the store' },
        { site: 'GLA', text: 'Commission surface compressor – Challenge 4 inch from the compressor to 2-inch line in the shaft and keep tripping the compressor' },
    ],
    priorities: [
        { site: 'N2', text: 'Encourage team effort through VFL and findings.' },
        { site: 'N3', text: 'Vehicle allocation' },
        { site: 'N3', text: 'Roadway maintenance strategy' },
        { site: 'N3', text: 'DT0148 and DT0145 repair (Barlows)' },
        { site: 'N3', text: 'Appointment of GES and mech foreman' },
        { site: 'GLA', text: '74N tip liners to be repairs' },
        { site: 'GLA', text: 'CV0053 to do hot splice' },
        { site: 'GLA', text: 'Remove axle from UV0128 to UV0068' },
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
      trendChart: { src: '/images/N3 Weekly availability chart.png', comment: '"SR0028 brakes failure incident. Poor DT, FL, HD availability. Decline conveyor damage requires 9m splice."' },
      safety: { status: 'Good', details: 'Zero incidents this week' },
      weeklyAverage: { value: 79, target: 85 },
      serviceCompliance: { status: 'Issues', details: 'SR at 60% (SR0030 Scraped, SR0035 Waiting for engine), Support Equip at 66.7%' },
      availability: [
          { label: 'DT', percentage: 78, target: 85 },
          { label: 'FL', percentage: 72, target: 85 },
          { label: 'HD', percentage: 79, target: 85 },
          { label: 'RT', percentage: 85, target: 85 },
          { label: 'SR', percentage: 81, target: 85 },
      ],
      breakdowns: [
          { category: 'Dump Trucks (78%)', details: 'DT148: Aircon/Main switch (spares), DT145: Gears, DT164: Aircon, DT172: HVLI fault' },
          { category: 'Front Loaders (72%)', details: 'FL101: Transmission, FL103: Not starting' },
          { category: 'Hydraulic Drills (79%)', details: 'HD55: Window damage, HD49: Bosch pump, HD62: Bosch pump, HD61: Cable damage' },
      ],
      footerNote: 'HD and Scaler availability recovered well over the weekend. 2x New Scalers to be commissioned today. Focus is on getting OEM assistance for FL103, DT145 and DT148 to be resolved this week. FL101 transmission will be completed this week by Mech Workshop team.',
    },
    nchwaning2: {
        name: 'Nchwaning 2',
        trendChart: { src: '/images/N2 Weekly availability chart.png', comment: '"Zero safety incidents this week. TMM availability improved. All emulsion UVs back to production."' },
        safety: { status: 'Good', details: 'Zero incidents this week' },
        weeklyAverage: { value: 87.65, target: 85 },
        serviceCompliance: { status: 'Good', details: 'DT: 100%, FL: 100%, HD: 75%, RT: 100%, SR: 100%, Support: 100%' },
        availability: [
            { label: 'DT', percentage: 81.78, target: 85 },
            { label: 'FL', percentage: 87.55, target: 85 },
            { label: 'HD', percentage: 88.07, target: 85 },
            { label: 'RT', percentage: 93.38, target: 85 },
            { label: 'SR', percentage: 90.45, target: 85 },
        ],
        breakdowns: [
            { category: 'Dump Trucks (81.78%)', details: 'DT121: Park Brake (OEM on site)' },
        ],
    },
    gloria: {
        name: 'Gloria',
        trendChart: { src: '/images/Gloria Weekly availability Chart.png', comment: '"Strong HD availability at 89%. FL availability at 88%. Zero safety incidents this week."' },
        safety: { status: 'Good', details: 'Zero incidents this week' },
        weeklyAverage: { value: 77, target: 85 },
        serviceCompliance: { status: 'Issues', details: 'FL: 0% (GD0008 on breakdown), RT: 66.7%, SR: 50%, Support: 80%' },
        availability: [
            { label: 'DT', percentage: 48, target: 85 },
            { label: 'FL', percentage: 88, target: 85 },
            { label: 'HD', percentage: 89, target: 85 },
            { label: 'RT', percentage: 90, target: 85 },
            { label: 'SR', percentage: 87, target: 85 },
        ],
        breakdowns: [
            { category: 'DT (48%)', details: 'DT0174: No revs, DT0173: Transmission timing, DT0106: Nerospec, DT0152: Powerless, DT0153: No acceleration' },
            { category: 'SR (87%)', details: 'SR0040: CAS Level 9 installation' },
        ],
    },
  },
  bev: {
    availability: [
        { label: 'DT BEV', value: 78, target: 85 },
        { label: 'FL BEV', value: 90, target: 85 },
    ],
    serviceCompliance: [
        { label: 'DT BEV', value: 100 },
        { label: 'FL BEV', value: 100 },
    ],
    breakdowns: [
        { equipment: 'DT BEV (78%)', details: ['DT0172: HVEL Fault @ Batt Bay (37.17 hrs)', 'DT0147: Emergency stop @ tramming parking (31.18 hrs)', 'DT0163: Red Stop Lamb @ Batt Bay (26.38 hrs)'] },
        { equipment: 'FL BEV (90%)', details: ['FL0098: Replace transmission mounting rubbers @ Workshop (47.45 hrs)', 'FL0108: Half Arrows @ boilershop (19.42 hrs)', 'FL0112: Comms Error @ 49s59w SWD (1.98 hrs)', 'FL0113: Oil Leak @ batt bay (1.25 hrs)'] },
    ],
    batteryThemes: [
      'DT BEV at 78% - Critical: DT0172 HVIL fault, waiting new cables. DT0147 e-stop relays replaced (35hrs). DT0163 battery connection issues (14hrs).',
      'FL BEV at 90% - FL112 recurring Strata faults. FL0098 transmission rubbers (48hrs), FL0108 half arrows boilermaker (62hrs).',
      'Battery Status: 10 B4 batteries (2 breakdown), 13 B5 batteries (1 breakdown). TMS hyper care ongoing - coolant pump failures. New pumps arriving 07 March.',
      'Charger Status: 8 chargers operational, 1 faulty module on Charger 2. Battery overheat issues: VPX00048, VPY00011, VPY00051.'
    ],
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
      { area: 'TOTAL', mon: { available: 59, total: 66, color: 'green' }, tue: { available: 61, total: 66, color: 'green' }, wed: { available: 60, total: 66, color: 'green' }, thu: { available: 60, total: 66, color: 'green' }, fri: { available: 61, total: 65, color: 'green' }, weeklyAvg: 91.5 },
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