# Ensure we are in the script's directory
cd "$(dirname "$0")"

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed."
    exit 1
fi

# Check for Semgrep
if ! command -v semgrep &> /dev/null; then
    echo "⚠️  Semgrep is not found. Installing via pip..."
    pip install semgrep
fi

# Create venv if not exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install deps
echo "⬇️  Installing dependencies..."
pip install -r requirements.txt

# Run server
echo "✨ Server starting on http://localhost:8000"
uvicorn app.main:app --reload --port 8000
