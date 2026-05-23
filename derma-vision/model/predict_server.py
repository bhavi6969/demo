import os
import sys
import json
import torch
from http.server import BaseHTTPRequestHandler, HTTPServer
import socket

# Ensure stdout is in UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# Global variables for model
yolo_model = None
pytorch_model = None
device = None
class_indices = {}
model_target = None
yolo_success = False

# 1. Device Setup
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# 2. Load Class Indices
current_dir = os.path.dirname(os.path.abspath(__file__))
class_indices_path = os.path.join(current_dir, "class_indices.json")

try:
    with open(class_indices_path, 'r') as f:
        class_indices = json.load(f)
except Exception as e:
    print(f"Failed to read class_indices.json: {str(e)}", file=sys.stderr)
    sys.exit(1)

# 3. Resolve Model Path
model_file_path = os.path.join(current_dir, "best.pt")
model_folder_path = os.path.join(current_dir, "best.pt (1)", "best")

if os.path.exists(model_file_path) and os.path.isfile(model_file_path):
    model_target = model_file_path
elif os.path.exists(model_folder_path):
    model_target = model_folder_path
else:
    print("Model weights not found.", file=sys.stderr)
    sys.exit(1)

# 4. Load the model once
print("Loading model...", file=sys.stderr)
try:
    from ultralytics import YOLO
    yolo_model = YOLO(model_target)
    yolo_success = True
    print("YOLO model loaded successfully.", file=sys.stderr)
except Exception as yolo_err:
    print(f"YOLO load failed: {str(yolo_err)}. Trying standard PyTorch load...", file=sys.stderr)
    yolo_success = False

if not yolo_success:
    try:
        pytorch_model = torch.load(model_target, map_location=device, weights_only=False)
        if isinstance(pytorch_model, dict) and 'model' in pytorch_model:
            pytorch_model = pytorch_model['model']
        if hasattr(pytorch_model, 'eval'):
            pytorch_model.eval()
        print("PyTorch model loaded successfully.", file=sys.stderr)
    except Exception as py_err:
        print(f"PyTorch model load failed: {str(py_err)}", file=sys.stderr)
        sys.exit(1)

# HTTP Request Handler
class PredictionHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Suppress logging request details to stdout to avoid cluttering Node.js parent process
        pass

    def do_POST(self):
        if self.path == '/predict':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                req_data = json.loads(post_data.decode('utf-8'))
                image_path = req_data.get('image_path')
            except Exception as e:
                self.send_error_response("Invalid JSON input")
                return

            if not image_path or not os.path.exists(image_path):
                self.send_error_response(f"Image not found at path: {image_path}")
                return

            # Perform prediction
            result = self.predict(image_path)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def send_error_response(self, error_msg):
        self.send_response(400)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"success": False, "error": error_msg}).encode('utf-8'))

    def predict(self, image_path):
        global yolo_model, pytorch_model, device, class_indices, yolo_success
        if yolo_success:
            try:
                results = yolo_model.predict(source=image_path, device=device, verbose=False)
                if len(results) > 0 and hasattr(results[0], 'probs') and results[0].probs is not None:
                    r = results[0]
                    probs = r.probs
                    
                    # Get top 3 predictions
                    top3_indices = probs.top5[:3]  # top5 is already sorted descending
                    predictions = []
                    for idx_tensor in top3_indices:
                        idx = int(idx_tensor)
                        class_idx = str(idx)
                        conf = probs.data[idx].item()
                        name = class_indices.get(class_idx, r.names.get(idx, "Unknown"))
                        predictions.append({
                            "class_id": class_idx,
                            "class_name": name,
                            "confidence": conf
                        })
                    
                    primary = predictions[0]
                    return {
                        "success": True,
                        "class_id": primary["class_id"],
                        "class_name": primary["class_name"],
                        "confidence": primary["confidence"],
                        "predictions": predictions
                    }
            except Exception as e:
                return {"success": False, "error": f"YOLO prediction failed: {str(e)}"}
        
        # PyTorch fallback
        if pytorch_model is not None:
            try:
                from PIL import Image
                import torchvision.transforms as transforms
                
                img = Image.open(image_path).convert('RGB')
                preprocess = transforms.Compose([
                    transforms.Resize((224, 224)),
                    transforms.ToTensor(),
                    transforms.Normalize(
                        mean=[0.485, 0.456, 0.406],
                        std=[0.229, 0.224, 0.225]
                    )
                ])
                input_tensor = preprocess(img)
                input_batch = input_tensor.unsqueeze(0).to(device)
                
                with torch.no_grad():
                    output = pytorch_model(input_batch)
                    if isinstance(output, (list, tuple)):
                        output = output[0]
                    probabilities = torch.nn.functional.softmax(output[0], dim=0)
                
                # Get top 3 predictions
                num_classes = len(probabilities)
                k = min(3, num_classes)
                topk_confs, topk_indices = torch.topk(probabilities, k)
                
                predictions = []
                for idx_tensor, conf_tensor in zip(topk_indices, topk_confs):
                    idx = idx_tensor.item()
                    class_idx = str(idx)
                    conf = conf_tensor.item()
                    name = class_indices.get(class_idx, "Unknown")
                    predictions.append({
                        "class_id": class_idx,
                        "class_name": name,
                        "confidence": conf
                    })
                
                primary = predictions[0]
                return {
                    "success": True,
                    "class_id": primary["class_id"],
                    "class_name": primary["class_name"],
                    "confidence": primary["confidence"],
                    "predictions": predictions
                }
            except Exception as e:
                return {"success": False, "error": f"PyTorch prediction failed: {str(e)}"}

        return {"success": False, "error": "No model loaded"}

def run_server():
    # Bind to port 0 to let the OS choose a free port automatically
    server_address = ('127.0.0.1', 0)
    httpd = HTTPServer(server_address, PredictionHandler)
    port = httpd.server_address[1]
    
    # Print the port so the Node.js server knows where to connect
    print(f"PORT:{port}", flush=True)
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()

if __name__ == '__main__':
    run_server()
