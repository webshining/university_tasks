use axum::{Json, extract::State};

use crate::{
    app::AppState,
    models::Item,
    routes::{ApiResult, error::ApiError},
};

pub async fn post_handler(
    State(AppState { ref db, .. }): State<AppState>,
    Json(req): Json<Item>,
) -> ApiResult<Json<Item>> {
    let item: Option<Item> = db.create("item").content(req).await?;
    if let Some(item) = item {
        return Ok(Json(item));
    }
    Err(ApiError::NotFound)
}
