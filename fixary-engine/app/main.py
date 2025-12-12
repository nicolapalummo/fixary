from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import os
import shutil
from typing import Optional, Dict, Any
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from .services.git_service import GitService
from .services.semgrep_service import SemgrepService
from .services.pr_agent_service import PRAgentService
from .services.synthesizer_service import SynthesizerService

# Database
from .database import init_db, get_db
from .models import WaitlistEntry

app = FastAPI(title="Fixary Engine", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for dev simplicity (check strictness for prod)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Services
git_service = GitService()
semgrep_service = SemgrepService()
pr_agent_service = PRAgentService()
synthesizer = SynthesizerService()

# --- Schemas ---
class ScanRequest(BaseModel):
    repo_url: str

class ScanResponse(BaseModel):
    id: str
    status: str
    message: str

class WaitlistRequest(BaseModel):
    email: EmailStr

# --- Events ---
@app.on_event("startup")
async def startup_event():
    await init_db()

# --- In-memory storage ---
scan_results = {}

async def process_scan(scan_id: str, repo_url: str):
    """
    Orchestrates the Parallel Scan & Synthesis.
    """
    try:
        scan_results[scan_id] = {"status": "cloning"}
        
        # 1. Clone
        repo_path = git_service.clone_repo(repo_url, scan_id)
        
        # 2. Parallel Execution (Synchronous for MVP simplicity, usually Async)
        scan_results[scan_id]["status"] = "scanning_track_b"
        # semgrep_results = semgrep_service.run_scan(repo_path)
        semgrep_results = {"results": []} # Mock empty semgrep for Pure AI MVP
        
        scan_results[scan_id]["status"] = "analyzing_track_a"
        ai_results = await pr_agent_service.run_ai_analysis(repo_path)
        
        # 3. Synthesis
        scan_results[scan_id]["status"] = "synthesizing"
        final_report = synthesizer.synthesize(semgrep_results, ai_results)
        
        # 4. Finalize
        scan_results[scan_id] = {
            "status": "completed",
            "result": final_report
        }
        
    except Exception as e:
        scan_results[scan_id] = {"status": "failed", "error": str(e)}
    finally:
        # Cleanup
        git_service.cleanup(repo_path)

@app.get("/")
def read_root():
    return {"status": "online", "service": "Fixary Engine (Hybrid Auditor)"}

@app.post("/scan", response_model=ScanResponse)
async def trigger_scan(request: ScanRequest, background_tasks: BackgroundTasks):
    """
    Trigger a hybrid audit scan for a GitHub repository.
    """
    if not request.repo_url.startswith("https://github.com/"):
        raise HTTPException(status_code=400, detail="Invalid GitHub URL")

    scan_id = "scan_" + os.urandom(4).hex()
    
    # Start processing in background
    background_tasks.add_task(process_scan, scan_id, request.repo_url)
    
    return {
        "id": scan_id,
        "status": "queued",
        "message": f"Scan initiated for {request.repo_url}"
    }

@app.get("/results/{scan_id}")
async def get_results(scan_id: str):
    result = scan_results.get(scan_id)
    if not result:
        raise HTTPException(status_code=404, detail="Scan not found")
    return result

@app.post("/waitlist")
async def join_waitlist(request: WaitlistRequest, db: AsyncSession = Depends(get_db)):
    """
    Add an email to the waitlist.
    """
    # Check if exists
    result = await db.execute(select(WaitlistEntry).where(WaitlistEntry.email == request.email))
    existing = result.scalars().first()
    
    if existing:
        return {"status": "success", "message": "Email already registered."}
        
    new_entry = WaitlistEntry(email=request.email)
    db.add(new_entry)
    try:
        await db.commit()
        await db.refresh(new_entry)
        return {"status": "success", "message": "Welcome to the waiting list!"}
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail="Database error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
