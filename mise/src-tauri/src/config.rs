use std::env;

#[derive(Clone, Debug)]
pub struct AppConfig {
    pub server_url: String,
}

impl AppConfig {
    pub fn init() -> Self {
        let _ = dotenvy::dotenv();
        let server_url =
            env::var("RECIPE_SERVER_URL").unwrap_or_else(|_| "http://127.0.0.1:8000".to_string());

        Self { server_url }
    }
}
