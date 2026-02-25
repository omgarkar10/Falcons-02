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
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_FOLDER = BASE_DIR / "uploads"
UPLOAD_FOLDER.mkdir(exist_ok=True)

app = Flask(__name__)

# Basic configuration
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{BASE_DIR / 'medicines.db'}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["UPLOAD_FOLDER"] = str(UPLOAD_FOLDER)
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16 MB max upload size

CORS(app, resources={r"/api/*": {"origins": "*"}})
db = SQLAlchemy(app)


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
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    prescriptions = db.relationship(
        "Prescription",
        backref="medicine",
        cascade="all, delete-orphan",
        lazy=True,
    )

    def to_dict(self, include_prescriptions: bool = False) -> dict:
        data = {
            "id": self.id,
            "name": self.name,
            "dosage": self.dosage,
            "frequency": self.frequency,
            "duration": self.duration,
            "doctor": self.doctor,
            "adherence": self.adherence,
            "active": self.active,
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

    required_fields = ["name", "dosage", "frequency", "duration", "doctor"]
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

    medicine = Medicine(
        name=data["name"],
        dosage=data["dosage"],
        frequency=data["frequency"],
        duration=data["duration"],
        doctor=data["doctor"],
        adherence=max(0, min(100, adherence)),
        active=bool(data.get("active", True)),
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


def init_db():
    """Create database tables if they don't exist."""
    with app.app_context():
        db.create_all()


if __name__ == "__main__":
    init_db()
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)
