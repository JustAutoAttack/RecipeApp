use sqlx::{Pool, Sqlite};
use tauri::State;
use crate::config::AppConfig;
use crate::models::UserRow;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthResponse {
    pub user: UserRow,
    pub token: String,
}

#[tauri::command]
pub async fn sign_up(
    pool: State<'_, Pool<Sqlite>>,
    config: State<'_, AppConfig>,
    username: String,
) -> Result<AuthResponse, String> {
    let client = reqwest::Client::new();
    let url = format!("{}/api/auth/signup", config.server_url);

    let response = client.post(&url)
        .json(&serde_json::json!({ "username": username }))
        .send()
        .await
        .map_err(|e| format!("Failed to reach remote server: {}", e))?;

    if !response.status().is_success() {
        let err_text = response.text().await.unwrap_or_else(|_| "Unknown error".into());
        return Err(format!("Sign up failed: {}", err_text));
    }

    let auth_data: AuthResponse = response.json()
        .await
        .map_err(|e| format!("Failed to parse auth response: {}", e))?;

    // Cache the user locally in SQLite
    sqlx::query(
        r#"
        INSERT INTO users (id, username, created_at) 
        VALUES (?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET username = excluded.username
        "#,
    )
    .bind(&auth_data.user.id)
    .bind(&auth_data.user.username)
    .bind(&auth_data.user.created_at)
    .execute(pool.inner())
    .await
    .map_err(|e| e.to_string())?;

    Ok(auth_data)
}

#[tauri::command]
pub async fn sign_in(
    pool: State<'_, Pool<Sqlite>>,
    config: State<'_, AppConfig>,
    username: String,
) -> Result<AuthResponse, String> {
    let client = reqwest::Client::new();
    let url = format!("{}/api/auth/signin", config.server_url);

    let response = client.post(&url)
        .json(&serde_json::json!({ "username": username }))
        .send()
        .await
        .map_err(|e| format!("Failed to reach remote server: {}", e))?;

    if !response.status().is_success() {
        let err_text = response.text().await.unwrap_or_else(|_| "Unknown error".into());
        return Err(format!("Sign in failed: {}", err_text));
    }

    let auth_data: AuthResponse = response.json()
        .await
        .map_err(|e| format!("Failed to parse auth response: {}", e))?;

    // Cache the user locally in SQLite
    sqlx::query(
        r#"
        INSERT INTO users (id, username, created_at) 
        VALUES (?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET username = excluded.username
        "#,
    )
    .bind(&auth_data.user.id)
    .bind(&auth_data.user.username)
    .bind(&auth_data.user.created_at)
    .execute(pool.inner())
    .await
    .map_err(|e| e.to_string())?;

    Ok(auth_data)
}