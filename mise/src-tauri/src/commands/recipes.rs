use sqlx::{Pool, Sqlite};
use tauri::State;
use crate::config::AppConfig;
use crate::models::RecipeRow;

#[tauri::command]
pub async fn get_recipes(
    pool: State<'_, Pool<Sqlite>>, 
    owner_id: Option<String>
) -> Result<Vec<RecipeRow>, String> {
    let query_str = if owner_id.is_some() {
        "SELECT id, owner_id, title, cuisine, cook_time_minutes, ingredients, instructions, description, history, substitutions, allergens, image_url, images, created_at FROM recipes WHERE owner_id = ?"
    } else {
        "SELECT id, owner_id, title, cuisine, cook_time_minutes, ingredients, instructions, description, history, substitutions, allergens, image_url, images, created_at FROM recipes"
    };

    let mut query = sqlx::query_as::<_, RecipeRow>(query_str);
    
    if let Some(id) = owner_id {
        query = query.bind(id);
    }

    query
        .fetch_all(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn save_recipe(
    pool: State<'_, Pool<Sqlite>>, 
    config: State<'_, AppConfig>, 
    recipe: RecipeRow
) -> Result<(), String> {
    sqlx::query(
        r#"
        INSERT INTO recipes (
            id, owner_id, title, cuisine, cook_time_minutes, ingredients, 
            instructions, description, history, substitutions, 
            allergens, image_url, images, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            owner_id = excluded.owner_id,
            title = excluded.title,
            cuisine = excluded.cuisine,
            cook_time_minutes = excluded.cook_time_minutes,
            ingredients = excluded.ingredients,
            instructions = excluded.instructions,
            description = excluded.description,
            history = excluded.history,
            substitutions = excluded.substitutions,
            allergens = excluded.allergens,
            image_url = excluded.image_url,
            images = excluded.images
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
    .execute(pool.inner())
    .await
    .map(|_| ())
    .map_err(|e| e.to_string())?;

    let server_url = config.server_url.clone();
    let rec = recipe.clone();
    tokio::spawn(async move {
        let client = reqwest::Client::new();
        if let Err(e) = client.post(&format!("{}/api/recipes", server_url)).json(&rec).send().await {
            eprintln!("Background sync failed to push recipe: {}", e);
        }
    });

    Ok(())
}

#[tauri::command]
pub async fn delete_recipe(
    pool: State<'_, Pool<Sqlite>>, 
    config: State<'_, AppConfig>, 
    id: String
) -> Result<(), String> {
    sqlx::query("DELETE FROM recipes WHERE id = ?")
        .bind(&id)
        .execute(pool.inner())
        .await
        .map(|_| ())
        .map_err(|e| e.to_string())?;

    let server_url = config.server_url.clone();
    let recipe_id = id.clone();
    tokio::spawn(async move {
        let client = reqwest::Client::new();
        if let Err(e) = client.delete(&format!("{}/api/recipes/{}", server_url, recipe_id)).send().await {
            eprintln!("Background sync failed to delete remote recipe: {}", e);
        }
    });

    Ok(())
}

#[tauri::command]
pub async fn toggle_favorite(
    pool: State<'_, Pool<Sqlite>>, 
    config: State<'_, AppConfig>, 
    user_id: String,
    recipe_id: String
) -> Result<(), String> {
    // Check if the favorite already exists
    let existing: Option<(String,)> = sqlx::query_as(
        "SELECT user_id FROM favorites WHERE user_id = ? AND recipe_id = ?"
    )
    .bind(&user_id)
    .bind(&recipe_id)
    .fetch_optional(pool.inner())
    .await
    .map_err(|e| e.to_string())?;

    let now = chrono::Utc::now().to_rfc3339();

    if existing.is_some() {
        // If it exists, remove it (toggle off)
        sqlx::query("DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?")
            .bind(&user_id)
            .bind(&recipe_id)
            .execute(pool.inner())
            .await
            .map_err(|e| e.to_string())?;
    } else {
        // Otherwise, insert it (toggle on)
        sqlx::query(
            "INSERT INTO favorites (user_id, recipe_id, created_at) VALUES (?, ?, ?)"
        )
        .bind(&user_id)
        .bind(&recipe_id)
        .bind(&now)
        .execute(pool.inner())
        .await
        .map_err(|e| e.to_string())?;
    }

    // Background sync with your backend server
    let server_url = config.server_url.clone();
    let uid = user_id.clone();
    let rid = recipe_id.clone();
    let is_fav = existing.is_none(); // True if we just added it, false if removed
    
    tokio::spawn(async move {
        let client = reqwest::Client::new();
        let endpoint = format!("{}/api/users/{}/favorites/{}", server_url, uid, rid);
        
        let res = if is_fav {
            client.post(&endpoint).send().await
        } else {
            client.delete(&endpoint).send().await
        };

        if let Err(e) = res {
            eprintln!("Background sync failed to update favorite status: {}", e);
        }
    });

    Ok(())
}