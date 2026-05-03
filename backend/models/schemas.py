"""
Pydantic models for API response schemas.
"""
from pydantic import BaseModel, EmailStr
from typing import Optional


class ContactMessage(BaseModel):
    """Contact form submission."""
    name: str
    email: str
    message: str
    subject: Optional[str] = "Portfolio Contact"


class ContactResponse(BaseModel):
    """Response after contact form submission."""
    success: bool
    message: str
