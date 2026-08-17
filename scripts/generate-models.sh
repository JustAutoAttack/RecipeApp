#!/usr/bin/env bash
# ==============================================================================
# Script Name: generate-models.sh
#
# Description:
#   Generates SeaORM entities from schema.sql and exports matching TypeScript
#   DTO definitions directly from the SQLite database schema.
#
# Usage:
#   ./scripts/generate-models.sh [--verbose|-v]
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

source "$SCRIPT_DIR/utils/logger.sh"
source "$SCRIPT_DIR/utils/parsers.sh"
source "$SCRIPT_DIR/utils/wrappers.sh"

show_help() {
    cat << EOF
Usage: $(basename "$0") [OPTIONS]

Description:
  Initializes a temporary SQLite database from schema.sql, generates SeaORM
  entities, and exports TypeScript interfaces directly from the DB schema.

Options:
  -h, --help        Display this help menu
  -v, --verbose     Enable verbose output
EOF
}

handle_help show_help "$@"
parse_args TARGETS "$@"

# ==============================================================================
# Paths
# ==============================================================================

DB_FILE="$PROJECT_ROOT/database/temp_codegen.db"
SCHEMA_FILE="$PROJECT_ROOT/database/schema.sql"

RUST_OUTPUT="$PROJECT_ROOT/mise/src-tauri/src/database/models"
TS_GENERATED_DIR="$PROJECT_ROOT/mise/src/core/types/generated"
DTO_DIR="$TS_GENERATED_DIR/dto"
ENUMS_DIR="$TS_GENERATED_DIR/enums"

# ==============================================================================
# Validation
# ==============================================================================

if [ ! -f "$SCHEMA_FILE" ]; then
    log_error "Master schema not found at $SCHEMA_FILE"
    exit 1
fi

if [ ! -d "$PROJECT_ROOT/mise/src-tauri" ]; then
    log_error "mise/src-tauri directory not found"
    exit 1
fi

# ==============================================================================
# Temporary Database
# ==============================================================================

rm -f "$DB_FILE"

run_step \
    "Initializing temporary database from schema" \
    "python3 -c \"import sqlite3; conn = sqlite3.connect('$DB_FILE'); cursor = conn.cursor(); cursor.executescript(open('$SCHEMA_FILE').read()); conn.commit(); conn.close()\""

# ==============================================================================
# Generate SeaORM Entities
# ==============================================================================

TEMP_RS_OUTPUT="$PROJECT_ROOT/mise/src-tauri/src/entities_temp"

rm -rf "$TEMP_RS_OUTPUT"

run_step \
    "Generating Rust database entities" \
    "sea-orm-cli generate entity -u \"sqlite://$DB_FILE\" -o \"$TEMP_RS_OUTPUT\" --with-serde both"

