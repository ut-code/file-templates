# OpenAPI sample via To Do App

```yaml
schema:
- todo:
    title: string UNIQUE MAX(255B)
    content: string
    created_at: Date
    completed_at: Date CAN NULL

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
