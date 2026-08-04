from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from ..database import get_session
from ..models import User, Recipe, Favorite, SyncBundle

router = APIRouter(prefix="/api", tags=["users"])


@router.post("/users", response_model=User)
def upsert_user(user: User, session: Session = Depends(get_session)) -> User:
    db_user: User | None = session.get(User, user.id)
    if not db_user:
        session.add(user)
    else:
        db_user.username = user.username
    session.commit()
    session.refresh(user)
    return user


@router.get("/sync/user/{user_id}", response_model=SyncBundle)
def get_user_sync_data(
    user_id: str, session: Session = Depends(get_session)
) -> SyncBundle:
    user: User | None = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found on remote server.")

    recipes: List[Recipe] = list(
        session.exec(select(Recipe).where(Recipe.owner_id == user_id)).all()
    )
    favorites: List[Favorite] = list(
        session.exec(select(Favorite).where(Favorite.user_id == user_id)).all()
    )

    return SyncBundle(user=user, recipes=recipes, favorites=favorites)