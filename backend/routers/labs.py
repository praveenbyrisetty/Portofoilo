"""
Labs & Certs API Router
"""
from fastapi import APIRouter
from data.portfolio import THM_PROFILE, LABS, CERTS

router = APIRouter(prefix="/api/labs", tags=["labs"])

@router.get("")
async def get_all_labs():
    """Return TryHackMe profile, lab writeups, and certifications."""
    return {"profile": THM_PROFILE, "labs": LABS, "certs": CERTS}
