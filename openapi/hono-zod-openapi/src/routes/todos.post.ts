import { type OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { todos } from "../db/schema";
import { todoSchema } from "../zod.schema";

const BodySchema = z.object({
  title: z
    .string()
    .min(4)
    .max(255)
    .openapi({
      examples: ["Commit something", "Project", "not exist"],
    }),
  content: z.string().openapi({
    examples: ["Create", "day", "not exist"],
  }),
});

const route = createRoute({
  method: "post",
  path: "/todos",
  request: {
    body: {
      required: true, // <- this defaults to false :skull:
      content: {
        "application/json": {
          schema: BodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: todoSchema,
        },
      },
      description: "Create todos",
    },
    500: {
      description: "Something has gone wrong on the server",
    },
  },
});

export default (app: OpenAPIHono, db: NodePgDatabase) => {
  app.openapi(route, async (c) => {
    try {
      const { title, content } = c.req.valid("json");
      const select = await db
        .insert(todos)
        .values({
          title,
          content,
          created_at: new Date(),
          completed_at: null,
        })
        .returning()
        .execute();
      switch (select.length) {
        case 0:
          return c.json("Failed to create", 500);
        default:
          return c.json(select[0]);
      }
    } catch (err) {
      console.error(err);
      return c.text("error thrown", 500);
    }
  });
};
