#!/usr/bin/env bash
# ==============================================================================
# Script Name: run.sh
# Description: Launches the monorepo application environments (dev/prod).
# Usage: ./scripts/run.sh [dev|prod] [--info|-v]
# ==============================================================================

set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/utils/logger.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utils/parsers.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utils/wrappers.sh"

show_help() {
    cat << EOF
Usage: $(basename "$0") [MODE] [OPTIONS]

Modes:
  dev      Start python backend and Tauri frontend in development mode (default)
  prod     Run production checks and build/launch Tauri app

Options:
  -h, --help        Display this help menu
  -v, --verbose     Enable verbose output (dump full command logs)
EOF
}

handle_help show_help "$@"
parse_args TARGETS "$@"

MODE="${TARGETS[0]}"
if [ "$MODE" = "all" ]; then
    MODE="dev"
fi

log_info "Running model generation pipeline..."
npm run db:generate

if [ "$MODE" = "dev" ]; then
    log_info "Starting development environment..."
    
    log_info "Launching python dev_server..."
    if [ ! -d "dev_server/.venv" ]; then
        log_error "Python virtual environment not found in dev_server/.venv. Run install-requirements.sh first."
    fi

    # Start python server in a sandboxed background subshell
    (
        cd dev_server
        source .venv/bin/activate
        python main.py
    ) &
    SERVER_PID=$!

    # Gracefully terminate the python server on script exit
    trap "log_warn 'Stopping dev_server...'; kill $SERVER_PID 2>/dev/null || true" EXIT

    sleep 2

    log_info "Launching Tauri (dev mode)..."
    (cd mise && npm run tauri dev)

elif [ "$MODE" = "prod" ]; then
    log_info "Running production pre-flight checks..."
    run_step "Building and launching Tauri (production)" "cd mise && npm run tauri build"
else
    log_error "Unknown mode: '$MODE'. Use 'dev' or 'prod'."
fi