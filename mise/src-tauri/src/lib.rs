mod config;
mod models;
mod db;
mod commands;

use config::AppConfig;
use commands::*;
use tauri::Manager;
use sqlx::SqlitePool;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[cfg(target_os = "linux")]
    {
        std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
    }

    let config = AppConfig::init();

    tauri::Builder::default()
        .manage(config)
        .setup(|app| {
            let handle = app.handle().clone();
            
            // Initialize the database and pool synchronously during setup
            let pool: SqlitePool = tauri::async_runtime::block_on(async move {
                // Resolve the app's local data directory for the SQLite file
                let app_dir = handle.path().app_data_dir().expect("Failed to get app data dir");
                std::fs::create_dir_all(&app_dir).expect("Failed to create app data dir");
                let db_path = app_dir.join("recipes.db");
                let db_url = format!("sqlite://{}?mode=rwc", db_path.to_string_lossy());

                let pool = SqlitePool::connect(&db_url)
                    .await
                    .expect("Failed to connect to SQLite database");

                // Initialize tables using schema.sql via init_db
                db::init_db(&pool)
                    .await
                    .expect("Failed to initialize database schema");

                pool
            });

            app.manage(pool);

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            sign_up,
            sign_in,
            get_users,
            save_user,
            delete_user,
            get_recipes,
            save_recipe,
            delete_recipe,
            toggle_favorite,
            check_server_sync
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}