import uuid
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlmodel import Session, select

from ..database import get_session
from ..models import User

router = APIRouter(prefix="/api/auth", tags=["auth"])


class AuthRequest(BaseModel):
    username: str


@router.post("/signup")
def signup(payload: AuthRequest, session: Session = Depends(get_session)):
    existing: User | None = session.exec(
        select(User).where(User.username == payload.username)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists.")

    new_user = User(
        id=f"user_{uuid.uuid4().hex[:8]}",
        username=payload.username,
        created_at=datetime.utcnow().isoformat(),
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {"token": f"mock-token-for-{new_user.id}", "user": new_user}


@router.post("/signin")
def signin(payload: AuthRequest, session: Session = Depends(get_session)):
    user: User | None = session.exec(select(User).where(User.username == payload.username)).first()
    if not user:
        raise HTTPException(
            status_code=404, detail="User not found. Please sign up first."
        )

    return {"token": f"mock-token-for-{user.id}", "user": user}
