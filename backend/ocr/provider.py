from abc import ABC, abstractmethod
from typing import Dict, Any

class OCRProvider(ABC):
    @abstractmethod
    def extract_text(self, image_path: str) -> Dict[str, Any]:
        pass

class MockOCRProvider(OCRProvider):
    def extract_text(self, image_path: str) -> Dict[str, Any]:
        return {
            "text": "Dr. Sharma Clinic\nPatient: John Doe\nAmoxicillin 500mg 1 tablet twice daily\nParacetamol 650mg as needed",
            "confidence": 92.5
        }

def get_ocr_provider(provider_name: str = "mock") -> OCRProvider:
    if provider_name == "mock":
        return MockOCRProvider()
    # Fallback or future implementation: EasyOCR, PaddleOCR
    return MockOCRProvider()
