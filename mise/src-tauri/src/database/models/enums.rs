use sea_orm::{prelude::StringLen, DeriveActiveEnum, EnumIter};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, EnumIter, DeriveActiveEnum, TS)]
#[sea_orm(rs_type = "String", db_type = "String(StringLen::None)")]
#[ts(export, export_to = "enums/theme.ts")]
#[serde(rename_all = "lowercase")]
pub enum Theme {
    #[sea_orm(string_value = "system")]
    #[serde(rename = "system")]
    System,
    #[sea_orm(string_value = "light")]
    #[serde(rename = "light")]
    Light,
    #[sea_orm(string_value = "dark")]
    #[serde(rename = "dark")]
    Dark,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, EnumIter, DeriveActiveEnum, TS)]
#[sea_orm(rs_type = "String", db_type = "String(StringLen::None)")]
#[ts(export, export_to = "enums/subscription_tier.ts")]
#[serde(rename_all = "lowercase")]
pub enum SubscriptionTier {
    #[sea_orm(string_value = "free")]
    #[serde(rename = "free")]
    Free,
    #[sea_orm(string_value = "pro")]
    #[serde(rename = "pro")]
    Pro,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, EnumIter, DeriveActiveEnum, TS)]
#[sea_orm(rs_type = "String", db_type = "String(StringLen::None)")]
#[ts(export, export_to = "enums/subscription_status.ts")]
#[serde(rename_all = "snake_case")]
pub enum SubscriptionStatus {
    #[sea_orm(string_value = "active")]
    #[serde(rename = "active")]
    Active,
    #[sea_orm(string_value = "past_due")]
    #[serde(rename = "past_due")]
    PastDue,
    #[sea_orm(string_value = "canceled")]
    #[serde(rename = "canceled")]
    Canceled,
}