mkdir -p "$RUST_OUTPUT"
rm -rf "${RUST_OUTPUT:?}"/*
mv "$TEMP_RS_OUTPUT"/* "$RUST_OUTPUT"/
rm -rf "$TEMP_RS_OUTPUT"

# ==============================================================================
# Direct Database Schema -> TypeScript DTO Generation
# ==============================================================================

mkdir -p "$DTO_DIR" "$ENUMS_DIR"

cat << 'PYTHON' > generate_ts_dtos.py
import os
import sqlite3
import glob
import re

DB_FILE = os.environ["DB_FILE"]
DTO_DIR = os.environ["DTO_DIR"]
RUST_OUTPUT = os.environ["RUST_OUTPUT"]
PROJECT_ROOT = os.environ["PROJECT_ROOT"]

def singularize(value: str) -> str:
    if value.endswith("ies"): return value[:-3] + "y"
    if value.endswith("ses"): return value[:-2]
    if value.endswith("s") and not value.endswith("ss"): return value[:-1]
    return value

def snake_to_pascal(name: str) -> str:
    return "".join(word.capitalize() for word in name.split("_"))

def sqlite_to_ts_type(col_type: str) -> str:
    col_type = col_type.upper()
    if any(t in col_type for t in ["INT", "BIGINT", "TINYINT", "SMALLINT"]):
        return "number"
    if any(t in col_type for t in ["REAL", "FLOAT", "DOUBLE", "NUMERIC", "DECIMAL"]):
        return "number"
    if any(t in col_type for t in ["BOOL", "BOOLEAN"]):
        return "boolean"
    if any(t in col_type for t in ["TEXT", "CHAR", "VARCHAR", "CLOB", "DATE", "TIME", "DATETIME", "TIMESTAMP"]):
        return "string"
    if "BLOB" in col_type:
        return "string"
    return "any"

# --- 1. Clean up Rust files & fix inner doc comments ---
for path in glob.glob(os.path.join(RUST_OUTPUT, "*.rs")):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    content = content.replace("//! `SeaORM` Entity", "/// `SeaORM` Entity")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

# --- 2. Generate TypeScript DTOs directly from SQLite ---
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'seaql_%';")
tables = [row[0] for row in cursor.fetchall()]

for table in sorted(tables):
    singular_name = singularize(table)
    interface_name = snake_to_pascal(singular_name)

    cursor.execute(f"PRAGMA table_info('{table}')")
    columns = cursor.fetchall()  # (cid, name, type, notnull, dflt_value, pk)

    lines = [f"export interface {interface_name} {{"]
    for col in columns:
        col_name = col[1]
        col_type = col[2]
        not_null = col[3]
        is_pk = col[5]

        ts_type = sqlite_to_ts_type(col_type)
        is_nullable = (not_null == 0 and is_pk == 0)

        type_str = f"{ts_type} | null" if is_nullable else ts_type
        lines.append(f"  {col_name}: {type_str};")
    lines.append("}\n")

    file_path = os.path.join(DTO_DIR, f"{singular_name}.ts")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

conn.close()

# --- 3. SQLx FromRow compatibility structs on mod.rs ---
mod_path = os.path.join(RUST_OUTPUT, "mod.rs")
if os.path.exists(mod_path):
    with open(mod_path, "r", encoding="utf-8") as f:
        mod_content = f.read()

    marker = (
        "// ======================================================================\n"
        "// SQLx FromRow compatibility structs\n"
        "// ======================================================================"
    )

    if marker not in mod_content:
        sqlx_structs = "\n\n" + marker + "\n"
        for path in sorted(glob.glob(os.path.join(RUST_OUTPUT, "*.rs"))):
            filename = os.path.basename(path)
            if filename in ("mod.rs", "prelude.rs"):
                continue

            table_name = filename[:-3]
            singular = singularize(table_name)
            pascal_name = snake_to_pascal(singular)
            row_name = pascal_name + "Row"

            if row_name not in ("UserRow", "RecipeRow"):
                continue

            with open(path, "r", encoding="utf-8") as f:
                content = f.read()

            model_match = re.search(r"pub struct Model\s*\{(.*?)\n\}", content, re.DOTALL)
            if not model_match:
                continue

            fields = []
            for line in model_match.group(1).splitlines():
                stripped = line.strip()
                if stripped.startswith("pub ") and ":" in stripped:
                    fields.append("    " + stripped)

            if fields:
                sqlx_structs += f"""
#[derive(Clone, Debug, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct {row_name} {{
{chr(10).join(fields)}
}}
"""
        mod_content += sqlx_structs
        with open(mod_path, "w", encoding="utf-8") as f:
            f.write(mod_content)

# --- 4. Ensure lib.rs exposes models ---
lib_path = os.path.join(PROJECT_ROOT, "mise/src-tauri/src/lib.rs")
if os.path.exists(lib_path):
    with open(lib_path, "r", encoding="utf-8") as f:
        lib_content = f.read()

    if "pub use database::models" not in lib_content and "pub mod models" not in lib_content:
        lib_content += "\npub use database::models as models;\n"
        with open(lib_path, "w", encoding="utf-8") as f:
            f.write(lib_content)
PYTHON

run_step \
    "Generating TypeScript DTOs directly from DB schema" \
    "env DB_FILE=\"$DB_FILE\" DTO_DIR=\"$DTO_DIR\" RUST_OUTPUT=\"$RUST_OUTPUT\" PROJECT_ROOT=\"$PROJECT_ROOT\" python3 generate_ts_dtos.py"

rm -f generate_ts_dtos.py

# ==============================================================================
# Silence Unused Imports in Generated Prelude
# ==============================================================================

if [ -f "$RUST_OUTPUT/prelude.rs" ]; then
    python3 -c "
path = '$RUST_OUTPUT/prelude.rs'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
if '#![allow(unused_imports)]' not in content:
    with open(path, 'w', encoding='utf-8') as f:
        f.write('#![allow(unused_imports)]\n' + content)
"
fi

# ==============================================================================
# Compile Check Generated Rust
# ==============================================================================

run_step \
    "Checking generated Rust models" \
    "cd '$PROJECT_ROOT/mise/src-tauri' && cargo check"

# ==============================================================================
# Generate DTO index.ts
# ==============================================================================

if [ -d "$DTO_DIR" ]; then
    : > "$DTO_DIR/index.ts"
    for f in "$DTO_DIR"/*.ts; do
        if [ -f "$f" ] && [ "$(basename "$f")" != "index.ts" ]; then
            filename="$(basename "$f" .ts)"
            echo "export * from './$filename';" >> "$DTO_DIR/index.ts"
        fi
    done
fi

# ==============================================================================
# Generate Enum index.ts
# ==============================================================================

if [ -d "$ENUMS_DIR" ]; then
    : > "$ENUMS_DIR/index.ts"
    for f in "$ENUMS_DIR"/*.ts; do
        if [ -f "$f" ] && [ "$(basename "$f")" != "index.ts" ]; then
            filename="$(basename "$f" .ts)"
            echo "export * from './$filename';" >> "$ENUMS_DIR/index.ts"
        fi
    done
fi

# ==============================================================================
# Cleanup
# ==============================================================================

run_step \
    "Cleaning up temporary database" \
    "rm -f \"$DB_FILE\""

log_success "Model and DTO generation completed successfully!"