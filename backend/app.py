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
from bson import ObjectId

from db import (
    init_app as init_db_app,
    init_db as create_all_tables,
    get_collection,
)

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_FOLDER = BASE_DIR / "uploads"
UPLOAD_FOLDER.mkdir(exist_ok=True)

app = Flask(__name__)

app.config["UPLOAD_FOLDER"] = str(UPLOAD_FOLDER)
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16 MB max upload size

CORS(app, resources={r"/api/*": {"origins": "*"}})
init_db_app(app)

def serialize_doc(doc: dict) -> dict:
    if doc and "_id" in doc:
        doc["id"] = str(doc.pop("_id"))
    
    # ISO string for datetime fields
    for key, value in doc.items():
        if isinstance(value, datetime):
            doc[key] = value.isoformat()
    return doc

def format_medicine(med: dict, include_prescriptions: bool = False) -> dict:
    med = serialize_doc(med)
    valid_slots = {"morning", "afternoon", "evening"}
    slots = []
    time_of_day = med.get("time_of_day", "unscheduled")
    if time_of_day:
        parts = [p.strip().lower() for p in time_of_day.split(",") if p.strip()]
        slots = [p for p in parts if p in valid_slots]

    data = {
        "id": med.get("id"),
        "name": med.get("name"),
        "dosage": med.get("dosage"),
        "frequency": med.get("frequency"),
        "duration": med.get("duration"),
        "doctor": med.get("doctor"),
        "adherence": med.get("adherence", 0),
        "active": med.get("active", True),
        "timeOfDay": time_of_day,
        "timeOfDaySlots": slots,
        "createdAt": med.get("created_at"),
    }
    
    if include_prescriptions:
        prescriptions_cursor = get_collection("prescriptions").find({"medicine_id": med["id"]})
        prescriptions = []
        for p in prescriptions_cursor:
            p_doc = serialize_doc(p)
            prescriptions.append({
                "id": p_doc.get("id"),
                "medicineId": p_doc.get("medicine_id"),
                "originalFilename": p_doc.get("original_filename"),
                "contentType": p_doc.get("content_type"),
                "uploadedAt": p_doc.get("uploaded_at"),
                "downloadUrl": f"/api/prescriptions/{p_doc.get('id')}/file",
            })
        data["prescriptions"] = prescriptions
        
    return data

@app.route("/")
def home() -> tuple[dict, int]:
    return jsonify({"message": "Falcons-02 Medicines API is running"}), 200

@app.route("/api/medicines", methods=["GET"])
def list_medicines():
    medicines_cursor = get_collection("medicines").find().sort("created_at", -1)
    return jsonify([format_medicine(m, include_prescriptions=True) for m in medicines_cursor]), 200

