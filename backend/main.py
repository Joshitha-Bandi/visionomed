from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prescriptions.router import router as prescriptions_router
from auth.router import router as auth_router
from database.config import engine, Base
from database import models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="VisionoMed API",
    description="AI-Powered Prescription & Patient Safety Platform",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(prescriptions_router)

@app.get("/")
def read_root():
    return {"status": "VisionoMed Backend is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
