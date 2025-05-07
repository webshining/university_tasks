use axum::Router;

use crate::app::AppState;

mod error;
mod items;

use error::ApiError;

pub type ApiResult<T> = Result<T, ApiError>;

fn api_routes() -> Router<AppState> {
    Router::new().merge(items::routes())
}

pub fn routes(app_state: AppState) -> Router {
    Router::new()
        .nest("/api", api_routes())
        .with_state(app_state)
}
