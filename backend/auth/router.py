from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api/auth", tags=["auth"])

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    preferred_language: Optional[str] = "en"

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/register", response_model=Token)
async def register(user: UserCreate):
    # Mock registration
    return {"access_token": "mock-jwt-token-123", "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    # Mock login
    if user.email == "test@visionomed.com" and user.password == "password":
        return {"access_token": "mock-jwt-token-123", "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/logout")
async def logout():
    return {"status": "Logged out successfully"}
