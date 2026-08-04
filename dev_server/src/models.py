from typing import List, Optional
from pydantic import BaseModel
from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    __tablename__: str = "users"  # type: ignore
    __table_args__: dict[str, bool] = {"extend_existing": True}

    id: str = Field(primary_key=True, nullable=False)
    username: str = Field(unique=True, nullable=False)
    created_at: str


class Recipe(SQLModel, table=True):
    __tablename__: str = "recipes"  # type: ignore
    __table_args__: dict[str, bool] = {"extend_existing": True}

    id: str = Field(primary_key=True, nullable=False)
    owner_id: str = Field(foreign_key="users.id", nullable=False)
    title: str
    cuisine: str
    cook_time_minutes: int
    ingredients: str
    instructions: str
    description: Optional[str] = None
    history: Optional[str] = None
    substitutions: Optional[str] = None
    allergens: Optional[str] = None
    image_url: Optional[str] = None
    images: Optional[str] = None
    created_at: str


class Favorite(SQLModel, table=True):
    __tablename__: str = "favorites"  # type: ignore
    __table_args__: dict[str, bool] = {"extend_existing": True}

    user_id: str = Field(foreign_key="users.id", primary_key=True, nullable=False)
    recipe_id: str = Field(foreign_key="recipes.id", primary_key=True, nullable=False)
    created_at: str


class SyncBundle(BaseModel):
    user: User
    recipes: List[Recipe]
    favorites: List[Favorite]


class FavoriteToggleRequest(BaseModel):
    user_id: str
    recipe_id: str
