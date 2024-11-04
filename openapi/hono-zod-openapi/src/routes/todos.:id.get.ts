import { type OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { todos } from "../db/schema";
import { todoSchema } from "../zod.schema";

const ParamsSchema = z.object({
  id: z.string().openapi({
    param: { in: "path" },
    examples: ["1", "1122211"],
  }),
});

const route = createRoute({
  method: "get",
  path: "/todos/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: todoSchema,
        },
      },
      description: "Retrieve the todo",
    },
    500: {
      description: "Something has gone wrong on the server",
    },
  },
});

export default (app: OpenAPIHono, db: NodePgDatabase) => {
  app.openapi(route, async (c) => {
    try {
      const id = Number.parseInt(c.req.valid("param").id);
      if (Number.isNaN(id)) return c.text("Failed to parse id", 400);
      const select = await db
        .select()
        .from(todos)
        .where(eq(todos.id, id))
        .execute();
      switch (select.length) {
        case 0:
          return c.text("not found", 404);
        case 1:
          return c.json(select[0]);
        default:
          return c.text("select returned more than 2", 500);
      }
    } catch (err) {
      console.error(err);
      return c.text("error thrown", 500);
    }
  });
};
