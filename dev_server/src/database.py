from contextlib import asynccontextmanager
from pathlib import Path
from typing import AsyncGenerator, Generator, Any
from sqlalchemy import Engine, event, text
from sqlmodel import Session, create_engine

# Resolve paths to find docs/schema.sql from dev_server/src/database.py
script_dir = Path(__file__).resolve().parent
dev_server_dir = script_dir.parent
project_root = dev_server_dir.parent
schema_path = project_root / "docs" / "schema.sql"

DATABASE_URL = "sqlite:///./remote_recipes.db"
engine: Engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})


# Enable foreign key enforcement for SQLite
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


def create_db_and_tables() -> None:
    """Executes the canonical schema.sql file directly to initialize the database."""
    if not schema_path.exists():
        raise FileNotFoundError(f"Canonical schema file not found at: {schema_path}")

    schema_sql = schema_path.read_text(encoding="utf-8")

    with engine.begin() as connection:
        # Execute the raw SQL schema script statement by statement or as a whole script
        for statement in schema_sql.split(";"):
            if statement.strip():
                connection.execute(text(statement))


@asynccontextmanager
async def lifespan(app: Any) -> AsyncGenerator[None, None]:
    create_db_and_tables()
    yield


def get_session() -> Generator[Session, Any, None]:
    with Session(engine) as session:
        yield session
