import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { panic } from "./src/lib/panic";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url:
			process.env.DATABASE_URL || panic("process.env.DATABASE_URL not found"),
	},
});