@app.route("/api/medicines", methods=["POST"])
def create_medicine():
    data = request.get_json(silent=True) or {}

    required_fields = ["name", "dosage", "duration", "doctor"]
    missing = [f for f in required_fields if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    adherence = data.get("adherence", 0)
    try:
        adherence = int(adherence)
    except (TypeError, ValueError):
        adherence = 0

    frequency = data.get("frequency") or "As prescribed"
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

    time_of_day = ",".join(slots) if slots else "unscheduled"

    medicine_doc = {
        "name": data["name"],
        "dosage": data["dosage"],
        "frequency": frequency,
        "duration": data["duration"],
        "doctor": data["doctor"],
        "adherence": max(0, min(100, adherence)),
        "active": bool(data.get("active", True)),
        "time_of_day": time_of_day,
        "created_at": datetime.utcnow()
    }
    
    result = get_collection("medicines").insert_one(medicine_doc)
    medicine_doc["_id"] = result.inserted_id

    return jsonify(format_medicine(medicine_doc, include_prescriptions=True)), 201

@app.route("/api/medicines/<string:medicine_id>", methods=["PUT", "PATCH"])
def update_medicine(medicine_id: str):
    try:
        obj_id = ObjectId(medicine_id)
    except:
        return jsonify({"error": "Invalid medicine ID format"}), 400

    medicine = get_collection("medicines").find_one({"_id": obj_id})
    if not medicine:
        return jsonify({"error": "Medicine not found"}), 404

    data = request.get_json(silent=True) or {}
    update_data = {}

    for field in ["name", "dosage", "frequency", "duration", "doctor"]:
        if field in data and data[field] is not None:
            update_data[field] = data[field]

    if "adherence" in data:
        try:
            update_data["adherence"] = max(0, min(100, int(data["adherence"])))
        except (TypeError, ValueError):
            pass

    if "active" in data:
        update_data["active"] = bool(data["active"])

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

        update_data["time_of_day"] = ",".join(slots) if slots else "unscheduled"

    if update_data:
        get_collection("medicines").update_one({"_id": obj_id}, {"$set": update_data})
        medicine.update(update_data)

    return jsonify(format_medicine(medicine, include_prescriptions=True)), 200

@app.route("/api/medicines/<string:medicine_id>", methods=["DELETE"])
def delete_medicine(medicine_id: str):
    try:
        obj_id = ObjectId(medicine_id)
    except:
        return jsonify({"error": "Invalid medicine ID format"}), 400

    result = get_collection("medicines").delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        return jsonify({"error": "Medicine not found"}), 404
        
    get_collection("prescriptions").delete_many({"medicine_id": medicine_id})

    return jsonify({"success": True}), 200

@app.route("/api/medicines/<string:medicine_id>/prescriptions", methods=["GET"])
def list_prescriptions(medicine_id: str):
    try:
        ObjectId(medicine_id)
    except:
        return jsonify({"error": "Invalid medicine ID format"}), 400
        
    prescriptions_cursor = get_collection("prescriptions").find({"medicine_id": medicine_id})
    prescriptions = []
    for p in prescriptions_cursor:
        p_doc = serialize_doc(p)
        prescriptions.append({
            "id": p_doc.get("id"),
            "medicineId": p_doc.get("medicine_id"),
            "originalFilename": p_doc.get("original_filename"),
            "contentType": p_doc.get("content_type"),
            "uploadedAt": p_doc.get("uploaded_at"),
            "downloadUrl": f"/api/prescriptions/{p_doc.get('id')}/file",
        })
    return jsonify(prescriptions), 200

@app.route("/api/medicines/<string:medicine_id>/prescriptions", methods=["POST"])
def upload_prescription(medicine_id: str):
    try:
        obj_id = ObjectId(medicine_id)
    except:
        return jsonify({"error": "Invalid medicine ID format"}), 400

    medicine = get_collection("medicines").find_one({"_id": obj_id})
    if not medicine:
        return jsonify({"error": "Medicine not found"}), 404

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

    prescription_doc = {
        "medicine_id": medicine_id,
        "original_filename": filename,
        "stored_filename": stored_filename,
        "content_type": file.mimetype,
        "uploaded_at": datetime.utcnow()
    }
    
    result = get_collection("prescriptions").insert_one(prescription_doc)
    prescription_doc["_id"] = result.inserted_id
    
    p_doc = serialize_doc(prescription_doc)
    return jsonify({
        "id": p_doc.get("id"),
        "medicineId": p_doc.get("medicine_id"),
        "originalFilename": p_doc.get("original_filename"),
        "contentType": p_doc.get("content_type"),
        "uploadedAt": p_doc.get("uploaded_at"),
        "downloadUrl": f"/api/prescriptions/{p_doc.get('id')}/file",
    }), 201

@app.route("/api/prescriptions/<string:prescription_id>/file", methods=["GET"])
def download_prescription_file(prescription_id: str):
    try:
        obj_id = ObjectId(prescription_id)
    except:
        return jsonify({"error": "Invalid prescription ID format"}), 400
        
    prescription = get_collection("prescriptions").find_one({"_id": obj_id})
    if not prescription:
        return jsonify({"error": "Prescription not found"}), 404
        
    return send_from_directory(
        app.config["UPLOAD_FOLDER"],
        prescription["stored_filename"],
        as_attachment=True,
        download_name=prescription["original_filename"],
        mimetype=prescription.get("content_type", "application/octet-stream"),
    )

@app.route("/api/reports", methods=["GET"])
def list_reports():
    reports_cursor = get_collection("reports").find().sort("date", -1)
    return jsonify([serialize_doc(r) for r in reports_cursor]), 200

@app.route("/api/appointments", methods=["GET"])
def list_appointments():
    appointments_cursor = get_collection("appointments").find().sort("date", -1)
    return jsonify([serialize_doc(a) for a in appointments_cursor]), 200

def init_db():
    with app.app_context():
        create_all_tables(with_sample_data=False)

if __name__ == "__main__":
    init_db()
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=False)
