from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Configure the Generative AI API
genai.configure(api_key="AIzaSyD1jSleYeATnWLtmNM_lfWwb4YS7KhmoIc")

@app.route('/generate-content', methods=['POST'])
def generate_content():
    data = request.json
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        # Create a generative model instance
        model = genai.GenerativeModel("gemini-1.5-flash")
        # Generate content based on the prompt
        response = model.generate_content(prompt)
        return jsonify({"response": response.text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
