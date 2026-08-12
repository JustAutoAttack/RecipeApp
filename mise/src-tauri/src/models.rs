use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, FromRow, Clone, Debug)]
pub struct UserRow {
    pub id: String,
    pub username: String,
    pub created_at: String,
}

#[derive(Serialize, Deserialize, FromRow, Clone, Debug)]
pub struct RecipeRow {
    pub id: String,
    pub owner_id: String,
    pub title: String,
    pub cuisine: String,
    pub cook_time_minutes: i32,
    pub ingredients: String,
    pub instructions: String,
    pub description: Option<String>,
    pub history: Option<String>,
    pub substitutions: Option<String>,
    pub allergens: Option<String>,
    pub image_url: Option<String>,
    pub images: Option<String>,
    pub created_at: String,
}

#[derive(Serialize, Deserialize, FromRow, Clone, Debug)]
pub struct FavoriteRow {
    pub user_id: String,
    pub recipe_id: String,
    pub created_at: String,
}
