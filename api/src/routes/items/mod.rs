use axum::{
    Router,
    routing::{delete, get, patch, post},
};

use crate::app::AppState;

mod delete;
mod get;
mod patch;
mod post;

fn items_routes() -> Router<AppState> {
    Router::new()
        .route("/", get(get::get_handler))
        .route("/", post(post::post_handler))
        .route("/{id}", patch(patch::patch_handler))
        .route("/{id}", delete(delete::delete_handler))
}

pub fn routes() -> Router<AppState> {
    Router::new().nest("/items", items_routes())
}
