"""
Projects API Router
"""
from fastapi import APIRouter, HTTPException
from data.portfolio import PROJECTS

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("")
async def get_all_projects():
    """Return all projects with their case studies."""
    return {"projects": PROJECTS}


@router.get("/{project_id}")
async def get_project(project_id: str):
    """Return a single project by ID."""
    project = next((p for p in PROJECTS if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
