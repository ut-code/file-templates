# OpenAPI + Database sample via To Do App

## How To Run

実行コマンド:

共通: `database/up.sh`
hono-zod-openapi: `cd hono-zod-openapi && bun push && bun start)`
poem-openapi: `cd poem-openapi && cargo run`
終わったら: `database/drop.sh`

どちらも、localhost:3000/docs で Swagger UI が見れます。

```yaml
schema:
  - todo:
      title: string UNIQUE MAX(255B)
      content: string
      created_at: Date
      completed_at: Date NULL

endpoints:
  - GET /api/todos:
      description: get all todos
      params:
        title=<title:string>: select where title is like <title>
        content=<content:string>: select where content is like <content>
        completed=<completed:bool>: select where completed = <completed>
  - GET /api/todos/<id>: get data of todo <id>
  - POST /api/todos:
      description: create new todo
      body: todo
  - PUT /api/todos/<id>:
      description: update data of <id>
      body: todo
```
