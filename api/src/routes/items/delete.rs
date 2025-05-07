use axum::extract::{Path, State};

use crate::{app::AppState, models::Item, routes::ApiResult};

pub async fn delete_handler(
    State(AppState { ref db, .. }): State<AppState>,
    Path(id): Path<String>,
) -> ApiResult<String> {
    db.delete::<Option<Item>>(("item", id)).await?;

    Ok("Ok".to_string())
}
