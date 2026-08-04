use tauri::State;
use crate::config::AppConfig;

#[tauri::command]
pub async fn check_server_sync(config: State<'_, AppConfig>) -> Result<String, String> {
    let client = reqwest::Client::new();
    let url = format!("{}/api/telemetry/sync", config.server_url);
    
    let response = client
        .post(&url)
        .send()
        .await
        .map_err(|e| format!("Telemetry connection failed: {}", e))?;

    if response.status().is_success() {
        Ok("Server is reachable and synchronized".into())
    } else {
        Err(format!("Telemetry check failed with status: {}", response.status()))
    }
}