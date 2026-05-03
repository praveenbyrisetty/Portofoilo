"""
Contact Form API Router
"""
import json
import os
from datetime import datetime
from fastapi import APIRouter
from models.schemas import ContactMessage, ContactResponse

router = APIRouter(prefix="/api/contact", tags=["contact"])

# Store messages in a local JSON file
MESSAGES_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "messages.json")


def _load_messages():
    """Load existing messages from file."""
    if os.path.exists(MESSAGES_FILE):
        with open(MESSAGES_FILE, "r") as f:
            return json.load(f)
    return []


def _save_messages(messages):
    """Save messages to file."""
    os.makedirs(os.path.dirname(MESSAGES_FILE), exist_ok=True)
    with open(MESSAGES_FILE, "w") as f:
        json.dump(messages, f, indent=2)


@router.post("", response_model=ContactResponse)
async def submit_contact(msg: ContactMessage):
    """Handle contact form submission."""
    messages = _load_messages()
    messages.append({
        "name": msg.name,
        "email": msg.email,
        "subject": msg.subject,
        "message": msg.message,
        "timestamp": datetime.now().isoformat()
    })
    _save_messages(messages)
    
    return ContactResponse(
        success=True,
        message=f"Thanks {msg.name}! Your message has been received. I'll get back to you soon."
    )


@router.get("/messages")
async def get_messages():
    """Retrieve all contact messages (admin use)."""
    return {"messages": _load_messages()}
