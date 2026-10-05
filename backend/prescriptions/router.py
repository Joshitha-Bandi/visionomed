from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/prescriptions", tags=["prescriptions"])

class Medicine(BaseModel):
    name: str
    strength: str
    dose: str
    frequency: str
    confidence: float

class PrescriptionResponse(BaseModel):
    id: str
    medicines: List[Medicine]
    status: str

@router.post("/upload", response_model=PrescriptionResponse)
async def upload_prescription(file: UploadFile = File(...)):
    # Mocking the upload and OCR process
    return {
        "id": "mock-uuid-1234",
        "medicines": [
            {
                "name": "Amoxicillin",
                "strength": "500mg",
                "dose": "1 tablet",
                "frequency": "Twice daily",
                "confidence": 94.0
            },
            {
                "name": "Paracetamol",
                "strength": "650mg",
                "dose": "1 tablet",
                "frequency": "As needed",
                "confidence": 48.0
            }
        ],
        "status": "extracted"
    }

@router.post("/{id}/verify")
async def verify_prescription(id: str):
    return {
        "status": "verified",
        "safety_checks": {
            "duplicate_medication": "None Detected",
            "drug_interaction": "Verified",
            "allergy_screening": "No Conflict",
            "dosage_concern": "Review Recommended"
        },
        "visionoverify": {
            "authenticity_status": "Verification Recommended",
            "tampering_analysis": "No obvious signs of digital editing detected.",
            "structure_check": "Patient and hospital details found. Missing signature.",
            "doctor_info": {
                "name": "Dr. Sharma",
                "registration": "Unknown",
                "verification_status": "Unable to verify registration"
            },
            "hospital_info": {
                "name": "City Care Hospital",
                "verification_status": "Information match unverified"
            },
            "signature_detected": False,
            "digital_signature_verified": False,
            "qr_code_detected": False,
            "consistency_check": "Dosage information for one medicine requires review."
        }
    }
