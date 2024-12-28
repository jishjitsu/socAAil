from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load environment variables
load_dotenv()

# Configure the Generative AI API
genai.configure(api_key="AIzaSyD1jSleYeATnWLtmNM_lfWwb4YS7KhmoIc")

@app.route('/generate-hashtags', methods=['POST'])
def generate_hashtags():
    data = request.json
    topic = data.get("prompt", "").strip()

    if not topic or len(topic) < 3:  # Check for empty or too-short input
        topic = "an engaging and trending topic"

    prompt = (
        f"Generate hashtags for the topic/trend: '{topic}'. Ensure the hashtags are prevalent and popular. make sure you only 5 of them and make sure they start with hashtags, dont give any description just the hashtags"
    )

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return jsonify({"hashtags": response.text.split()})  # Split response into a list of hashtags
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate-content', methods=['POST'])
def generate_content():
    data = request.json
    topic = data.get("prompt", "").strip()

    if not topic or len(topic) < 3:  # Check for empty or too-short input
        topic = "an engaging and trending topic"

    prompt = (
        f"Generate a professional and detailed content script for social media. The script should focus on the topic: '{topic}'. Ensure the content is creative and suitable for a general audience and dont include hashtags in the generated content."
    )

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return jsonify({"content": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/askai', methods=['POST'])
def ask_ai():
    data = request.json
    additional_prompt = data.get("prompt", "").strip()
    existing_content = data.get("content", "").strip()

    if not additional_prompt:
        return jsonify({"error": "Prompt is required"}), 400

    prompt = (
        f"Based on the following content while not including any hashtags: '{existing_content}', {additional_prompt}"
    )

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return jsonify({"content": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
