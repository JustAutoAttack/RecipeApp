from datetime import datetime
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from ..database import get_session
from ..models import Recipe, Favorite, FavoriteToggleRequest

router = APIRouter(prefix="/api", tags=["recipes"])


@router.post("/recipes", response_model=Recipe)
def upsert_recipe(recipe: Recipe, session: Session = Depends(get_session)) -> Recipe:
    db_recipe: Recipe | None = session.get(Recipe, recipe.id)
    if not db_recipe:
        session.add(recipe)
    else:
        for key, value in recipe.dict(exclude_unset=True).items():
            setattr(db_recipe, key, value)
    session.commit()
    session.refresh(recipe)
    return recipe


@router.delete("/recipes/{recipe_id}")
def delete_recipe(
    recipe_id: str, session: Session = Depends(get_session)
) -> dict[str, str]:
    recipe: Recipe | None = session.get(Recipe, recipe_id)
    if recipe:
        session.delete(recipe)
        session.commit()
    return {"status": "ok", "deleted": recipe_id}


@router.post("/favorites/toggle")
def toggle_favorite_remote(
    payload: FavoriteToggleRequest, session: Session = Depends(get_session)
) -> dict[str, bool]:
    existing: Favorite | None = session.exec(
        select(Favorite).where(
            Favorite.user_id == payload.user_id, Favorite.recipe_id == payload.recipe_id
        )
    ).first()

    if existing:
        session.delete(existing)
        session.commit()
        return {"favorited": False}
    else:
        new_fav = Favorite(
            user_id=payload.user_id,
            recipe_id=payload.recipe_id,
            created_at=datetime.utcnow().isoformat(),
        )
        session.add(new_fav)
        session.commit()
        return {"favorited": True}
