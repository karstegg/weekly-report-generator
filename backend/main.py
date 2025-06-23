from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from typing import Dict, Optional

# Use absolute imports instead of relative ones for robustness
from backend import models, daily_parser
from backend.models import SessionLocal, init_db, DailyReport

app = FastAPI(title="Daily Report Generator API")

# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
async def startup_event():
    init_db()

@app.post("/whatsapp/ingest/")
async def ingest_daily_report(
    report_data: Dict, # In a real scenario, this would be the raw message
    db: Session = Depends(get_db)
):
    """
    Endpoint to ingest a raw daily report, parse it, and save it to the database.
    For now, we accept a dictionary simulating the raw message parts.
    """
    raw_message = report_data.get("message", "")
    report_date_str = report_data.get("date", date.today().isoformat())
    shift = report_data.get("shift", "Day")
    site = report_data.get("site", "Unknown")

    if not raw_message:
        raise HTTPException(status_code=400, detail="Message content is required.")

    parsed_data = daily_parser.parse_whatsapp_report(raw_message)

    db_report = models.DailyReport(
        report_date=date.fromisoformat(report_date_str),
        shift=shift,
        site=site,
        safety=parsed_data.get("safety"),
        production_performance=parsed_data.get("production_performance"),
        operational_metrics=parsed_data.get("operational_metrics"),
        equipment_availability=parsed_data.get("equipment_availability"),
        equipment_status=parsed_data.get("equipment_status"),
        infrastructure_status=parsed_data.get("infrastructure_status"),
    )

    db.add(db_report)
    db.commit()
    db.refresh(db_report)

    return {"status": "success", "report_id": db_report.id}

@app.get("/reports/daily/latest", response_model=Optional[Dict])
async def get_latest_daily_report(db: Session = Depends(get_db)):
    """Fetches the most recent daily report from the database."""
    latest_report = (
        db.query(DailyReport)
        .order_by(DailyReport.report_date.desc(), DailyReport.created_at.desc())
        .first()
    )
    if not latest_report:
        raise HTTPException(status_code=404, detail="No daily reports found.")
    return latest_report

@app.get("/")
async def root():
    return {"message": "Welcome to the Daily Report Backend - V2"}
