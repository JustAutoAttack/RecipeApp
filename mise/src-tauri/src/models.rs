pub use crate::database::models::tables::*;

#[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize, ts_rs::TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct UserRow {
    pub id: i32,
    pub username: String,
    pub created_at: String,
}

#[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize, ts_rs::TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct RecipeRow {
    pub id: i32,
    pub owner_id: i32,
    pub title: String,
    pub description: Option<String>,
    pub cuisine: Option<String>,
    pub cook_time_minutes: Option<i32>,
    pub ingredients: Option<String>,
    pub instructions: Option<String>,
    pub history: Option<String>,
    pub substitutions: Option<String>,
    pub allergens: Option<String>,
    pub image_url: Option<String>,
    pub images: Option<String>,
    pub created_at: String,
}
