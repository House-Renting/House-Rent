from flask import Flask, request, jsonify
from flask_cors import CORS
from automate import AutomaticModelGenerator

app = Flask(__name__)
CORS(app)

@app.route('/create-model', methods=['POST'])
def process_model():
    data = request.get_json()
    IMAGE_PATH, WORKSPACE_PATH = data.get("imagePath"), data.get("workspacePath")

    if not IMAGE_PATH or not WORKSPACE_PATH:
        return jsonify({"error": "Missing required parameters"}), 400

    try:
        generator = AutomaticModelGenerator(IMAGE_PATH, WORKSPACE_PATH)
        generator.generate_3d_model()
        
        return jsonify({"message": "Model Successfully Generated", "id": 1})

    except RuntimeError as e:
        print(f"Error: {e}")
        return jsonify({"message": "An error occurred", "id": None}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
