from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from PIL import Image

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5500", "http://localhost:5500"])  # Add your frontend origin here

genai.configure(api_key="AIzaSyCFNsFusJ_pnpXKhGecXBXy5g7kfgm5Y3I")

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/describe", methods=["POST"])
def describe_image():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type. Allowed: png, jpg, jpeg, gif, webp"}), 415

    try:
        img = Image.open(file.stream)
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(["Provide a detailed description of this image.", img])
        return jsonify({"description": response.text})

    except Exception as e:
        return jsonify({"error": f"Failed to analyze image: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=False, port=5000)