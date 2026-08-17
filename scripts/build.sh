#!/usr/bin/env bash
# ==============================================================================
# Script Name: build.sh
# Description: Runs model generation and builds the Tauri application.
# Usage: ./scripts/build.sh [dev|prod] [--info|-v]
# ==============================================================================

set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/utils/logger.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utils/parsers.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utils/wrappers.sh"

show_help() {
    cat << EOF
Usage: $(basename "$0") [MODE] [OPTIONS]

Modes:
  dev      Build Tauri app in development/debug mode (default)
  prod     Build Tauri app in production/release mode

Options:
  -h, --help        Display this help menu
  -v, --verbose     Enable verbose output (dump full command logs)
EOF
}

handle_help show_help "$@"
parse_args TARGETS "$@"

# Determine mode from the first non-flag argument
BUILD_MODE="${TARGETS[0]}"
if [ "$BUILD_MODE" = "all" ]; then
    BUILD_MODE="dev"
fi

log_info "Running model generation pipeline before build..."
npm run db:generate

if [ "$BUILD_MODE" = "dev" ]; then
    run_step "Building Tauri app (Development / Debug Mode)" "cd mise && npm run tauri build -- --debug"
    log_success "Development build complete! Binary located in mise/src-tauri/target/debug/"
elif [ "$BUILD_MODE" = "prod" ]; then
    run_step "Building Tauri app (Production / Release Mode)" "cd mise && npm run tauri build"
    log_success "Production build complete! Artifacts located in mise/src-tauri/target/release/bundle/"
else
    log_error "Unknown build mode: '$BUILD_MODE'. Use 'dev' or 'prod'."
fi