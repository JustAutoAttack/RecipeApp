from fastapi import APIRouter
from datetime import datetime

router = APIRouter(prefix="/api/telemetry", tags=["telemetry"])


@router.get("/health")
def health_check() -> dict:
    """Basic health check endpoint for the server process."""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "RecipeApp Dev Server",
    }


@router.post("/sync")
def sync_heartbeat() -> dict:
    """Heartbeat check for client network sync connectivity."""
    return {"status": "connected", "server_time": datetime.utcnow().isoformat()}
