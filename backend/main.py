from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

# Use absolute imports for robustness
from backend import models, schemas
from backend.models import SessionLocal, init_db, DailyReport

app = FastAPI(title="Daily Report Generator API")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust for your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def on_startup():
    """Initializes the database and creates the tables on startup."""
    init_db()

@app.post("/whatsapp/ingest", response_model=schemas.DailyReportResponse)
def ingest_daily_report(report_data: schemas.DailyReportCreate, db: Session = Depends(get_db)):
    """
    Receives pre-parsed, structured daily report data and saves it to the database.
    This endpoint is intended to be used by the Cascade agent.
    """
    # Pydantic's model_dump() creates a dictionary from the model
    db_report_dict = report_data.model_dump()

    # The model expects the JSON fields to be dictionaries, which model_dump provides.
    db_report = models.DailyReport(**db_report_dict)
    
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

@app.get("/reports/daily/latest", response_model=Optional[schemas.DailyReportResponse])
async def get_latest_daily_report(db: Session = Depends(get_db)):
    """Fetches the most recent daily report from the database."""
    latest_report = (
        db.query(DailyReport)
        .order_by(DailyReport.report_date.desc(), DailyReport.created_at.desc())
        .first()
    )
    if not latest_report:
        # Return None, which FastAPI will serialize as null, preventing frontend errors.
        return None
    return latest_report

@app.get("/")
async def root():
    """Root endpoint for health checks."""
    return {"message": "Welcome to the Daily Report Backend - V3 (Agentic)"}
