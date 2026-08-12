#!/usr/bin/env bash
# ==============================================================================
# Script Name: generate-models.sh
# Description: Generates backend Rust models and exports type-safe TS DTOs & Enums.
# Usage: ./scripts/generate-models.sh [--verbose|-v]
# ==============================================================================

set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/utils/logger.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utils/parsers.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utils/wrappers.sh"

show_help() {
    cat << EOF
Usage: $(basename "$0") [OPTIONS]

Description:
  Initializes a temporary SQLite database from schema.sql, generates backend
  Rust Sea-ORM entities, and exports type-safe TypeScript DTOs and Enums via cargo test.

Options:
  -h, --help        Display this help menu
  -v --verbose      Enable verbose output (dump full command logs)
EOF
}

handle_help show_help "$@"
parse_args TARGETS "$@"

DB_FILE="database/temp_codegen.db"
SCHEMA_FILE="database/schema.sql"
RUST_OUTPUT="mise/src-tauri/src/database/models/tables"

TS_GENERATED_DIR="mise/src/core/types/generated"
DTO_DIR="$TS_GENERATED_DIR/dto"
ENUMS_DIR="$TS_GENERATED_DIR/enums"

if [ ! -f "$SCHEMA_FILE" ]; then
    log_error "Master schema not found at $SCHEMA_FILE"
fi

rm -f "$DB_FILE"

run_step "Initializing temporary database from schema" "python3 -c \"import sqlite3; conn = sqlite3.connect('$DB_FILE'); cursor = conn.cursor(); cursor.executescript(open('$SCHEMA_FILE').read()); conn.commit(); conn.close()\""

if [ -d "mise/src-tauri" ]; then
    TEMP_RS_OUTPUT="mise/src-tauri/src/entities_temp"
    
    run_step "Generating Rust database entities" \
        "sea-orm-cli generate entity -u \"sqlite://$DB_FILE\" -o \"$TEMP_RS_OUTPUT\" --with-serde both"
    
    mkdir -p "$RUST_OUTPUT"
    rm -rf "$RUST_OUTPUT"/*
    mv "$TEMP_RS_OUTPUT"/* "$RUST_OUTPUT"/
    rm -rf "$TEMP_RS_OUTPUT"

    if [ -f "$RUST_OUTPUT/prelude.rs" ]; then
        python3 -c "
path = '$RUST_OUTPUT/prelude.rs'
with open(path, 'r') as f:
    content = f.read()
if '#![allow(unused_imports)]' not in content:
    with open(path, 'w') as f:
        f.write('#![allow(unused_imports)]\n' + content)
"
    fi

    mkdir -p "$DTO_DIR" "$ENUMS_DIR"

    run_step "Exporting TypeScript DTO & Enum definitions" "cd mise/src-tauri && cargo test export_"

    if [ -d "$DTO_DIR" ]; then
        echo "" > "$DTO_DIR/index.ts"
        for f in "$DTO_DIR"/*.ts; do
            if [ -f "$f" ] && [ "$(basename "$f")" != "index.ts" ]; then
                filename=$(basename "$f" .ts)
                echo "export * from './$filename';" >> "$DTO_DIR/index.ts"
            fi
        done
    fi

    if [ -d "$ENUMS_DIR" ]; then
        echo "" > "$ENUMS_DIR/index.ts"
        for f in "$ENUMS_DIR"/*.ts; do
            if [ -f "$f" ] && [ "$(basename "$f")" != "index.ts" ]; then
                filename=$(basename "$f" .ts)
                echo "export * from './$filename';" >> "$ENUMS_DIR/index.ts"
            fi
        done
    fi
else
    log_warn "mise/src-tauri directory not found, skipping Rust entity generation."
fi

run_step "Cleaning up temporary database" "rm -f \"$DB_FILE\""

log_success "Model generation completed successfully!"