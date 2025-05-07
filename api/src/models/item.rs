use serde::{Deserialize, Serialize};
use surrealdb::RecordId;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Item {
    pub id: Option<RecordId>,
    pub text: String,
    pub is_bought: bool,
}
