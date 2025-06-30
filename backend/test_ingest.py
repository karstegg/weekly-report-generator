import requests
import json

url = "http://localhost:8000/whatsapp/ingest"

with open('temp_payload.json', 'r') as f:
    payload = json.load(f)

try:
    response = requests.post(url, json=payload)
    response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)
    print("Request successful!")
    print("Response JSON:", response.json())
except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")
