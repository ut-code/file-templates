import { type OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { and, eq, isNotNull, isNull, like } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { todos } from "../db/schema";
import type { Todo } from "../types";
import { todoSchema } from "../zod.schema";

const ParamsSchema = z.object({
	completed: z
		.string()
		.optional()
		.openapi({
			examples: [undefined, "true", "false"],
		}),
	title: z
		.string()
		.optional()
		.openapi({
			examples: [undefined, "Commit", "Project", "not exist"],
		}),
	content: z
		.string()
		.optional()
		.openapi({
			examples: [undefined, "Create", "day", "not exist"],
		}),
});

const route = createRoute({
	method: "get",
	path: "/todos",
	request: {
		params: ParamsSchema,
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.array(todoSchema),
				},
			},
			description: "Retrieve todos",
		},
		500: {
			description: "Something has gone wrong on the server",
		},
	},
});

export default (app: OpenAPIHono, db: NodePgDatabase) => {
	app.openapi(route, async (c) => {
		try {
			const { title, content, completed: strCompleted } = c.req.valid("param");
			let completed: boolean | undefined;
			switch (strCompleted) {
				case undefined:
					break;
				case "true":
					completed = true;
					break;
				case "false":
					completed = false;
					break;
				default:
					return c.text("Invalid completed: expected true or false", 400);
			}
			const select: Todo[] = await db
				.select()
				.from(todos)
				.where(
					and(
						like(todos.title, title || todos.title),
						like(todos.content, content || todos.content),
						completed === true
							? isNotNull(todos.completed_at)
							: completed === false
								? isNull(todos.completed_at)
								: eq(todos.id, todos.id),
					),
				)
				.execute();
			switch (select.length) {
				case 0:
					return c.json(select, 404);
				default:
					return c.json(select);
			}
		} catch (err) {
			console.error(err);
			return c.text("error thrown", 500);
		}
	});
};
