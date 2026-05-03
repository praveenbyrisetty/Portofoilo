"""
Profile & Timeline API Router
"""
from fastapi import APIRouter
from data.portfolio import PROFILE, TIMELINE

router = APIRouter(prefix="/api", tags=["profile"])


@router.get("/profile")
async def get_profile():
    """Return profile/about data."""
    return PROFILE


@router.get("/timeline")
async def get_timeline():
    """Return journey timeline entries."""
    return {"timeline": TIMELINE}
