use poem_openapi::{param::Query, payload::PlainText, OpenApi, OpenApiService};

pub struct Todo {
    id: i32,
    title: String,
    content: String,
    created_at: u64,
    completed_at: Option<u64>,
}

pub struct Api;

#[OpenApi]
impl Api {
    #[oai(path = "/hello", method = "get")]
    async fn index(&self, name: Query<Option<String>>) -> PlainText<String> {
        match name.0 {
            Some(name) => PlainText(format!("hello, {}!", name)),
            None => PlainText("hello!".to_string()),
        }
    }
}
