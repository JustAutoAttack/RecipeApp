from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import lifespan
from .routers import auth, recipes, telemetry, users

app = FastAPI(title="Mise Dev Server", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(recipes.router)
app.include_router(telemetry.router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
