use sqlx::SqlitePool;

pub async fn init_db(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    const SCHEMA_SQL: &str = include_str!("../../../database/schema.sql");

    sqlx::query(SCHEMA_SQL)
        .execute(pool)
        .await?;

    Ok(())
}