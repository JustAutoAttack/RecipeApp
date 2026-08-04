use sqlx::{Pool, Sqlite};
use tauri::State;
use crate::config::AppConfig;
use crate::models::UserRow;

#[tauri::command]
pub async fn get_users(pool: State<'_, Pool<Sqlite>>) -> Result<Vec<UserRow>, String> {
    sqlx::query_as::<_, UserRow>("SELECT id, username, created_at FROM users")
        .fetch_all(pool.inner())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn save_user(
    pool: State<'_, Pool<Sqlite>>, 
    config: State<'_, AppConfig>, 
    user: UserRow
) -> Result<UserRow, String> {
    sqlx::query(
        r#"
        INSERT INTO users (id, username, created_at) 
        VALUES (?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET username = excluded.username
        "#,
    )
    .bind(&user.id)
    .bind(&user.username)
    .bind(&user.created_at)
    .execute(pool.inner())
    .await
    .map_err(|e| e.to_string())?;

    let server_url = config.server_url.clone();
    let usr = user.clone();
    tokio::spawn(async move {
        let client = reqwest::Client::new();
        let url = format!("{}/api/users", server_url);
        if let Err(e) = client.post(&url).json(&usr).send().await {
            eprintln!("Background sync failed to push user: {}", e);
        }
    });

    Ok(user)
}

#[tauri::command]
pub async fn delete_user(pool: State<'_, Pool<Sqlite>>, id: String) -> Result<(), String> {
    sqlx::query("DELETE FROM users WHERE id = ?")
        .bind(id)
        .execute(pool.inner())
        .await
        .map(|_| ())
        .map_err(|e| e.to_string())
}