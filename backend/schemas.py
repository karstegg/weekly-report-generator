from pydantic import BaseModel
from datetime import date
from typing import Optional, Any

# Pydantic automatically handles JSON string parsing for nested models,
# but for direct dictionary data from SQLAlchemy's JSON type, 
# we define the structure explicitly.

class SafetyData(BaseModel):
    status: str

class RomData(BaseModel):
    actual: int
    target: int

class ProductionPerformanceData(BaseModel):
    rom: RomData

class Load(BaseModel):
    count: int
    target: int

class OperationalMetricsData(BaseModel):
    loads: Load

class Fleet(BaseModel):
    available: int
    total: int

class EquipmentAvailabilityData(BaseModel):
    tmm_fleet: Fleet

class Breakdown(BaseModel):
    equipment_id: str
    description: str
    downtime_hours: float

class EquipmentStatusData(BaseModel):
    current_breakdowns: list[Breakdown]

class Blockage(BaseModel):
    location: str
    description: str
    is_cleared: bool

class InfrastructureStatusData(BaseModel):
    plant_blockages: list[Blockage]

class DailyReportBase(BaseModel):
    report_date: date
    shift: str
    site: str
    safety: Optional[SafetyData] = None
    production_performance: Optional[ProductionPerformanceData] = None
    operational_metrics: Optional[OperationalMetricsData] = None
    equipment_availability: Optional[EquipmentAvailabilityData] = None
    equipment_status: Optional[EquipmentStatusData] = None
    infrastructure_status: Optional[InfrastructureStatusData] = None

class DailyReportCreate(DailyReportBase):
    pass

class DailyReportResponse(DailyReportBase):
    id: int

    class Config:
        from_attributes = True
