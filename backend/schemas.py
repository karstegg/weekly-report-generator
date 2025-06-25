from pydantic import BaseModel
from datetime import date
from typing import Optional, List, Dict

# 1. Safety & Incidents
class IncidentDetail(BaseModel):
    reference: str
    details: str

class SafetyData(BaseModel):
    status: str # Clear or Incidents
    incident_details: List[IncidentDetail] = []
    ldo_reports: List[str] = []

# 2. Production Performance
class PerformanceMetric(BaseModel):
    actual: float
    target: float

class ProductionPerformanceData(BaseModel):
    rom: PerformanceMetric
    product: PerformanceMetric
    decline: Optional[PerformanceMetric] = None
    mtd: PerformanceMetric

# 3. Operational Metrics
class AreaLoads(BaseModel):
    ms: int
    as_field: int # 'as' is a keyword, so use an alias
    ns: int

class BlastStatus(BaseModel):
    full: int
    hw: int
    fw: int
    lp: int

class BlastPerformance(BaseModel):
    actual_faces: int
    plan_faces: int
    status_breakdown: BlastStatus

class SiloLevels(BaseModel):
    surface_1: int
    surface_2: int
    surface_3: int
    surface_4: int
    underground_74: int
    underground_hg: int
    underground_d: int
    underground_lg: int

class OperationalMetricsData(BaseModel):
    loads: AreaLoads
    blast_performance: BlastPerformance
    silo_levels: SiloLevels

# 4. Equipment Availability
class FleetAvailability(BaseModel):
    dts: Optional[float] = None
    fls: Optional[float] = None
    hds: Optional[float] = None
    rts: Optional[float] = None
    srs: Optional[float] = None
    dz13: Optional[float] = None
    gd12: Optional[float] = None
    uv044: Optional[float] = None

class EquipmentCount(BaseModel):
    available: int
    total: int

class StartOfShiftStatus(BaseModel):
    dts: Optional[EquipmentCount] = None
    fls: Optional[EquipmentCount] = None
    hds: Optional[EquipmentCount] = None
    rts: Optional[EquipmentCount] = None
    srs: Optional[EquipmentCount] = None

class SupportEquipment(BaseModel):
    emulsion_uvs: Optional[EquipmentCount] = None
    logistics_uvs: Optional[EquipmentCount] = None
    manlifts: Optional[EquipmentCount] = None
    survey_equipment: Optional[EquipmentCount] = None

class EquipmentAvailabilityData(BaseModel):
    tmm_fleet_availability: FleetAvailability
    start_of_shift_status: StartOfShiftStatus
    support_equipment: SupportEquipment

# 5. Equipment Status & Breakdowns
class Breakdown(BaseModel):
    equipment_id: str
    fault_description: str

class EquipmentLockout(BaseModel):
    equipment_id: str
    reason: str

class EquipmentStatusData(BaseModel):
    current_breakdowns: List[Breakdown] = []
    maintenance_activities: List[str] = []
    equipment_lockouts: List[EquipmentLockout] = []

# 6. Infrastructure Status
class PlantBlockage(BaseModel):
    location: str
    duration: str

class FireAlarm(BaseModel):
    count: int
    locations: List[str]

class InfrastructureStatusData(BaseModel):
    plant_blockages: List[PlantBlockage] = []
    fire_alarms: FireAlarm
    main_fans_operational: bool
    chute_crusher_issues: List[str] = []

# Main Report Structure
class DailyReportBase(BaseModel):
    report_date: date
    shift: str
    site: str
    safety: SafetyData
    production_performance: ProductionPerformanceData
    operational_metrics: OperationalMetricsData
    equipment_availability: EquipmentAvailabilityData
    equipment_status: EquipmentStatusData
    infrastructure_status: InfrastructureStatusData

class DailyReportCreate(DailyReportBase):
    pass

class DailyReportResponse(DailyReportBase):
    id: int

    class Config:
        from_attributes = True
