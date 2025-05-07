use axum::{
    Json,
    extract::{Path, State},
};

use crate::{
    app::AppState,
    models::Item,
    routes::{ApiResult, error::ApiError},
};

pub async fn patch_handler(
    State(AppState { ref db, .. }): State<AppState>,
    Path(id): Path<String>,
) -> ApiResult<Json<Item>> {
    let mut item: Item = db.select(("item", &id)).await?.ok_or(ApiError::NotFound)?;

    item.is_bought = !item.is_bought;
    db.update::<Option<Item>>(("item", id))
        .content(item.clone())
        .await?;

    Ok(Json(item))
}
