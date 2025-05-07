use surrealdb::Surreal;
use surrealdb::engine::any::Any;

#[derive(Clone)]
pub struct AppState {
    pub db: Surreal<Any>,
}
