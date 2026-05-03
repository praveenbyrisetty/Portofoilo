"""
CyberForge Portfolio — FastAPI Backend
Serves portfolio data for Praveen Kumar Byrisetty's SOC Analyst portfolio.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import projects, skills, profile, contact, labs

app = FastAPI(
    title="CyberForge Portfolio API",
    description="Backend API for Praveen Kumar Byrisetty's cybersecurity portfolio",
    version="1.0.0",
    redirect_slashes=False
)

# CORS — allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(projects.router)
app.include_router(skills.router)
app.include_router(profile.router)
app.include_router(contact.router)
app.include_router(labs.router)


@app.get("/")
async def root():
    return {
        "name": "CyberForge Portfolio API",
        "version": "1.0.0",
        "status": "operational",
        "endpoints": [
            "/api/profile",
            "/api/projects",
            "/api/projects/{id}",
            "/api/skills",
            "/api/timeline",
            "/api/contact"
        ]
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}
