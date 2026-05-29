import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Multi-Model AI Skin Disease Detection API"
    API_V1_STR: str = "/api/v1"
    
    # Model configuration
    # Weights for the ensemble (Custom CNN, ISIC Model, DermNet Model, ViT Model)
    # The user requested equal weighting.
    ENSEMBLE_WEIGHTS: list[float] = [0.25, 0.25, 0.25, 0.25]
    
    # Custom model weights path
    CUSTOM_CNN_WEIGHTS_PATH: str = os.getenv("CUSTOM_CNN_WEIGHTS_PATH", "models/best.pt")
    
    # Hugging Face model IDs (using some standard robust baseline model paths)
    HF_ISIC_MODEL_ID: str = os.getenv("HF_ISIC_MODEL_ID", "Anzor/autotrain-skin-cancer-classification-800024443")
    HF_DERMNET_MODEL_ID: str = os.getenv("HF_DERMNET_MODEL_ID", "google/vit-base-patch16-224") # Base model as fallback
    HF_VIT_MODEL_ID: str = os.getenv("HF_VIT_MODEL_ID", "google/vit-base-patch16-224") # Base ViT

settings = Settings()
