# Fixary Engine (MVP)

The Hybrid Auditor backend. Combines specific semantic targeting (Semgrep) with AI reasoning (Semgrep + PR-Agent).

## Architecture
- **Track A (AI)**: Wraps `pr-agent` (using Gemini) to find "soft" architectural issues.
- **Track B (Deterministic)**: Uses `Semgrep` to find "hard" security flaws.
- **Synthesizer**: Merges both outputs into a single JSON report.

## Setup & Run

### Prerequisites
- Python 3.9+
- Semgrep CLI (`brew install semgrep` or `pip install semgrep`)
- OpenAI/Gemini API Key (Set in `.env`)

### Quick Start
```bash
./start.sh
```

### Manual Run
```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run Server
uvicorn app.main:app --reload --port 8000
```

## API Usage
**Trigger Scan:**
```bash
curl -X POST http://localhost:8000/scan \
  -H "Content-Type: application/json" \
  -d '{"repo_url": "https://github.com/user/repo"}'
```

**Get Results:**
```bash
curl http://localhost:8000/results/{scan_id}
```
