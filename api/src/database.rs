use surrealdb::Surreal;
use surrealdb::engine::any::{Any, connect};

pub async fn connect_surrealdb(url: &str) -> Surreal<Any> {
    let db = connect(url).await.unwrap();
    db.use_ns("db").use_db("db").await.unwrap();
    db
}
