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

# SIMPLIFIED ENDPOINT FOR DIAGNOSTICS
@app.post("/whatsapp/ingest/")
async def ingest_daily_report(report_data: Dict):
    """A simplified endpoint to test route registration."""
    print(f"--- INGEST ENDPOINT HIT ---")
    print(f"Received data: {report_data}")
    return {"status": "success", "message": "Endpoint was reached successfully."}

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
    return {"message": "Welcome to the Daily Report Generator Backend"}
