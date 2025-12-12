
import os
import requests
from dotenv import load_dotenv

load_dotenv("fixary-engine/.env")
api_key = os.environ.get("GEMINI_API_KEY")

# Test specific model name
model_name = "gemini-2.0-flash"
print(f"Testing Model: {model_name}")

url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
headers = {"Content-Type": "application/json"}
data = {
    "contents": [{
        "parts": [{"text": "Hello"}]
    }]
}

response = requests.post(url, headers=headers, json=data)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
