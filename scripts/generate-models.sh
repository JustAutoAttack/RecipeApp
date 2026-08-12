#!/usr/bin/env bash
# ==============================================================================
# Script Name: generate-models.sh
# Description: Generates database models for TypeScript, Rust, and Python.
# Usage: ./scripts/generate-models.sh [--info|-v]
# ==============================================================================

set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/utils/logger.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utils/parsers.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utils/wrappers.sh"

show_help() {
    cat << EOF
Usage: $(basename "$0") [OPTIONS]

Description:
  Initializes a temporary SQLite database from schema.sql and generates type-safe
  models for TypeScript (sql-ts), Rust (sea-orm-cli), and Python (sqlacodegen).

Options:
  -h, --help        Display this help menu
  -v --verbose      Enable verbose output (dump full command logs)
EOF
}

handle_help show_help "$@"
parse_args TARGETS "$@"

DB_FILE="database/temp_codegen.db"
SCHEMA_FILE="database/schema.sql"
TS_CONFIG_FILE="configs/sql-ts.json"
RUST_OUTPUT="mise/src-tauri/src/entities"
PYTHON_OUTPUT="dev_server/generated/models.py"

if [ ! -f "$SCHEMA_FILE" ]; then
    log_error "Master schema not found at $SCHEMA_FILE"
fi

if [ ! -f "$TS_CONFIG_FILE" ]; then
    log_error "sql-ts configuration not found at $TS_CONFIG_FILE"
fi

run_step "Initializing temporary database from schema" "python3 -c \"import sqlite3; conn = sqlite3.connect('$DB_FILE'); cursor = conn.cursor(); cursor.executescript(open('$SCHEMA_FILE').read()); conn.commit(); conn.close()\""

run_step "Generating TypeScript database rows" "npx @rmp135/sql-ts -c \"$TS_CONFIG_FILE\""

if [ -d "mise/src-tauri" ]; then
    run_step "Generating Rust (Tauri) entities" "sea-orm-cli generate entity -u \"sqlite://$DB_FILE\" -o \"$RUST_OUTPUT\" --expanded-format"
else
    log_warn "mise/src-tauri directory not found, skipping Rust entity generation."
fi

if [ -d "dev_server" ]; then
    run_step "Generating Python SQLModel/SQLAlchemy models" "mkdir -p \"$(dirname "$PYTHON_OUTPUT")\" && sqlacodegen \"sqlite:///$DB_FILE\" --output \"$PYTHON_OUTPUT\""
else
    log_warn "dev_server directory not found, skipping Python model generation."
fi

run_step "Cleaning up temporary database" "rm -f \"$DB_FILE\""

log_success "✨ Model generation completed successfully across all languages!"