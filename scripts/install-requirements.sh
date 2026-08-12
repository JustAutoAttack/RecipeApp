#!/usr/bin/env bash
# ==============================================================================
# Script Name: install-requirements.sh
# Description: Target-agnostic dependency installer with modular utilities.
# Usage: ./scripts/install-requirements.sh [targets...] [--info|-v]
# ==============================================================================

set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/utils/logger.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utils/parsers.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utils/wrappers.sh"

show_help() {
    cat << EOF
Usage: $(basename "$0") [TARGETS...] [OPTIONS]

Options:
  -h, --help        Display this help menu
  -v, --verbose     Enable verbose output (dump full command logs)

Targets:
  all            Install dependencies across all runtimes (default)
  npm            Install root and frontend Node modules
  pip            Set up virtual environment and install Python packages
  cargo          Fetch Cargo workspace dependencies

Examples:
  $(basename "$0")                    # Install everything quietly with clean logs
  $(basename "$0") pip --verbose      # Install only pip dependencies with full verbose logs
  $(basename "$0") npm cargo          # Install npm and cargo quietly
EOF
}

# Handle help flag first
handle_help show_help "$@"

# Parse global flags (sets VERBOSE) and populate TARGETS array in one clean step
parse_args TARGETS "$@"

log_info "Starting dependency installation pipeline..."

# 1. NPM
if has_target "npm"; then
    run_step "Installing root Node modules" "npm install"

    if [ -f "mise/package.json" ]; then
        run_step "Installing frontend (mise) Node modules" "cd mise && npm install"
        log_success "NPM dependencies installed."
    else
        log_warn "'mise/package.json' not found, skipping frontend install."
    fi
fi

# 2. Pip
if has_target "pip"; then
    if [ -d "dev_server" ]; then
        if [ ! -d "dev_server/.venv" ]; then
            run_step "Creating Python virtual environment" "cd dev_server && python3 -m venv .venv"
        fi

        run_step "Installing Python packages in dev_server" "cd dev_server && source .venv/bin/activate && pip install --upgrade pip --quiet && (if [ -f requirements.txt ]; then pip install -r requirements.txt; elif [ -f pyproject.toml ]; then pip install .; fi)"
        log_success "Python dev_server requirements installed."
    else
        log_warn "'dev_server' directory not found, skipping."
    fi
fi

# 3. Cargo
if has_target "cargo"; then
    if [ -f "Cargo.toml" ]; then
        run_step "Fetching Cargo workspace dependencies" "cargo fetch"
        log_success "Rust workspace dependencies fetched."
    elif [ -d "mise/src-tauri" ]; then
        run_step "Fetching Rust Tauri dependencies" "cd mise/src-tauri && cargo fetch"
        log_success "Rust Tauri dependencies fetched."
    else
        log_warn "No root Cargo.toml or Tauri backend found, skipping."
    fi
fi

log_success "All selected requirements installed successfully!"