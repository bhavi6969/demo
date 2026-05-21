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

# 5. Load PyTorch Model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = None

try:
    # Try loading as a full PyTorch model object first
    model = torch.load(model_target, map_location=device)
    
    # If the loaded object is a dictionary (state dict, checkpoint, etc.), extract the model if possible
    if isinstance(model, dict):
        if 'model' in model:
            model = model['model']
        else:
            # It's a raw state dict, meaning we need the original class definition.
            # We print a helpful error since we don't have the custom CNN class definition.
            print_error("Loaded model weight is a state_dict rather than the full model object. Please provide the model class architecture code.")

    # Put in evaluation mode
    if hasattr(model, 'eval'):
        model.eval()
    else:
         print_error("Loaded object is not a valid PyTorch model (missing eval() method).")
         
except Exception as e:
    # Check if they trained it using YOLO (Ultralytics)
    try:
        from ultralytics import YOLO
        yolo_model = YOLO(model_target)
        # If it's YOLO classification, load the underlying torch model
        model = yolo_model.model
        model.to(device)
        model.eval()
    except Exception as yolo_err:
        print_error(f"Failed to load PyTorch model. Standard PyTorch load error: {str(e)}. YOLO load error: {str(yolo_err)}")

# 6. Image Preprocessing
try:
    img = Image.open(image_path).convert('RGB')
    
    # Standard classification transform
    preprocess = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])
    
    input_tensor = preprocess(img)
    input_batch = input_tensor.unsqueeze(0).to(device) # create a mini-batch as expected by the model
except Exception as e:
    print_error(f"Image preprocessing failed: {str(e)}")

# 7. Model Inference
try:
    with torch.no_grad():
        output = model(input_batch)
        
        # If output is a list/tuple (common in YOLO outputs), extract the primary tensor
        if isinstance(output, (list, tuple)):
            output = output[0]
            
        probabilities = torch.nn.functional.softmax(output[0], dim=0)
        
    # Get highest probability class
    confidence, class_idx_tensor = torch.max(probabilities, 0)
    class_idx = str(class_idx_tensor.item())
    confidence_val = confidence.item()
    
    # Resolve class name from index
    predicted_class_name = class_indices.get(class_idx, "Unknown")
    
    # Output successful prediction
    result = {
        "success": True,
        "class_id": class_idx,
        "class_name": predicted_class_name,
        "confidence": confidence_val
    }
    print(json.dumps(result))

except Exception as e:
    print_error(f"Model inference failed: {str(e)}")
