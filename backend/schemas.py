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

class OperationalMetricsData(BaseModel):
    loads: Any  # Using 'Any' as placeholder structure is unknown

class EquipmentAvailabilityData(BaseModel):
    tmm_fleet: Any # Using 'Any' as placeholder structure is unknown

class EquipmentStatusData(BaseModel):
    current_breakdowns: Any # Using 'Any' as placeholder structure is unknown

class InfrastructureStatusData(BaseModel):
    plant_blockages: Any # Using 'Any' as placeholder structure is unknown

class DailyReportResponse(BaseModel):
    id: int
    report_date: date
    shift: str
    site: str
    safety: Optional[SafetyData] = None
    production_performance: Optional[ProductionPerformanceData] = None
    operational_metrics: Optional[OperationalMetricsData] = None
    equipment_availability: Optional[EquipmentAvailabilityData] = None
    equipment_status: Optional[EquipmentStatusData] = None
    infrastructure_status: Optional[InfrastructureStatusData] = None

    class Config:
        from_attributes = True
