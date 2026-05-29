from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from app.models.ensemble import get_ensemble
from app.models.preprocessing import load_image_from_bytes
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/predict", summary="Predict skin disease from an image")
async def predict_image(image: UploadFile = File(...)):
    """
    Upload an image of a skin lesion.
    The system will run inference using an ensemble of 4 models:
    - Custom CNN
    - ISIC Model
    - DermNet Model
    - Vision Transformer
    
    Returns the predicted disease and confidence scores aligned with the UI.
    """
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

    try:
        image_bytes = await image.read()
        pil_image = load_image_from_bytes(image_bytes)
        
        ensemble = get_ensemble()
        result = ensemble.predict(pil_image)
        
        return JSONResponse(content=result)
        
    except Exception as e:
        logger.error(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.get("/health", summary="Health Check")
async def health_check():
    """
    Verify the backend is up and running.
    """
    return {"status": "ok", "message": "Multi-Model Skin Disease API is running."}
