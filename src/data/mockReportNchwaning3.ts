import { DailyReportData } from './reportData';

import { DailyReportData } from './reportData';

export const mockDailyReportNchwaning3: DailyReportData = {
  id: 2,
  report_date: "2025-06-25",
  shift: "Day",
  site: "Nchwaning 3",
  safety: {
    status: "Clear",
    incidents: [],
    ldo_reports: []
  },
  production_performance: {
    rom_tons: { actual: 4639, target: 6174 },
    product_tons: { actual: 2847, target: 5396 },
    decline_meters: { actual: 3559, target: 5866 },
    mtd_rom_tons: null,
    mtd_product_tons: null,
    loads: { stopping: 67, development: 89, rehab: 49 },
    blast_performance: {
      planned: null,
      completed: 19,
      cancelled: null,
      issues: null
    }
  },
  operational_metrics: {
    silo_levels: null
  },
  equipment_availability: {
    tmm_fleet_availability: {
      hds: 92,
      rts: 85,
      dts: 84,
      fls: 98,
      srs: 94,
      gd12: 77, // Assuming GD11 is a typo for GD12
      dz13: 98, // Assuming DZ11 is a typo for DZ13
      uv044: 78
    },
    start_of_shift_status: {
      hds: { available: 9, total: 9 },
      rts: { available: 8, total: 9 },
      dts: { available: 11, total: 15 },
      fls: { available: 8, total: 10 },
      srs: { available: 8, total: 10 }
    },
    support_equipment: {
      manlifts: { available: 4, total: 4 },
      emulsion_uvs: { available: 4, total: 4 }
    }
  },
  equipment_status: {
    current_breakdowns: [
      { equipment_id: "DT0109", fault_description: "Strata" },
      { equipment_id: "DT0119", fault_description: "Engine cut off" },
      { equipment_id: "DT0145", fault_description: "Tyre puncture" },
      { equipment_id: "DT0162", fault_description: "Oil leak" },
      { equipment_id: "FL0091", fault_description: "Strata" },
      { equipment_id: "HD0049", fault_description: "Drill left boom only" },
      { equipment_id: "HD0052", fault_description: "Coupling broken" },
      { equipment_id: "HD005", fault_description: "Electrical motor o/load" },
      { equipment_id: "HD0062", fault_description: "Feed sling" },
      { equipment_id: "RT0047", fault_description: "Mixing box" },
      { equipment_id: "UV0047", fault_description: "Brakes binding" },
      { equipment_id: "UV0131", fault_description: "Park brake not releasing" }
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
    notes: ["Previous day TMM UVs availability: 87%"]
  }
};
