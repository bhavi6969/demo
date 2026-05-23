import os
import sys
import json

# Ensure stdout is in UTF-8
sys.stdout.reconfigure(encoding='utf-8')

def print_error(msg):
    print(json.dumps({"success": False, "error": msg}))
    sys.exit(0)

# 1. Parse Arguments
if len(sys.argv) < 2:
    print_error("No image path provided. Usage: python predict.py <image_path>")

image_path = sys.argv[1]
if not os.path.exists(image_path):
    print_error(f"Image not found at path: {image_path}")

# 2. Check Python Dependencies
try:
    from PIL import Image
except ImportError:
    print_error("PIL/Pillow is not installed. Please run: pip install pillow")

try:
    import torch
    import torchvision.transforms as transforms
except ImportError:
    print_error("PyTorch or Torchvision is not installed. Please run: pip install torch torchvision")

# 3. Load Class Indices
current_dir = os.path.dirname(os.path.abspath(__file__))
class_indices_path = os.path.join(current_dir, "class_indices.json")

if not os.path.exists(class_indices_path):
    print_error(f"class_indices.json not found at: {class_indices_path}")

try:
    with open(class_indices_path, 'r') as f:
        class_indices = json.load(f)
except Exception as e:
    print_error(f"Failed to read class_indices.json: {str(e)}")

# 4. Resolve Model Path
# Support both the zipped file best.pt and the unpacked folder best.pt (1)/best
model_file_path = os.path.join(current_dir, "best.pt")
model_folder_path = os.path.join(current_dir, "best.pt (1)", "best")

model_target = None
if os.path.exists(model_file_path) and os.path.isfile(model_file_path):
    model_target = model_file_path
elif os.path.exists(model_folder_path):
    model_target = model_folder_path
else:
    print_error("Model weights (best.pt or best.pt (1)/best directory) not found.")

# 5. Device Setup
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# 6. Try YOLO (Ultralytics) Inference First (Highly recommended for best.pt)
yolo_success = False
yolo_err_msg = ""
try:
    from ultralytics import YOLO
    yolo_model = YOLO(model_target)
    
    # Run YOLO prediction directly. YOLO handles its own optimal image loading & preprocessing internally.
    results = yolo_model.predict(source=image_path, device=device, verbose=False)
    if len(results) > 0 and hasattr(results[0], 'probs') and results[0].probs is not None:
        r = results[0]
        probs = r.probs
        
        # Get top 3 predictions
        top3_indices = probs.top5[:3]
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
        result = {
            "success": True,
            "class_id": primary["class_id"],
            "class_name": primary["class_name"],
            "confidence": primary["confidence"],
            "predictions": predictions
        }
        print(json.dumps(result))
        yolo_success = True
except Exception as yolo_err:
    yolo_err_msg = str(yolo_err)

if not yolo_success:
    # 7. Fallback to Standard PyTorch Model Inference
    model = None
    try:
        # Load with weights_only=False to allow custom architectures
        model = torch.load(model_target, map_location=device, weights_only=False)
        
        if isinstance(model, dict):
            if 'model' in model:
                model = model['model']
            else:
                print_error("Loaded model weight is a state_dict rather than the full model object. Please provide the model class architecture code.")

        if hasattr(model, 'eval'):
            model.eval()
        else:
             print_error("Loaded object is not a valid PyTorch model (missing eval() method).")
             
    except Exception as e:
        print_error(f"Failed to load PyTorch model. YOLO error: {yolo_err_msg}. PyTorch error: {str(e)}")

    # 8. Standard Image Preprocessing (ImageNet Normalization)
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
    except Exception as e:
        print_error(f"Image preprocessing failed: {str(e)}")

    # 9. Run manual PyTorch forward pass
    try:
        with torch.no_grad():
            output = model(input_batch)
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
        result = {
            "success": True,
            "class_id": primary["class_id"],
            "class_name": primary["class_name"],
            "confidence": primary["confidence"],
            "predictions": predictions
        }
        print(json.dumps(result))
    except Exception as e:
        print_error(f"Model inference failed: {str(e)}")

