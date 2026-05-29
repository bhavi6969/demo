import torch
import torch.nn as nn
from torchvision import models
from app.core.config import settings
from app.utils.labels import CUSTOM_CNN_MAPPING
import numpy as np
import cv2
import base64

class CustomSkinCNN(nn.Module):
    """
    Placeholder for your Custom CNN Architecture (e.g. ResNet18).
    Modified to support Grad-CAM heatmap extraction.
    """
    def __init__(self, num_classes=7):
        super(CustomSkinCNN, self).__init__()
        self.model = models.resnet18(weights=None)
        num_ftrs = self.model.fc.in_features
        self.model.fc = nn.Linear(num_ftrs, num_classes)
        
        # Hooks for Grad-CAM
        self.gradients = None
        self.activations = None
        
        # Hook the last convolutional layer (layer4 in ResNet)
        target_layer = self.model.layer4[-1]
        target_layer.register_forward_hook(self.save_activation)
        target_layer.register_full_backward_hook(self.save_gradient)

    def save_activation(self, module, input, output):
        self.activations = output

    def save_gradient(self, module, grad_input, grad_output):
        self.gradients = grad_output[0]

    def forward(self, x):
        return self.model(x)

def load_custom_model(device: torch.device) -> nn.Module:
    """
    Loads the custom CNN weights from the specified path.
    """
    num_classes = len(CUSTOM_CNN_MAPPING)
    model = CustomSkinCNN(num_classes=num_classes)
    
    try:
        state_dict = torch.load(settings.CUSTOM_CNN_WEIGHTS_PATH, map_location=device)
        model.load_state_dict(state_dict)
        print(f"Successfully loaded Custom CNN from {settings.CUSTOM_CNN_WEIGHTS_PATH}")
    except Exception as e:
        print(f"Warning: Could not load Custom CNN weights from {settings.CUSTOM_CNN_WEIGHTS_PATH}. Error: {e}")
    
    model.to(device)
    model.eval() # Must be eval for inference, but we will temporarily allow gradients for Grad-CAM
    return model

def predict_custom_cnn_with_heatmap(model: nn.Module, tensor: torch.Tensor, device: torch.device, original_image: np.ndarray) -> tuple:
    """
    Runs inference and generates a Grad-CAM heatmap for the top predicted class.
    Returns: (results_dict, heatmap_base64_string)
    """
    tensor = tensor.to(device)
    tensor.requires_grad = True # Required to compute gradients for CAM
    
    # Forward pass
    model.zero_grad()
    outputs = model(tensor)
    probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
    
    # Map index to probability
    results = {}
    for idx, prob in enumerate(probabilities):
        standard_class = CUSTOM_CNN_MAPPING.get(idx, "Unknown")
        results[standard_class] = prob.item()
        
    # Find the top class index
    top_class_idx = torch.argmax(outputs[0]).item()
    
    # Backward pass for Grad-CAM on the top class
    # Even in eval() mode, we can do backward pass if we set requires_grad=True on input
    score = outputs[0][top_class_idx]
    score.backward()
    
    # Generate Heatmap if hooks fired properly
    heatmap_base64 = None
    if model.gradients is not None and model.activations is not None:
        pooled_gradients = torch.mean(model.gradients, dim=[0, 2, 3])
        activations = model.activations[0].detach()
        
        for i in range(activations.shape[0]):
            activations[i, :, :] *= pooled_gradients[i]
            
        heatmap = torch.mean(activations, dim=0).cpu().numpy()
        heatmap = np.maximum(heatmap, 0) # ReLU
        if np.max(heatmap) > 0:
            heatmap /= np.max(heatmap) # Normalize
            
        # Resize heatmap to match original image size
        heatmap_resized = cv2.resize(heatmap, (original_image.shape[1], original_image.shape[0]))
        heatmap_color = cv2.applyColorMap(np.uint8(255 * heatmap_resized), cv2.COLORMAP_JET)
        
        # Overlay heatmap on original image
        overlay = cv2.addWeighted(cv2.cvtColor(original_image, cv2.COLOR_RGB2BGR), 0.6, heatmap_color, 0.4, 0)
        
        # Convert to Base64
        _, buffer = cv2.imencode('.jpg', overlay)
        heatmap_base64 = "data:image/jpeg;base64," + base64.b64encode(buffer).decode('utf-8')
        
    return results, heatmap_base64
