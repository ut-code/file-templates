import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
	id: serial().primaryKey(),
	title: varchar({ length: 255 }).notNull().unique(),
	content: text().notNull(),
	created_at: timestamp().notNull(),
	completed_at: timestamp(),
});
