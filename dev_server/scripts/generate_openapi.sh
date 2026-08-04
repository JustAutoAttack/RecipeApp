#!/bin/bash

# Find directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEV_SERVER_DIR="$(dirname "$SCRIPT_DIR")"

# Navigate to dev_server directory
cd "$DEV_SERVER_DIR"

# Verify virtual environment exists
if [ ! -f "venv/bin/python" ]; then
    echo "Error: Virtual environment python not found at $DEV_SERVER_DIR/venv/bin/python"
    exit 1
fi

# Set PYTHONPATH to src and execute using the explicit venv python binary
export PYTHONPATH="src"
./venv/bin/python src/generate_schema.py