use axum::{Json, extract::State};

use crate::{app::AppState, models::Item, routes::ApiResult};

pub async fn get_handler(
    State(AppState { ref db, .. }): State<AppState>,
) -> ApiResult<Json<Vec<Item>>> {
    let items: Vec<Item> = db.select("item").await?;

    Ok(Json(items))
}
