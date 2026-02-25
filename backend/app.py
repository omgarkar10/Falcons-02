from __future__ import annotations

import os
from datetime import datetime
from pathlib import Path

from flask import (
    Flask,
    jsonify,
    request,
    send_from_directory,
)
from flask_cors import CORS
from werkzeug.utils import secure_filename

from db import (
    init_app as init_db_app,
    init_db as create_all_tables,
    db,
    Medicine,
    Prescription,
    Report,
    Appointment,
)

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_FOLDER = BASE_DIR / "uploads"
UPLOAD_FOLDER.mkdir(exist_ok=True)

app = Flask(__name__)

app.config["UPLOAD_FOLDER"] = str(UPLOAD_FOLDER)
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16 MB max upload size

CORS(app, resources={r"/api/*": {"origins": "*"}})
init_db_app(app)


@app.route("/")
def home() -> tuple[dict, int]:
    return jsonify({"message": "Falcons-02 Medicines API is running"}), 200


@app.route("/api/medicines", methods=["GET"])
def list_medicines():
    medicines = Medicine.query.order_by(Medicine.created_at.desc()).all()
    return jsonify([m.to_dict(include_prescriptions=True) for m in medicines]), 200


@app.route("/api/medicines", methods=["POST"])
def create_medicine():
    data = request.get_json(silent=True) or {}

    # Frequency and adherence are now optional from the client.
    required_fields = ["name", "dosage", "duration", "doctor"]
    missing = [f for f in required_fields if not data.get(f)]
    if missing:
        return (
            jsonify({"error": f"Missing required fields: {', '.join(missing)}"}),
            400,
        )

    adherence = data.get("adherence", 0)
    try:
        adherence = int(adherence)
    except (TypeError, ValueError):
        adherence = 0

    # Default frequency if not provided by client.
    frequency = data.get("frequency") or "As prescribed"

    # Allow multiple time-of-day slots via timeOfDaySlots (array).
    slots = data.get("timeOfDaySlots") or []
    if isinstance(slots, list):
        valid = {"morning", "afternoon", "evening"}
        cleaned = []
        for s in slots:
            if isinstance(s, str):
                v = s.strip().lower()
                if v in valid and v not in cleaned:
                    cleaned.append(v)
        slots = cleaned
    else:
        slots = []

    # Backwards compatibility: accept single timeOfDay string.
    if not slots and data.get("timeOfDay"):
        single = str(data["timeOfDay"]).strip().lower()
        if single in {"morning", "afternoon", "evening"}:
            slots = [single]

    time_of_day = ",".join(slots) if slots else "unscheduled"

    medicine = Medicine(
        name=data["name"],
        dosage=data["dosage"],
        frequency=frequency,
        duration=data["duration"],
        doctor=data["doctor"],
        adherence=max(0, min(100, adherence)),
        active=bool(data.get("active", True)),
        time_of_day=time_of_day,
    )
    db.session.add(medicine)
    db.session.commit()

    return jsonify(medicine.to_dict(include_prescriptions=True)), 201


@app.route("/api/medicines/<int:medicine_id>", methods=["PUT", "PATCH"])
def update_medicine(medicine_id: int):
    medicine = Medicine.query.get_or_404(medicine_id)
    data = request.get_json(silent=True) or {}

    for field in ["name", "dosage", "frequency", "duration", "doctor"]:
        if field in data and data[field] is not None:
            setattr(medicine, field, data[field])

    if "adherence" in data:
        try:
            medicine.adherence = max(0, min(100, int(data["adherence"])))
        except (TypeError, ValueError):
            pass

    if "active" in data:
        medicine.active = bool(data["active"])

    # Update time_of_day from multi-slot input if provided.
    if "timeOfDaySlots" in data or "timeOfDay" in data:
        slots = data.get("timeOfDaySlots") or []
        if isinstance(slots, list):
            valid = {"morning", "afternoon", "evening"}
            cleaned = []
            for s in slots:
                if isinstance(s, str):
                    v = s.strip().lower()
                    if v in valid and v not in cleaned:
                        cleaned.append(v)
            slots = cleaned
        else:
            slots = []

        if not slots and data.get("timeOfDay"):
            single = str(data["timeOfDay"]).strip().lower()
            if single in {"morning", "afternoon", "evening"}:
                slots = [single]

        medicine.time_of_day = ",".join(slots) if slots else "unscheduled"

    db.session.commit()
    return jsonify(medicine.to_dict(include_prescriptions=True)), 200


@app.route("/api/medicines/<int:medicine_id>", methods=["DELETE"])
def delete_medicine(medicine_id: int):
    medicine = Medicine.query.get_or_404(medicine_id)
    db.session.delete(medicine)
    db.session.commit()
    return jsonify({"success": True}), 200


@app.route("/api/medicines/<int:medicine_id>/prescriptions", methods=["GET"])
def list_prescriptions(medicine_id: int):
    medicine = Medicine.query.get_or_404(medicine_id)
    return jsonify([p.to_dict() for p in medicine.prescriptions]), 200


@app.route("/api/medicines/<int:medicine_id>/prescriptions", methods=["POST"])
def upload_prescription(medicine_id: int):
    Medicine.query.get_or_404(medicine_id)

    if "file" not in request.files:
        return jsonify({"error": "No file part in request"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filename = secure_filename(file.filename)
    if not filename:
        return jsonify({"error": "Invalid filename"}), 400

    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S%f")
    stored_filename = f"{medicine_id}_{timestamp}_{filename}"
    file_path = UPLOAD_FOLDER / stored_filename
    file.save(file_path)

    prescription = Prescription(
        medicine_id=medicine_id,
        original_filename=filename,
        stored_filename=stored_filename,
        content_type=file.mimetype,
    )
    db.session.add(prescription)
    db.session.commit()

    return jsonify(prescription.to_dict()), 201


@app.route("/api/prescriptions/<int:prescription_id>/file", methods=["GET"])
def download_prescription_file(prescription_id: int):
    prescription = Prescription.query.get_or_404(prescription_id)
    return send_from_directory(
        app.config["UPLOAD_FOLDER"],
        prescription.stored_filename,
        as_attachment=True,
        download_name=prescription.original_filename,
        mimetype=prescription.content_type or "application/octet-stream",
    )


@app.route("/api/reports", methods=["GET"])
def list_reports():
    reports = Report.query.order_by(Report.date.desc()).all()
    return jsonify([r.to_dict() for r in reports]), 200


@app.route("/api/appointments", methods=["GET"])
def list_appointments():
    appointments = Appointment.query.order_by(Appointment.date.desc()).all()
    return jsonify([a.to_dict() for a in appointments]), 200


def init_db():
    """Create database tables if they don't exist and load sample data."""
    with app.app_context():
        create_all_tables(with_sample_data=True)


if __name__ == "__main__":
    init_db()
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)
