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
  cargo          Fetch Cargo workspace dependencies

Examples:
  $(basename "$0")                    # Install everything quietly with clean logs
  $(basename "$0") npm --verbose      # Install only pip dependencies with full verbose logs
  $(basename "$0") npm cargo          # Install npm and cargo quietly
EOF
}

# Handle help flag first
handle_help show_help "$@"

# Parse global flags (sets VERBOSE) and populate TARGETS array in one clean step
parse_args TARGETS "$@"

log_info "Starting dependency installation pipeline..."

# NPM
if has_target "npm"; then
    run_step "Installing root Node modules" "npm install"

    if [ -f "mise/package.json" ]; then
        run_step "Installing frontend (mise) Node modules" "cd mise && npm install"
        log_success "NPM dependencies installed."
    else
        log_warn "'mise/package.json' not found, skipping frontend install."
    fi
fi

# Cargo
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