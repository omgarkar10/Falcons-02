from __future__ import annotations

from pathlib import Path
from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect, text


BASE_DIR = Path(__file__).resolve().parent
DB_DIR = BASE_DIR / "database"
DB_DIR.mkdir(exist_ok=True)

DB_PATH = DB_DIR / "main.db"
DATABASE_URI = f"sqlite:///{DB_PATH}"

db = SQLAlchemy()


class Medicine(db.Model):
    __tablename__ = "medicines"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    dosage = db.Column(db.String(255), nullable=False)
    frequency = db.Column(db.String(255), nullable=False)
    duration = db.Column(db.String(255), nullable=False)
    doctor = db.Column(db.String(255), nullable=False)
    adherence = db.Column(db.Integer, nullable=False, default=0)
    active = db.Column(db.Boolean, nullable=False, default=True)
    # morning / afternoon / evening / unscheduled
    time_of_day = db.Column(db.String(50), nullable=False, default="unscheduled")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    prescriptions = db.relationship(
        "Prescription",
        backref="medicine",
        cascade="all, delete-orphan",
        lazy=True,
    )

    def to_dict(self, include_prescriptions: bool = False) -> dict:
        valid_slots = {"morning", "afternoon", "evening"}
        slots: list[str] = []
        if self.time_of_day:
            parts = [p.strip().lower() for p in self.time_of_day.split(",") if p.strip()]
            slots = [p for p in parts if p in valid_slots]

        data = {
            "id": self.id,
            "name": self.name,
            "dosage": self.dosage,
            "frequency": self.frequency,
            "duration": self.duration,
            "doctor": self.doctor,
            "adherence": self.adherence,
            "active": self.active,
            "timeOfDay": self.time_of_day,
            "timeOfDaySlots": slots,
            "createdAt": self.created_at.isoformat(),
        }
        if include_prescriptions:
            data["prescriptions"] = [p.to_dict() for p in self.prescriptions]
        return data


class Prescription(db.Model):
    __tablename__ = "prescriptions"

    id = db.Column(db.Integer, primary_key=True)
    medicine_id = db.Column(
        db.Integer, db.ForeignKey("medicines.id", ondelete="CASCADE"), nullable=False
    )
    original_filename = db.Column(db.String(255), nullable=False)
    stored_filename = db.Column(db.String(255), nullable=False)
    content_type = db.Column(db.String(255), nullable=True)
    uploaded_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "medicineId": self.medicine_id,
            "originalFilename": self.original_filename,
            "contentType": self.content_type,
            "uploadedAt": self.uploaded_at.isoformat(),
            "downloadUrl": f"/api/prescriptions/{self.id}/file",
        }


class Report(db.Model):
    __tablename__ = "reports"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    doctor = db.Column(db.String(255), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    summary = db.Column(db.Text, nullable=True)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "doctor": self.doctor,
            "date": self.date,
            "summary": self.summary,
        }


class Appointment(db.Model):
    __tablename__ = "appointments"

    id = db.Column(db.Integer, primary_key=True)
    doctor = db.Column(db.String(255), nullable=False)
    specialty = db.Column(db.String(255), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), nullable=False, default="upcoming")
    notes = db.Column(db.Text, nullable=True)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "doctor": self.doctor,
            "specialty": self.specialty,
            "date": self.date,
            "time": self.time,
            "location": self.location,
            "status": self.status,
            "notes": self.notes,
        }


def init_app(app):
    """Initialize SQLAlchemy with the Flask app and configure URI."""
    app.config.setdefault("SQLALCHEMY_DATABASE_URI", DATABASE_URI)
    app.config.setdefault("SQLALCHEMY_TRACK_MODIFICATIONS", False)
    db.init_app(app)


def init_db(with_sample_data: bool = False):
    """Create all tables and optionally insert sample data."""
    from sample_data import load_sample_data

    with db.engine.begin() as conn:
        db.metadata.create_all(bind=conn)

        # Simple schema migration: ensure time_of_day exists on medicines
        inspector = inspect(conn)
        columns = [c["name"] for c in inspector.get_columns("medicines")]
        if "time_of_day" not in columns:
            conn.execute(
                text(
                    "ALTER TABLE medicines "
                    "ADD COLUMN time_of_day VARCHAR(50) NOT NULL DEFAULT 'unscheduled'"
                )
            )

    if with_sample_data:
        load_sample_data(db)

