import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
from app.core.config import settings
from app.utils.labels import map_hf_label_to_standard

class HFModelWrapper:
    def __init__(self, model_id: str, device: torch.device):
        self.model_id = model_id
        self.device = device
        print(f"Loading HF Model: {model_id}...")
        try:
            self.processor = AutoImageProcessor.from_pretrained(model_id)
            self.model = AutoModelForImageClassification.from_pretrained(model_id).to(device)
            self.model.eval()
            print(f"Successfully loaded {model_id}")
        except Exception as e:
            print(f"Error loading {model_id}: {e}")
            self.processor = None
            self.model = None

    def predict(self, image: Image.Image) -> dict:
        if self.model is None or self.processor is None:
            return {}

        inputs = self.processor(images=image, return_tensors="pt").to(self.device)
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            logits = outputs.logits
            probabilities = torch.nn.functional.softmax(logits, dim=-1)[0]
        
        # Map output indices to standard labels
        results = {}
        for idx, prob in enumerate(probabilities):
            hf_label = self.model.config.id2label[idx]
            standard_class = map_hf_label_to_standard(hf_label)
            
            # If multiple hf_labels map to the same standard class, accumulate their probabilities
            if standard_class in results:
                results[standard_class] += prob.item()
            else:
                results[standard_class] = prob.item()
                
        return results

# Singleton instances will be created in ensemble.py
