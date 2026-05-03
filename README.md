# Interactive Terminal Portfolio

An immersive, dual-mode professional portfolio featuring a 3D interactive 'Hacker Mode', a custom terminal file explorer, and advanced animations built with React and FastAPI.

## Features

- **Dual-Mode Interface:** Switch seamlessly between a sleek professional view and an immersive 3D terminal interface.
- **Terminal Explorer:** Navigate projects and skills using a custom-built file tree mimicking a real terminal environment.
- **3D Interactive Cards:** Engaging flip-card layouts for showcasing project details and architecture.
- **Backend API:** FastAPI backend serving dynamic portfolio data.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Python, FastAPI, Uvicorn

## Getting Started

### Prerequisites
- Node.js
- Python

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Start the Backend:**
   ```bash
   cd backend
   # Optional: Create and activate a virtual environment
   # python -m venv venv
   # .\venv\Scripts\activate  (Windows) or source venv/bin/activate (Mac/Linux)
   pip install -r requirements.txt
   python -m uvicorn main:app --reload
   ```

3. **Start the Frontend:**
   ```bash
   # In a new terminal window/tab
   cd frontend
   npm install
   npm run dev
   ```
