use axum::http::Method;
use std::{net::SocketAddr, str::FromStr};
use tokio::net::TcpListener;
use tower_http::cors::{self, CorsLayer};

mod app;
mod database;
mod models;
mod routes;

use app::AppState;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let db = database::connect_surrealdb("rocksdb://database").await;
    tracing::info!("Connected to database");

    let app_state = AppState { db };
    let app =
        routes::routes(app_state).layer(CorsLayer::new().allow_origin(cors::Any).allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::PATCH,
            Method::DELETE,
        ]));

    let socket_addr = SocketAddr::from_str("0.0.0.0:4000").unwrap();
    let tcp_listener = TcpListener::bind(socket_addr).await.unwrap();
    tracing::info!("Listening on http://{}", socket_addr);
    axum::serve(tcp_listener, app).await.unwrap();
}
