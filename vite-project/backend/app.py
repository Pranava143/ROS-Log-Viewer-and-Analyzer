from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)
    
    try:
        with open(filepath, 'r') as f:
            log_data = f.readlines()
        
        log_json = []
        for line in log_data:
            parts = line.strip().split('|')
            log_entry = {
                "timestamp": parts[0],
                "severity": parts[1],
                "node": parts[2],
                "message": parts[4]
            }
            log_json.append(log_entry)
        
    except Exception as e:
        return jsonify({'error': f'Failed to process log file: {str(e)}'}), 400
    
    return jsonify({'message': f'File {file.filename} uploaded successfully!', 'log_data': log_json}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
