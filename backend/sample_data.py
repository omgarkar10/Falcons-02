from __future__ import annotations

from datetime import datetime

from db import Medicine, Prescription, Report, Appointment


def load_sample_data(db):
    """Insert basic sample data if tables are empty."""
    if not Medicine.query.first():
        meds = [
            Medicine(
                name="Medicine A",
                dosage="500mg",
                frequency="3x daily",
                duration="7 days",
                doctor="Dr. Smith",
                adherence=85,
                active=True,
                time_of_day="morning",
            ),
            Medicine(
                name="Medicine B",
                dosage="850mg",
                frequency="2x daily",
                duration="30 days",
                doctor="Dr. Patel",
                adherence=92,
                active=True,
                time_of_day="afternoon",
            ),
            Medicine(
                name="Medicine C",
                dosage="10mg",
                frequency="1x daily",
                duration="90 days",
                doctor="Dr. Johnson",
                adherence=75,
                active=False,
                time_of_day="evening",
            ),
        ]
        db.session.add_all(meds)
        db.session.flush()

        # Example prescription for first medicine
        p = Prescription(
            medicine_id=meds[0].id,
            original_filename="example-prescription.pdf",
            stored_filename="example-prescription.pdf",
            content_type="application/pdf",
            uploaded_at=datetime.utcnow(),
        )
        db.session.add(p)

    if not Report.query.first():
        reports = [
            Report(
                name="Complete Blood Count",
                type="Blood Test",
                doctor="Dr. Smith",
                date="2026-02-20",
                summary="All values within normal range.",
            ),
            Report(
                name="Chest X-Ray",
                type="Imaging",
                doctor="Dr. Patel",
                date="2026-02-15",
                summary=None,
            ),
            Report(
                name="Lipid Panel",
                type="Blood Test",
                doctor="Dr. Johnson",
                date="2026-02-10",
                summary="Slightly elevated LDL cholesterol.",
            ),
        ]
        db.session.add_all(reports)

    if not Appointment.query.first():
        appointments = [
            Appointment(
                doctor="Dr. Sarah Smith",
                specialty="General Physician",
                date="2026-02-26",
                time="10:00 AM",
                location="City Medical Center",
                status="upcoming",
                notes="Annual checkup",
            ),
            Appointment(
                doctor="Dr. Raj Patel",
                specialty="Cardiologist",
                date="2026-03-02",
                time="2:30 PM",
                location="Heart Care Clinic",
                status="upcoming",
            ),
            Appointment(
                doctor="Dr. Emily Johnson",
                specialty="Endocrinologist",
                date="2026-03-10",
                time="11:00 AM",
                location="Metro Hospital",
                status="upcoming",
                notes="Thyroid follow-up",
            ),
            Appointment(
                doctor="Dr. Michael Lee",
                specialty="Dermatologist",
                date="2026-02-18",
                time="3:00 PM",
                location="Skin Health Clinic",
                status="completed",
            ),
            Appointment(
                doctor="Dr. Lisa Williams",
                specialty="Orthopedist",
                date="2026-02-10",
                time="9:00 AM",
                location="Bone & Joint Center",
                status="cancelled",
            ),
        ]
        db.session.add_all(appointments)

    db.session.commit()

