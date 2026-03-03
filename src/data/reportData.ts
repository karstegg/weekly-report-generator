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
  weekNumber: 35,
  dateRange: '20 - 27 February 2026',
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
        { site: 'N2', text: 'DTs are back to full fleet with DT0121 finally fixed' },
        { site: 'N2', text: 'Commissioned a new truck DT0182' },
        { site: 'N3', text: 'Good plant tons over the weekend' },
        { site: 'GLA', text: 'Good improvement in RTs and HDs availability for three weeks' },
        { site: 'GLA', text: 'All CAT trucks are available for production' },
        { site: 'GLA', text: 'MTD production tons above the target by 218 tons' },
    ],
    lowlights: [
        { site: 'N2', text: 'UV 137 is switched back to Level 7 while the faultfinding' },
        { site: 'N3', text: 'Poor availabilities on DTs and FLs' },
        { site: 'N3 / GLA', text: 'PowerBi and Mobiliaris reporting discrepancies' },
        { site: 'GLA', text: 'Raise compressor failure causing pressure drop resulting SMS not to shotcrete in 9 West section' },
        { site: 'GLA', text: 'DTs availability was 76%' },
    ],
    emergingIssues: [
        { site: 'N2', text: '28N electrical trip out are impacting production' },
        { site: 'N2', text: 'Loading points' },
        { site: 'N3', text: 'LDV/UV Strata related & allocations' },
        { site: 'N3', text: 'Brake test winch/ramps' },
        { site: 'N3', text: 'Scaler brake hub wear' },
        { site: 'GLA', text: 'UV 0068 Emulsion unit axle to be replace nothing available at the store' },
        { site: 'GLA', text: 'Commission surface compressor – Challenge compressor trips' },
    ],
    priorities: [
        { site: 'N2', text: 'Enforce compliance through action plans' },
        { site: 'N2', text: 'Discussed report escalation on breakdowns affecting production with the team' },
        { site: 'N3', text: 'Implement brake test ramps for Scalers' },
        { site: 'N3', text: 'Roadway meeting' },
        { site: 'GLA', text: '74N tip CAP liners to be repaired – two outstanding' },
        { site: 'GLA', text: 'CV0053 and 51H to be hot spliced' },
        { site: 'GLA', text: 'Waiting delivery of diverted actuator for HG and LG' },
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
      trendChart: { src: '/images/N3 Weekly availability chart.png', comment: '"HD availability at 80%. DT at 79%, FL at 75%. BEV performance improved."' },
      safety: { status: 'Good', details: 'Zero incidents this week' },
      weeklyAverage: { value: 82.75, target: 85 },
      serviceCompliance: { status: 'Good', details: 'All equipment at 100% compliance' },
      availability: [
          { label: 'DT', percentage: 79, target: 85 },
          { label: 'FL', percentage: 75, target: 85 },
          { label: 'HD', percentage: 80, target: 85 },
          { label: 'RT', percentage: 85, target: 85 },
          { label: 'SR', percentage: 80, target: 85 },
      ],
      breakdowns: [
          { category: 'Dump Trucks (79%)', details: 'DT148: Crank seal (Barlows assisting), DT154: Engine not starting, DT145: Wiring(Fixed by Barlows), DT147: Inverter error' },
          { category: 'Front Loaders (75%)', details: 'FL101: Steering (Fixed), FL103: Wiring problem (Epiroc assisting)' },
          { category: 'Hydraulic Drills (80%)', details: 'HD49: Propshaft, HD61: ECM engine check, HD55: Door & Window damaged' },
          { category: 'Scalers (80%)', details: 'SR35: Engine smreplacement (waiting for engine 2 weeks), SR24: Aircon, SR39: Brakes Faulty, SR49 and SR51 commissioned on L7. L9 commissioning to be done nce remainder of Scalers are delivered' },
      ],
      footerNote: 'Combined DT availability (Diesel + BEV) at 79%. FL at 75%. HD availability at 80%. BEV DT at 81%, BEV FL at 89%. Current outstanding DT = DT0148',
    },
    nchwaning2: {
        name: 'Nchwaning 2',
        trendChart: { src: '/images/N2 Weekly availability chart.png', comment: '"DT0121 finally fixed and DT0182 commissioned. Full truck fleet operational."' },
        safety: { status: 'Good', details: 'Zero incidents this week' },
        weeklyAverage: { value: 90.4, target: 85 },
        serviceCompliance: { status: 'Issues', details: 'DT: 100%, FL: 100%, HD: 133%, RT: 100%, SR: 100%, Support: 64%' },
        availability: [
            { label: 'DT', percentage: 88.08, target: 85 },
            { label: 'FL', percentage: 86.29, target: 85 },
            { label: 'HD', percentage: 92.26, target: 85 },
            { label: 'RT', percentage: 93.79, target: 85 },
            { label: 'SR', percentage: 92.36, target: 85 },
        ],
        breakdowns: [
            { category: 'UV0137', details: 'Switched back to Level 7 while faultfinding continues' },
            { category: 'Support Equipment (64%)', details: 'Support equipment compliance at 64% - Unit 20.19.13' },
        ],
    },
    gloria: {
        name: 'Gloria',
        trendChart: { src: '/images/Gloria Weekly availability Chart.png', comment: '"Good improvement in RTs and HDs for three weeks. DT availability at 76%. All CAT trucks available."' },
        safety: { status: 'Good', details: 'Zero incidents this week' },
        weeklyAverage: { value: 85.28, target: 85 },
        serviceCompliance: { status: 'Good', details: 'DT: 100%, HD: 100%, RT: 100%, UV: 100%, Support: 0%' },
        availability: [
            { label: 'DT', percentage: 76, target: 85 },
            { label: 'FL', percentage: 98, target: 85 },
            { label: 'HD', percentage: 94, target: 85 },
            { label: 'RT', percentage: 91, target: 85 },
            { label: 'SR', percentage: 98, target: 85 },
        ],
        breakdowns: [
            { category: 'Dump Trucks (76%)', details: 'DT0105 & DT0106: Nerospec issues, DT0173: Jumping gears' },
        ],
        footerNote: 'MTD production tons above target by 218 tons. All CAT trucks available for production. Raise compressor failure impacting shotcrete operations in 9 West section.',
    },
  },
  bev: {
    availability: [
        { label: 'DT BEV', value: 81, target: 85 },
        { label: 'FL BEV', value: 89, target: 85 },
    ],
    serviceCompliance: [
        { label: 'DT BEV', value: 100 },
        { label: 'FL BEV', value: 100 },
    ],
    breakdowns: [
        { equipment: 'DT BEV (81%)', details: ['DT0147: Invertor error @ battery bay (72.67 hrs)', 'DT0172: HBIL fault not moving @ 13N (48 hrs)', 'DT0146: Collision avoidance warning @ battery bay (24.6 hrs)', 'DT0147: Hydraulic oil leak @ battery bay (24.07 hrs)'] },
        { equipment: 'FL BEV (89%)', details: ['FL0098: Battery not connecting @ S2N Wplace (44.15 hrs)', 'FL0108: Red stop light @ R5 67S 41W (11.72 hrs)', 'FL0098: Module error F204 fuse @ S2N (11.5 hrs)', 'FL0098: Centre Bearing @ battery bay (6.18 hrs)'] },
    ],
    batteryThemes: [
      'DT BEV at 81% - DT0147 invertor error and hydraulic leak (97hrs total). DT0172 HBIL fault (48hrs). DT0146 collision avoidance (25hrs).',
      'FL BEV at 89% - FL0098 battery connection issues (44hrs), module error (12hrs), centre bearing (6hrs). FL0108 red stop light (12hrs).',
      'Critical Issues: DT171 A-frame failed again. DT-147 isolation resistance fault cable down to ground. Battery breakdowns increased due to TMS hyper care.',
      'TMS Issues: Coolant pump failures ongoing. New pumps ordered, arriving 07 March. Changing coolant and coolant hoses on services. Job cards on click view not being filled in properly - limited RCA reporting available.'
    ],
  },
  utilitySection: {
    fleetStatus: { available: 57, unavailable: 9 },
    areaSummary: [
      { area: 'Main West', department: 'Operations', total: 2, unavailable: 0 },
      { area: 'Boilermaker', department: 'Maintenance', total: 3, unavailable: 1 },
      { area: 'Logistics', department: 'Operations', total: 7, unavailable: 1 },
      { area: 'Hyd Fitter', department: 'Maintenance', total: 6, unavailable: 0 },
      { area: 'Plant Fitter', department: 'Maintenance', total: 7, unavailable: 1 },
      { area: 'Utility TMM', department: 'Operations', total: 2, unavailable: 0 },
    ],
    breakdowns: [
      { area: 'Main West', tmmNo: 'LD0520, LD0611', model: 'Maverick', description: 'Weekly Avg 70%', remarks: 'LD0520: Front axle (Mon-Tue), LD0611: Lights/Strata (Mon-Tue)' },
      { area: 'Boilermaker', tmmNo: 'LD0405', model: 'Maverick', description: 'Weekly Avg 66.7%', remarks: 'Engine commission (No communication between engine and machine)' },
      { area: 'BEV', tmmNo: 'LD0375, LD0645', model: 'Maverick', description: 'Weekly Avg 80%', remarks: 'LD0375: Clutch/Rear shock (Mon-Fri), LD0645: Strata (Mon)' },
      { area: 'Central', tmmNo: 'LD0572, LD0625', model: 'Maverick', description: 'Weekly Avg 70%', remarks: 'LD0572: Not starting/brake/ball joint (Mon), LD0625: Strata (Tue)' },
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
      { area: 'TOTAL', mon: { available: 60, total: 66, color: 'green' }, tue: { available: 62, total: 66, color: 'green' }, wed: { available: 58, total: 66, color: 'yellow' }, thu: { available: 58, total: 66, color: 'yellow' }, fri: { available: 56, total: 66, color: 'yellow' }, weeklyAvg: 89.1 },
    ],
  },
  utilitySectionCurrentStatus: {
    totalUnavailable: 9,
    areaStatus: [
      { area: 'BEV', unavailable: 1, details: [{ unit: 'LD0375', reason: 'Clutch / Rear shock - (SOS - EOS)' }] },
      { area: 'Boilermaker', unavailable: 1, details: [{ unit: 'LD0405', reason: 'Engine commission (No communication between engine and machine) - No solution from Fermel (Deutz EMR4 upgrade to EMR5)' }] },
      { area: 'Construction', unavailable: 2, details: [{ unit: 'LD0574', reason: 'Not Starting - (SOS - EOS) - New wiring of Cas Level is draining battery' }, { unit: 'LD0606', reason: 'Hub broken off - (SOS - EOS) - Waiting for parts' }] },
      { area: 'Seam 2', unavailable: 1, details: [{ unit: 'LD0622', reason: 'Transfer box leaking oil - (SOS - EOS) - Waiting for Transfer box' }] },
      { area: 'Sampling', unavailable: 1, details: [{ unit: 'UV0075', reason: 'Not Starting/Can bus faulty - (SOS - EOS)' }] },
      { area: 'Plant Fitter', unavailable: 1, details: [{ unit: 'UV0088', reason: 'Warning signs - (SOS - EOS)' }] },
      { area: 'Survey', unavailable: 1, details: [{ unit: 'UV0101', reason: 'Basket & outriggers malfunctioning - (SOS - EOS)' }] },
      { area: 'Logistics', unavailable: 1, details: [{ unit: 'UV0116', reason: 'Front axle - (SOS - EOS) - Waiting for front axle' }] },
    ],
  },
};