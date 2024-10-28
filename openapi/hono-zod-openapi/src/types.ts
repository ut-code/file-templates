import type { todos } from "./db/schema";

export type InsertTodo = typeof todos.$inferInsert;
export type Todo = typeof todos.$inferSelect;
