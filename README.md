# VisionoMed

**AI-Powered Prescription & Patient Safety Platform**
*Scan. Verify. Understand. Act.*

## Overview
VisionoMed is a comprehensive healthcare technology platform designed to help ordinary people understand medical prescriptions, extract information using OCR, identify potential medication safety concerns, and quickly find nearby healthcare support.

## Key Features
- **VisionoScan:** Prescription scanning and OCR using advanced computer vision.
- **VisionoAI:** AI-assisted prescription understanding and safety checks.
- **VisionoRx:** Medication information and explanations in simple language.
- **VisionoCare:** Location-based discovery of nearby hospitals and pharmacies.
- **VisionoEmergency:** Quick access to emergency contacts and facilities.
- **VisionoRemind:** Smart medication reminders and tracking.

## Architecture
- **Frontend:** React, TypeScript, Tailwind CSS, Vite.
- **Backend:** FastAPI, Python, SQLAlchemy, PostgreSQL.
- **AI & OCR:** Modular provider architecture for OCR (PaddleOCR/EasyOCR) and AI analysis.
- **Deployment:** Docker & Docker Compose.

## Getting Started
1. **Clone & Setup:**
   ```bash
   git clone <repo>
   cd visionomed
   cp .env.example .env
   ```
2. **Run with Docker:**
   ```bash
   docker-compose up --build
   ```
3. **Access Application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000/docs`

## Important Medical Disclaimer
VisionoMed is an AI-assisted healthcare information system, **NOT a doctor**.
- It does not diagnose diseases or prescribe medication.
- It does not guarantee that a prescription is safe.
- Always consult a qualified healthcare professional before making medical decisions.
- In case of an emergency, seek professional medical care immediately.

## Directory Structure
- `frontend/` - React frontend application
- `backend/` - FastAPI backend application
- `docs/` - Architecture and safety documentation
- `tests/` - System tests
