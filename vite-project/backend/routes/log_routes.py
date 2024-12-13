from flask import Blueprint, request, jsonify
import os

log_routes = Blueprint("log_routes", __name__)

# Directory for saving uploaded files
UPLOAD_FOLDER = "uploaded_files"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@log_routes.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected for uploading"}), 400

    # Save the uploaded file
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    try:
        file.save(filepath)
        return jsonify({"message": f"File {file.filename} uploaded successfully!"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to upload file: {str(e)}"}), 500
