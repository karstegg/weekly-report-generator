import { DailyReportData } from './reportData';

export const mockDailyReport: DailyReportData = {
  id: 1,
  report_date: "2025-06-24",
  shift: "Day",
  site: "Nchwaning 2",
  safety: {
    status: "Clear",
    incidents: [],
    ldo_reports: []
  },
  production_performance: {
    rom_tons: { actual: 2895, target: 6903 },
    product_tons: { actual: 3835, target: 4548 },
    decline_meters: null,
    mtd_rom_tons: null,
    mtd_product_tons: null,
    loads: {
      stopping: 0,
      development: 29,
      rehab: 40
    },
    blast_performance: {
      planned: 16,
      completed: null, // '?' is treated as null
      cancelled: null,
      issues: "Stood on dayshift as prepares was full from the weekend. Then there was a breakdown at 3–7 level during afternoon shift"
    }
  },
  operational_metrics: {
    silo_levels: null // No silo data in this report
  },
  equipment_availability: {
    tmm_fleet_availability: {
      dts: 96,
      fls: 74,
      hds: 88,
      rts: 71,
      srs: 93,
      dz13: null, // '?' is treated as null
      gd12: null, // '?' is treated as null
      uv044: null // Not present for Nchwaning 2
    },
    start_of_shift_status: {
      dts: { available: 9, total: 9 },
      fls: { available: 4, total: 6, reason: "FL66 aircon; FL114 bucket maintenance" },
      hds: { available: 5, total: 6, reason: "HD64 drill plug" },
      rts: { available: 5, total: 6, reason: "RT38 service" },
      srs: { available: 5, total: 6, reason: "SR27 tyre" }
    },
    support_equipment: {
      emulsion_uvs: null, // '?%' availability, no count given
      logistics_uvs: null, // '?%' availability, no count given
      manlifts: null, // '?%' availability, no count given
      survey_equipment: null // '?%' availability, no count given
    }
  },
  equipment_status: {
    current_breakdowns: [
      { equipment_id: "FL66", fault_description: "aircon" },
      { equipment_id: "FL114", fault_description: "bucket maintenance" },
      { equipment_id: "HD64", fault_description: "drill plug" },
      { equipment_id: "RT38", fault_description: "service" },
      { equipment_id: "SR27", fault_description: "tyre" },
      { equipment_id: "UV90", fault_description: "water pump & timing" },
      { equipment_id: "UV69", fault_description: "front diff" },
      { equipment_id: "UV66", fault_description: "steering" },
      { equipment_id: "UV98", fault_description: "bucket" },
      { equipment_id: "FL85", fault_description: "propshaft" },
      { equipment_id: "DT99", fault_description: "aircon" },
      { equipment_id: "HD63", fault_description: "roll over" },
      { equipment_id: "GR21", fault_description: "bucket cylinder leak" }
    ],
    maintenance_activities: [] // This is now merged into current_breakdowns
  },
  infrastructure_status: {
    plant_blockages: [], // '0'
    fire_alarms: { count: 0, locations: [] }, // '0'
    main_fans_operational: true, // Assumed true as no issues reported
    chute_crusher_issues: []
  },
  general_info: {
    notes: []
  }
};