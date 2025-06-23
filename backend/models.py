from sqlalchemy import Column, Integer, String, Date, JSON, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# For simplicity, we'll start with a SQLite database.
# This can be easily swapped for PostgreSQL or another DB in production.
DATABASE_URL = "sqlite:///./daily_reports.db"

Base = declarative_base()

class DailyReport(Base):
    __tablename__ = "daily_reports"

    id = Column(Integer, primary_key=True, index=True)
    report_date = Column(Date, nullable=False, index=True)
    shift = Column(String, nullable=False)
    site = Column(String, nullable=False, index=True)

    # JSON fields to store the structured data from the parser
    safety = Column(JSON, nullable=True)
    production_performance = Column(JSON, nullable=True)
    operational_metrics = Column(JSON, nullable=True)
    equipment_availability = Column(JSON, nullable=True)
    equipment_status = Column(JSON, nullable=True)
    infrastructure_status = Column(JSON, nullable=True)

    raw_message_id = Column(String, unique=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# --- Database Setup ---
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False} # check_same_thread is only for SQLite
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    """Initializes the database and creates the tables."""
    Base.metadata.create_all(bind=engine)
