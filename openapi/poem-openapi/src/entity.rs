#![allow(dead_code)]
#![allow(unused_imports)]

use chrono::{DateTime, NaiveDateTime, Utc};
use poem_openapi::{param::Query, payload::PlainText, Object, OpenApi, OpenApiService};
use serde::{Deserialize, Serialize};
use sqlx::{
    postgres::{PgConnectOptions, PgPoolOptions},
    Connection, PgConnection, PgPool,
};

#[derive(Serialize, Deserialize, Object)]
pub struct TodoResponse {
    id: i32,
    title: String,
    content: String,
    created_at: String,
    completed_at: String,
}
pub struct Todo {
    id: i32,
    title: String,
    content: String,
    created_at: DateTime<Utc>,
    completed_at: Option<DateTime<Utc>>,
}
#[derive(Object)]
pub struct InitTodo {
    title: String,
    content: String,
}
impl Into<TodoResponse> for Todo {
    fn into(self) -> TodoResponse {
        TodoResponse {
            id: self.id,
            title: self.title,
            content: self.content,
            created_at: self.created_at.to_string(),
            completed_at: self.created_at.to_string(),
        }
    }
}

use lazy_static::lazy_static;
lazy_static! {
    static ref DATABASE_URL: String = {
        dotenv::dotenv().expect(".env was not found");
        std::env::var("DATABASE_URL").expect("env DATABASE_URL not found")
    };
}

impl Todo {
    pub async fn select(
        title: Option<String>,
        content: Option<String>,
        completed: Option<bool>,
    ) -> sqlx::Result<Vec<Todo>> {
        let mut conn = PgConnection::connect(&DATABASE_URL).await.unwrap();
        sqlx::query_as!(
            Todo,
            "SELECT *
            FROM todos
            WHERE (title LIKE $1 OR $1 IS NULL)
            AND (content LIKE $2 OR $2 IS NULL)
            AND ((completed_at IS NULL) = $3 OR $3 IS NULL)",
            title.map(|s| format!("%{}%", s)),
            content.map(|s| format!("%{}%", s)),
            completed
        )
        .fetch_all(&mut conn)
        .await
    }

    pub async fn create(init: InitTodo) -> sqlx::Result<Todo> {
        let mut conn = PgConnection::connect(&DATABASE_URL).await.unwrap();
        let now = sqlx::types::chrono::Utc::now().fixed_offset();
        sqlx::query_as!(
            Todo,
            r#"INSERT INTO todos (title, content, created_at, completed_at)
            VALUES ($1, $2, $3, NULL)
            RETURNING *"#,
            init.title,
            init.content,
            now,
        )
        .fetch_one(&mut conn)
        .await
    }

    pub async fn find(id: i32) -> sqlx::Result<Todo> {
        let mut conn = PgConnection::connect(&DATABASE_URL).await.unwrap();
        sqlx::query_as!(
            Todo,
            "SELECT *
            FROM todos
            WHERE id = $1",
            id
        )
        .fetch_one(&mut conn)
        .await
    }
}
