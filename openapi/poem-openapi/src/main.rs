mod entity;

use entity::{InitTodo, Todo, TodoResponse};
use poem::{listener::TcpListener, Route};
use poem_openapi::{
    param::{Path, Query},
    payload::{Json, PlainText},
    OpenApi, OpenApiService,
};

struct Api;

#[OpenApi]
impl Api {
    #[oai(path = "/", method = "get")]
    async fn index(&self, name: Query<Option<String>>) -> PlainText<String> {
        match name.0 {
            Some(name) => PlainText(format!("hello, {}!", name)),
            None => PlainText("Hello from Poem!".to_string()),
        }
    }
    #[oai(path = "/todos", method = "get")]
    async fn select(
        &self,
        title: Query<Option<String>>,
        content: Query<Option<String>>,
        completed: Query<Option<bool>>,
    ) -> Json<Vec<TodoResponse>> {
        let res = Todo::select(title.0, content.0, completed.0)
            .await
            .unwrap()
            .into_iter()
            .map(|t| t.into())
            .collect();
        Json(res)
    }

    #[oai(path = "/todos", method = "post")]
    async fn create(&self, init: Json<InitTodo>) -> Json<TodoResponse> {
        Json(Todo::create(init.0).await.unwrap().into())
    }
    #[oai(path = "/todos/:id", method = "get")]
    async fn find(&self, id: Path<i32>) -> Json<TodoResponse> {
        Json(Todo::find(id.0).await.unwrap().into())
    }
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let api_service =
        OpenApiService::new(Api, "Hello World", "1.0").server("http://localhost:3000/");
    let ui = api_service.swagger_ui();
    let app = Route::new().nest("/", api_service).nest("/docs", ui);

    poem::Server::new(TcpListener::bind("0.0.0.0:3000"))
        .run(app)
        .await
}
