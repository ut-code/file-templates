import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import { panic } from "../lib/panic";

const db = drizzle(
	process.env.DATABASE_URL || panic("Env `DATABASE_URL` not found!"),
);
