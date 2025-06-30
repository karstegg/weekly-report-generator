import { DailyReportData } from './reportData';

import { DailyReportData } from './reportData';

export const mockDailyReportGloria: DailyReportData = {
  id: 3,
  report_date: "2025-06-25",
  shift: "Day",
  site: "Gloria",
  safety: {
    status: "All clear",
    incidents: [],
    ldo_reports: []
  },
  production_performance: {
    rom_tons: { actual: 1650, target: 4817 },
    product_tons: { actual: 2309, target: 4432 },
    decline_meters: { actual: 3333, target: 4817 },
    mtd_rom_tons: null,
    mtd_product_tons: null,
    loads: { stopping: 40, development: 49, rehab: 63 },
    blast_performance: null
  },
  operational_metrics: {
    silo_levels: {
      "Surface 1": 95, "Surface 2": 93, "Surface 3": 88, "Surface 4": 23,
      "UG 74": 19, "UG HG": 33, "UG D": 15, "UG LG": 35
    }
  },
  equipment_availability: {
    tmm_fleet_availability: { dts: 93, fls: 73, hds: 82, rts: 100, srs: 31 },
    start_of_shift_status: {
      dts: { available: 5, total: 6 },
      fls: { available: 4, total: 5 },
      hds: { available: 4, total: 4 },
      rts: { available: 4, total: 4 },
      srs: { available: 2, total: 4 }
    },
    support_equipment: {
      emulsion_uvs: { available: 1, total: 2 },
      manlifts: { available: 2, total: 2 }
    }
  },
  equipment_status: {
    current_breakdowns: [
      { equipment_id: "UV0067", fault_description: "Oscillation pin" },
      { equipment_id: "FL0081", fault_description: "TRM oil leak" },
      { equipment_id: "DT0152", fault_description: "Oil leak" },
      { equipment_id: "SR0040", fault_description: "Tail frame" },
      { equipment_id: "SR0037", fault_description: "Tail frame" }
    ],
    maintenance_activities: []
  },
  infrastructure_status: {
    plant_blockages: [],
    fire_alarms: { count: 0, locations: [] },
    main_fans_operational: true,
    chute_crusher_issues: []
  },
  general_info: {
    notes: ["Manitou: 1/1"]
  }
};
