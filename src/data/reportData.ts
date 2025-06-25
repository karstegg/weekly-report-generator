// ======================================================================
// V1 - Weekly Report Data Interfaces (Original Structure)
// ======================================================================

export interface Availability {
  label: string;
  percentage: number;
  target?: number;
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

// ======================================================================
// V2 - Daily Report Data Interfaces (New Agentic Structure)
// ======================================================================

// 1. Safety & Incidents
export interface IncidentDetail {
  reference: string;
  description: string;
}

export interface SafetyData {
  status: 'Clear' | 'Incident' | 'Concern';
  incidents: IncidentDetail[];
  ldo_reports: { reference: string; description: string }[];
}

// 2. Production Performance
export interface PerformanceMetric {
  actual: number | null;
  target: number | null;
}

export interface AreaLoads {
  stopping: number | null;
  development: number | null;
  rehab: number | null;
  target?: number;
}

export interface BlastPerformance {
  planned: number | null;
  completed: number | null;
  cancelled: number | null;
  issues: string | null;
}

export interface ProductionPerformanceData {
  rom_tons: PerformanceMetric;
  product_tons: PerformanceMetric;
  decline_meters: PerformanceMetric | null;
  mtd_rom_tons: PerformanceMetric | null;
  mtd_product_tons: PerformanceMetric | null;
  loads: AreaLoads;
  blast_performance: BlastPerformance;
}

export interface SiloLevels {
  surface_1: number;
  surface_2: number;
  surface_3: number;
  surface_4: number;
  underground_74: number;
  underground_hg: number;
  underground_d: number;
  underground_lg: number;
}

export interface OperationalMetricsData {
  silo_levels: SiloLevels;
}

// 4. Equipment Availability
export interface FleetAvailability {
  dts?: number;
  fls?: number;
  hds?: number;
  rts?: number;
  srs?: number;
  dz13?: number;
  gd12?: number;
  uv044?: number;
}

export interface EquipmentCount {
  available: number;
  total: number;
  reason?: string; // To capture breakdown notes for unavailable equipment
}

export interface StartOfShiftStatus {
  dts?: EquipmentCount;
  fls?: EquipmentCount;
  hds?: EquipmentCount;
  rts?: EquipmentCount;
  srs?: EquipmentCount;
}

export interface SupportEquipment {
  emulsion_uvs?: EquipmentCount;
  logistics_uvs?: EquipmentCount;
  manlifts?: EquipmentCount;
  survey_equipment?: EquipmentCount;
}

export interface EquipmentAvailabilityData {
  tmm_fleet_availability: FleetAvailability;
  start_of_shift_status: StartOfShiftStatus;
  support_equipment: SupportEquipment;
}

// 5. Equipment Status & Breakdowns
export interface Breakdown {
  equipment_id: string;
  fault_description: string;
}

export interface EquipmentLockout {
  equipment_id: string;
  reason: string;
}

export interface EquipmentStatusData {
  current_breakdowns: Breakdown[];
  maintenance_activities: string[];
}

// 6. Infrastructure Status
export interface PlantBlockage {
  location: string;
  duration: string;
}

export interface FireAlarm {
  count: number;
  locations: string[];
}

export interface InfrastructureStatusData {
  plant_blockages: PlantBlockage[];
  fire_alarms: FireAlarm;
  main_fans_operational: boolean;
  chute_crusher_issues: string[];
}

// 7. General Information
export interface GeneralInfoData {
  notes?: string[];
}

// Main Daily Report Structure
export interface DailyReportData {
  id: number;
  report_date: string; // Dates are strings in JSON
  shift: string;
  site: string;
  safety: SafetyData;
  production_performance: ProductionPerformanceData;
  operational_metrics: OperationalMetricsData;
  equipment_availability: EquipmentAvailabilityData;
  equipment_status: EquipmentStatusData;
  infrastructure_status: InfrastructureStatusData;
  general_info: GeneralInfoData;
}
