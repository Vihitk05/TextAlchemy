import requests
from flask import Flask,jsonify,request
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

HUGGING_FACE_TOKEN = os.getenv("API_TOKEN")
app = Flask(__name__)
CORS(app)

headers = {"Authorization": f"Bearer {HUGGING_FACE_TOKEN}"}
API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"


def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()


@app.route("/text_summarize",methods=['POST'])
def text_summarize():
    text_input = request.json

    data = query(
        {
            "inputs": str(text_input['input']),
            "parameters": {"do_sample": False},
        }
    )
    print(data)
    return jsonify({'data':data})


if __name__ == "__main__":
    app.run(debug=True)