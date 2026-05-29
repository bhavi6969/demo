from PIL import Image
import torch
from torchvision import transforms
import io

# Define standard transformation for Custom CNN
# Adjust mean and std if your custom CNN uses different normalization
custom_cnn_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def load_image_from_bytes(image_bytes: bytes) -> Image.Image:
    """
    Loads a PIL Image from raw bytes.
    """
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        return img
    except Exception as e:
        raise ValueError(f"Invalid image format: {e}")

def preprocess_for_custom_cnn(img: Image.Image) -> torch.Tensor:
    """
    Applies torchvision transforms to prepare the image for the Custom CNN.
    Adds a batch dimension.
    """
    tensor = custom_cnn_transform(img)
    return tensor.unsqueeze(0)  # Add batch dimension [1, C, H, W]
