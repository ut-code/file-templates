import { z } from "@hono/zod-openapi";

export const insertTodoSchema = z.object({
	title: z.string().min(4).max(255),
	content: z.string(),
	created_at: z.date(),
	completed_at: z.date().nullable(),
});
export const todoSchema = z.object({
	id: z.number(),
});
