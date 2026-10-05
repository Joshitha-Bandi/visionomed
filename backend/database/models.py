from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from .config import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    preferred_language = Column(String, default="en")
    created_at = Column(DateTime, default=datetime.now(timezone.utc))

class Prescription(Base):
    __tablename__ = "prescriptions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    doctor_name = Column(String, nullable=True)
    hospital_name = Column(String, nullable=True)
    date = Column(DateTime, default=datetime.now(timezone.utc))
    status = Column(String, default="pending") # pending, verified, reviewed
    file_path = Column(String, nullable=True)
    
    user = relationship("User")
    medicines = relationship("PrescriptionMedicine", back_populates="prescription")

class PrescriptionMedicine(Base):
    __tablename__ = "prescription_medicines"
    
    id = Column(Integer, primary_key=True, index=True)
    prescription_id = Column(Integer, ForeignKey("prescriptions.id"))
    name = Column(String, index=True)
    strength = Column(String, nullable=True)
    form = Column(String, nullable=True)
    dose = Column(String, nullable=True)
    frequency = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    route = Column(String, nullable=True)
    instructions = Column(String, nullable=True)
    ocr_confidence = Column(Float, nullable=True)
    
    prescription = relationship("Prescription", back_populates="medicines")

class VerificationResult(Base):
    __tablename__ = "verification_results"
    
    id = Column(Integer, primary_key=True, index=True)
    prescription_id = Column(Integer, ForeignKey("prescriptions.id"))
    overall_status = Column(String) # ok, review, warning
    duplicate_medication_status = Column(String)
    drug_interaction_status = Column(String)
    allergy_screening_status = Column(String)
    dosage_concern = Column(String, nullable=True)
    
    # VisionoVerify: Authenticity Fields
    authenticity_status = Column(String, default="Unable to Assess")
    tampering_detected = Column(Boolean, default=False)
    structure_check_status = Column(String, nullable=True)
    doctor_verification_status = Column(String, nullable=True)
    hospital_verification_status = Column(String, nullable=True)
    signature_detected = Column(Boolean, nullable=True)
    qr_code_detected = Column(Boolean, default=False)

class Reminder(Base):
    __tablename__ = "reminders"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    medicine_name = Column(String)
    dose = Column(String)
    time_of_day = Column(String) # Morning, Afternoon, Night
    status = Column(String, default="pending") # taken, pending, skipped
    
    user = relationship("User")
