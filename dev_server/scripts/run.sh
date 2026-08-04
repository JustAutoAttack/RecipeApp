#!/bin/bash

# Find the directory where this script lives and locate project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEV_SERVER_DIR="$(dirname "$SCRIPT_DIR")"

# Navigate to dev_server directory
cd "$DEV_SERVER_DIR"

# Verify virtual environment binary exists
if [ ! -f "venv/bin/uvicorn" ]; then
    echo "Error: Uvicorn not found in virtual environment at $DEV_SERVER_DIR/venv/bin/uvicorn"
    exit 1
fi

# Set PYTHONPATH to the src directory so modules resolve correctly
export PYTHONPATH="$DEV_SERVER_DIR/src"

# Run the FastAPI server using the explicit venv binary
./venv/bin/uvicorn src.main:app --reload --host 127.0.0.1 --port 8000