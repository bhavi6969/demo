from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints import router as api_router
from app.models.ensemble import get_ensemble

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Skin Disease Detection using an Ensemble of 4 AI Models.",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def startup_event():
    # Initialize the ensemble on startup to load all weights into memory
    print("Starting up and loading models...")
    get_ensemble()
    print("Startup complete.")

@app.get("/")
def root():
    return {"message": "Welcome to the Multi-Model Skin Disease Detection API. Visit /docs for the interactive API documentation."}
