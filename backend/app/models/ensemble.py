import torch
from PIL import Image
from app.core.config import settings
from app.utils.labels import STANDARD_CLASSES, TREATMENT_PLANS
from app.models.custom_cnn import load_custom_model, predict_custom_cnn_with_heatmap
from app.models.preprocessing import preprocess_for_custom_cnn
from app.models.hf_models import HFModelWrapper
import uuid
import numpy as np

class ModelEnsemble:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"Initializing Model Ensemble on device: {self.device}")
        
        # Load Models
        self.custom_cnn = load_custom_model(self.device)
        self.hf_isic = HFModelWrapper(settings.HF_ISIC_MODEL_ID, self.device)
        self.hf_dermnet = HFModelWrapper(settings.HF_DERMNET_MODEL_ID, self.device)
        self.hf_vit = HFModelWrapper(settings.HF_VIT_MODEL_ID, self.device)
        
        self.weights = settings.ENSEMBLE_WEIGHTS

    def predict(self, image: Image.Image) -> dict:
        """
        Runs the image through all 4 models and combines predictions.
        """
        # Convert PIL image to numpy array for heatmap overlay
        original_img_np = np.array(image.convert('RGB'))
        
        # 1. Custom CNN Prediction with Heatmap
        cnn_tensor = preprocess_for_custom_cnn(image)
        cnn_preds, heatmap_b64 = predict_custom_cnn_with_heatmap(self.custom_cnn, cnn_tensor, self.device, original_img_np)
        
        # 2. HF Models Predictions
        isic_preds = self.hf_isic.predict(image)
        dermnet_preds = self.hf_dermnet.predict(image)
        vit_preds = self.hf_vit.predict(image)
        
        # Aggregate raw predictions
        all_preds = [cnn_preds, isic_preds, dermnet_preds, vit_preds]
        
        # Combine probabilities using weighted average
        ensemble_probs = {cls: 0.0 for cls in STANDARD_CLASSES}
        
        valid_models = 0
        for idx, model_preds in enumerate(all_preds):
            if not model_preds:
                continue # Skip if model failed to load
                
            weight = self.weights[idx]
            valid_models += 1
            
            for cls in STANDARD_CLASSES:
                # Add weighted probability (default to 0 if class not predicted by this model)
                ensemble_probs[cls] += model_preds.get(cls, 0.0) * weight
                
        # Normalize if some models failed
        total_weight = sum(self.weights[i] for i in range(4) if all_preds[i])
        if total_weight > 0:
            for cls in STANDARD_CLASSES:
                ensemble_probs[cls] /= total_weight
                
        # Find the class with the highest probability
        final_prediction = max(ensemble_probs.items(), key=lambda x: x[1])
        predicted_class = final_prediction[0]
        confidence = final_prediction[1]
        
        # Format predictions array for the frontend UI
        sorted_probs = sorted(ensemble_probs.items(), key=lambda x: x[1], reverse=True)
        predictions_array = []
        for cls, prob in sorted_probs:
            # Generate the ID the frontend encyclopedia uses: lowercase with underscores
            class_id = cls.lower().replace(" ", "_")
            if class_id == "infestations_bites": class_id = "infestations_bites"
            if class_id == "benign_tumors": class_id = "benign_tumors"
            if class_id == "drug_eruption": class_id = "drugeruption"
            if class_id == "seborrheic_keratoses": class_id = "seborrh_keratoses"
            if class_id == "skin_cancer": class_id = "skincancer"
            if class_id == "sun_damage": class_id = "sun_sunlight_damage"
            if class_id == "unknown_normal": class_id = "unknown_normal"
            if class_id == "vascular_tumors": class_id = "vascular_tumors"
            
            # Additional maps if needed
            if class_id == "nail_fungus": class_id = "nail_fungus"
            if class_id == "alopecia": class_id = "alopecia"
            if class_id == "urticaria": class_id = "urticaria"
            if class_id == "keloids": class_id = "keloids"
            if class_id == "herpes": class_id = "herpes"
            
            predictions_array.append({
                "class_id": class_id,
                "class_name": cls,
                "confidence": round(prob, 4)
            })
        
        return {
            "success": True,
            "class_name": predicted_class,
            "confidence": round(confidence, 4),
            "predictions": predictions_array,
            "source": "backend_ensemble",
            "scanId": f"scan-{uuid.uuid4().hex[:8]}",
            "heatmapImage": heatmap_b64
        }

# Global instance initialized in main.py
ensemble_instance = None

def get_ensemble():
    global ensemble_instance
    if ensemble_instance is None:
        ensemble_instance = ModelEnsemble()
    return ensemble_instance
