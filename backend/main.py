from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from typing import Dict

# Import components from our backend structure
from . import models, daily_parser
from .models import SessionLocal, init_db

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
    """
    On startup, initialize the database.
    This will create the tables if they don't exist.
    """
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
    # In a real implementation, we'd fetch from WhatsApp MCP here.
    # For now, we simulate receiving a raw message string.
    raw_message = report_data.get("message", "")
    report_date_str = report_data.get("date", date.today().isoformat())
    shift = report_data.get("shift", "Day")
    site = report_data.get("site", "Unknown")

    if not raw_message:
        raise HTTPException(status_code=400, detail="Message content is required.")

    # 1. Parse the raw message
    parsed_data = daily_parser.parse_whatsapp_report(raw_message)

    # 2. Create a new report record
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
        # raw_message_id would come from the WhatsApp MCP message object
    )

    # 3. Add to session and commit to DB
    db.add(db_report)
    db.commit()
    db.refresh(db_report)

    return {"status": "success", "report_id": db_report.id}


@app.get("/")
async def root():
    return {"message": "Welcome to the Daily Report Generator Backend"}
