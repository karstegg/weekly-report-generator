import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.main import app, get_db
from backend.models import Base

# Use an in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override the get_db dependency to use the test database
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="function")
def db_session():
    # Create the database tables
    Base.metadata.create_all(bind=engine)
    yield
    # Drop the database tables after the test
    Base.metadata.drop_all(bind=engine)


def test_ingest_report_success(db_session):
    """Tests successful ingestion of a valid daily report."""
    report_data = {
        "report_date": "2025-06-25",
        "shift": "Night",
        "site": "Site B",
        "safety": {"status": "Clear"},
        "production_performance": {"rom": {"actual": 3000, "target": 2800}},
        "operational_metrics": {"loads": {"count": 150, "target": 140}},
        "equipment_availability": {"tmm_fleet": {"available": 19, "total": 20}},
        "equipment_status": {"current_breakdowns": []},
        "infrastructure_status": {"plant_blockages": []}
    }
    response = client.post("/whatsapp/ingest", json=report_data)
    assert response.status_code == 200
    data = response.json()
    assert data["site"] == "Site B"
    assert data["safety"]["status"] == "Clear"
    assert "id" in data

def test_ingest_report_validation_error(db_session):
    """Tests that a validation error is returned for incomplete data."""
    # Missing the 'safety' field which is required
    report_data = {
        "report_date": "2025-06-25",
        "shift": "Night",
        "site": "Site B",
        "production_performance": {"rom": {"actual": 3000, "target": 2800}},
    }
    response = client.post("/whatsapp/ingest", json=report_data)
    assert response.status_code == 422 # Unprocessable Entity
