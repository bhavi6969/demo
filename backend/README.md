# Multi-Model AI Skin Disease Detection API

This project provides a production-ready FastAPI backend that runs an ensemble of 4 Artificial Intelligence models for skin disease classification. 

The models integrated are:
1. Custom CNN (loaded from local `best.pt`)
2. ISIC Model (Hugging Face)
3. DermNet Model (Hugging Face)
4. Vision Transformer (Hugging Face)

## Prerequisites

- Python 3.9+
- VS Code
- (Optional but recommended) NVIDIA GPU with CUDA for faster inference.

## VS Code Setup & Installation

1. **Open the `backend` folder** in VS Code.

2. **Create a Virtual Environment**:
   Open a terminal in VS Code (`Ctrl+` ` ` or `View > Terminal`) and run:
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**:
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Place Custom Weights**:
   Create a `models` folder inside `backend` and place your custom trained weights file there:
   ```bash
   mkdir models
   # Move your best.pt into backend/models/best.pt
   ```

## Running the Application

To start the FastAPI server locally:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The server will start at `http://localhost:8000`.

## Testing the API

### Interactive API Docs (Swagger UI)
Open your browser and navigate to:
`http://localhost:8000/docs`

You can use the interactive UI to upload an image to the `/api/v1/predict` endpoint and see the JSON response, which includes the prediction, confidence, and treatment plan.

### Example Inference Code (Python)

```python
import requests

url = "http://localhost:8000/api/v1/predict"
image_path = "path/to/your/skin_lesion.jpg"

with open(image_path, "rb") as image_file:
    files = {"file": (image_path, image_file, "image/jpeg")}
    response = requests.post(url, files=files)

print(response.json())
```

### Example using cURL
```bash
curl -X 'POST' \
  'http://localhost:8000/api/v1/predict' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@path/to/your/skin_lesion.jpg;type=image/jpeg'
```

## Best Practices for Medical AI Deployment

- **Data Privacy**: Ensure all patient images are anonymized before being sent to the backend. Do not store images longer than necessary.
- **Hardware Acceleration**: Use GPUs for production deployments to handle concurrent inference requests effectively (e.g., using NVIDIA Triton or torchserve in conjunction with FastAPI).
- **Monitoring**: Implement logging to track model confidence distributions in production. Sudden shifts might indicate data drift.
- **Fail-safes**: Never use this system as a sole diagnostic tool. The UI should explicitly state that predictions must be verified by a medical professional.
- **Model Updating**: Periodically retrain your Custom CNN with new verified data and update the `best.pt` file.
