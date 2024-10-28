import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { drizzle } from "drizzle-orm/node-postgres";
import { panic } from "./lib/panic";
import route_todos_id from "./routes/todos.:id.get";
import route_todos from "./routes/todos.get";
import route_post_todos from "./routes/todos.post";

const db = drizzle(
	process.env.DATABASE_URL || panic("env DATABASE_URL not found"),
);

const app = new OpenAPIHono();

route_todos_id(app, db);
route_todos(app, db);
route_post_todos(app, db);

app.get("/", (c) => {
	return c.text("Hello, World!");
});

app.doc("/apidoc", {
	openapi: "3.0.0",
	info: {
		version: "3.0.0",
		title: "File Templates/openapi/Hono-Zod-OpenAPI",
	},
});

app.get(
	"/swagger",
	swaggerUI({
		url: "/apidoc",
	}),
);

export default app;
