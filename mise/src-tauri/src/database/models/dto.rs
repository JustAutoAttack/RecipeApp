use sea_orm::FromQueryResult;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, FromQueryResult, TS)]
#[ts(export, export_to = "dto/public_user.ts")]
#[serde(rename_all = "camelCase")]
pub struct PublicUserDTO {
    pub id: String,
    pub username: String,
    pub display_name: String,
    pub theme: String,
    #[ts(type = "string | null")]
    pub allergens: Option<String>,
    #[ts(type = "string | null")]
    pub last_connection_date: Option<String>,
    pub subscription_tier: String,
    pub subscription_status: String,
    pub recipe_count: i64,
    pub total_likes_received: i64,
    pub updated_at: String,
    pub created_at: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, FromQueryResult, TS)]
#[ts(export, export_to = "dto/user.ts")]
#[serde(rename_all = "camelCase")]
pub struct UserDTO {
    pub id: String,
    pub username: String,
    pub email: String,
    pub display_name: String,
    pub theme: String,
    #[ts(type = "string | null")]
    pub allergens: Option<String>,
    pub pantry_tracking_enabled: i32,
    #[ts(type = "string | null")]
    pub last_connection_date: Option<String>,
    pub updated_at: String,
    pub created_at: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, FromQueryResult, TS)]
#[ts(export, export_to = "dto/session.ts")]
#[serde(rename_all = "camelCase")]
pub struct SessionDTO {
    pub id: String,
    pub user_id: String,
    pub access_token: String,
    pub refresh_token: String,
    pub expires_at: String,
    pub updated_at: String,
    pub created_at: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, FromQueryResult, TS)]
#[ts(export, export_to = "dto/subscription.ts")]
#[serde(rename_all = "camelCase")]
pub struct SubscriptionDTO {
    pub id: String,
    pub user_id: String,
    pub tier: String,
    pub activity_status: String,
    #[ts(type = "string | null")]
    pub stripe_customer_id: Option<String>,
    #[ts(type = "string | null")]
    pub stripe_subscription_id: Option<String>,
    #[ts(type = "string | null")]
    pub current_period_end: Option<String>,
    pub updated_at: String,
    pub created_at: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, FromQueryResult, TS)]
#[ts(export, export_to = "dto/recipe.ts")]
#[serde(rename_all = "camelCase")]
pub struct RecipeDTO {
    pub id: String,
    pub owner_id: String,
    pub title: String,
    pub cuisine: String,
    pub cook_time_minutes: i32,
    pub ingredients: String,
    pub instructions: String,
    #[ts(type = "string | null")]
    pub description: Option<String>,
    #[ts(type = "string | null")]
    pub history: Option<String>,
    #[ts(type = "string | null")]
    pub substitutions: Option<String>,
    #[ts(type = "string | null")]
    pub allergens: Option<String>,
    #[ts(type = "string | null")]
    pub image_url: Option<String>,
    #[ts(type = "string | null")]
    pub images: Option<String>,
    pub updated_at: String,
    pub created_at: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, FromQueryResult, TS)]
#[ts(export, export_to = "dto/full_recipe.ts")]
#[serde(rename_all = "camelCase")]
pub struct FullRecipeDTO {
    pub id: String,
    pub owner_id: String,
    pub title: String,
    pub cuisine: String,
    pub cook_time_minutes: i32,
    pub ingredients: String,
    pub instructions: String,
    #[ts(type = "string | null")]
    pub description: Option<String>,
    #[ts(type = "string | null")]
    pub history: Option<String>,
    #[ts(type = "string | null")]
    pub substitutions: Option<String>,
    #[ts(type = "string | null")]
    pub allergens: Option<String>,
    #[ts(type = "string | null")]
    pub image_url: Option<String>,
    #[ts(type = "string | null")]
    pub images: Option<String>,
    pub updated_at: String,
    pub created_at: String,
    pub likes_count: i64,
    pub favorites_count: i64,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, FromQueryResult, TS)]
#[ts(export, export_to = "dto/favorite.ts")]
#[serde(rename_all = "camelCase")]
pub struct FavoriteDTO {
    pub user_id: String,
    pub recipe_id: String,
    pub created_at: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, FromQueryResult, TS)]
#[ts(export, export_to = "dto/like.ts")]
#[serde(rename_all = "camelCase")]
pub struct LikeDTO {
    pub user_id: String,
    pub recipe_id: String,
    pub created_at: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, FromQueryResult, TS)]
#[ts(export, export_to = "dto/pantry.ts")]
#[serde(rename_all = "camelCase")]
pub struct PantryDTO {
    pub id: String,
    pub owner_id: String,
    pub ingredients: String,
    pub updated_at: String,
    pub created_at: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, FromQueryResult, TS)]
#[ts(export, export_to = "dto/grocery_list.ts")]
#[serde(rename_all = "camelCase")]
pub struct GroceryListDTO {
    pub id: String,
    pub owner_id: String,
    pub title: String,
    pub items: String,
    pub updated_at: String,
    pub created_at: String,
}
