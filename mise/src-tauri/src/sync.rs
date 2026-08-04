// src-tauri/src/sync.rs
use serde::{Deserialize, Serialize};
use sqlx::{SqlitePool, FromRow};

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

#[derive(Serialize, Deserialize, Debug)]
pub struct SyncBundle {
    pub user: UserRow,
    pub recipes: Vec<RecipeRow>,
    pub favorites: Vec<FavoriteRow>,
}

pub async fn fetch_and_sync_user_data(pool: &SqlitePool, server_url: &str, user_id: &str) -> Result<(), String> {
    let url = format!("{}/api/sync/user/{}", server_url, user_id);
    let client = reqwest::Client::new();

    let response = client.get(&url)
        .send()
        .await
        .map_err(|e| format!("Failed to reach remote server: {}", e))?;

    if !response.status().is_success() {
        return Err(format!("Remote sync failed with status: {}", response.status()));
    }

    let bundle: SyncBundle = response.json()
        .await
        .map_err(|e| format!("Failed to parse sync bundle: {}", e))?;

    sqlx::query(
        r#"
        INSERT INTO users (id, username, created_at) 
        VALUES (?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET username = excluded.username
        "#,
    )
    .bind(&bundle.user.id)
    .bind(&bundle.user.username)
    .bind(&bundle.user.created_at)
    .execute(pool)
    .await
    .map_err(|e| e.to_string())?;

    for recipe in bundle.recipes {
        sqlx::query(
            r#"
            INSERT INTO recipes (
                id, owner_id, title, cuisine, cook_time_minutes, ingredients, 
                instructions, description, history, substitutions, 
                allergens, image_url, images, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                owner_id = excluded.owner_id, title = excluded.title, cuisine = excluded.cuisine,
                cook_time_minutes = excluded.cook_time_minutes, ingredients = excluded.ingredients,
                instructions = excluded.instructions, description = excluded.description,
                history = excluded.history, substitutions = excluded.substitutions,
                allergens = excluded.allergens, image_url = excluded.image_url, images = excluded.images
            "#,
        )
        .bind(&recipe.id)
        .bind(&recipe.owner_id)
        .bind(&recipe.title)
        .bind(&recipe.cuisine)
        .bind(&recipe.cook_time_minutes)
        .bind(&recipe.ingredients)
        .bind(&recipe.instructions)
        .bind(&recipe.description)
        .bind(&recipe.history)
        .bind(&recipe.substitutions)
        .bind(&recipe.allergens)
        .bind(&recipe.image_url)
        .bind(&recipe.images)
        .bind(&recipe.created_at)
        .execute(pool)
        .await
        .map_err(|e| e.to_string())?;
    }

    for fav in bundle.favorites {
        sqlx::query(
            r#"
            INSERT INTO favorites (user_id, recipe_id, created_at) 
            VALUES (?, ?, ?)
            ON CONFLICT(user_id, recipe_id) DO NOTHING
            "#,
        )
        .bind(&fav.user_id)
        .bind(&fav.recipe_id)
        .bind(&fav.created_at)
        .execute(pool)
        .await
        .map_err(|e| e.to_string())?;
    }

    Ok(())
}

pub async fn push_recipe_to_remote(server_url: &str, recipe: &RecipeRow) {
    let client = reqwest::Client::new();
    let url = format!("{}/api/recipes", server_url);
    let _ = client.post(&url).json(recipe).send().await;
}

pub async fn push_delete_recipe_to_remote(server_url: &str, recipe_id: &str) {
    let client = reqwest::Client::new();
    let url = format!("{}/api/recipes/{}", server_url, recipe_id);
    let _ = client.delete(&url).send().await;
}

pub async fn push_toggle_favorite_to_remote(server_url: &str, user_id: &str, recipe_id: &str) {
    let client = reqwest::Client::new();
    let url = format!("{}/api/favorites/toggle", server_url);
    let payload = serde_json::json!({
        "user_id": user_id,
        "recipe_id": recipe_id
    });
    let _ = client.post(&url).json(&payload).send().await;
}