import json
import sys
from pathlib import Path
from typing import Any, Dict

# Resolve paths
script_dir = Path(__file__).resolve().parent
dev_server_dir = script_dir.parent
project_root = dev_server_dir.parent

# Add dev_server to path so 'src' can be imported cleanly
sys.path.append(str(dev_server_dir))

from src.main import app

if __name__ == "__main__":
    docs_dir: Path = project_root / "docs"
    docs_dir.mkdir(exist_ok=True)

    schema_path: Path = docs_dir / "openapi.json"

    openapi_schema: Dict[str, Any] = app.openapi()
    with open(schema_path, "w", encoding="utf-8") as f:
        json.dump(openapi_schema, f, indent=2)

    print(f"Successfully generated OpenAPI schema at: {schema_path}")
