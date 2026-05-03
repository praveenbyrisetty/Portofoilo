"""
Skills & Tools API Router
"""
from fastapi import APIRouter
from data.portfolio import SKILLS, TOOLS, SKILL_MATRIX

router = APIRouter(prefix="/api/skills", tags=["skills"])


@router.get("")
async def get_skills():
    """Return all skill categories, tools, and the matrix."""
    return {"skills": SKILLS, "tools": TOOLS, "matrix": SKILL_MATRIX}
