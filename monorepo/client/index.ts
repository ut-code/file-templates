import type { App } from "&server";
import { hc } from "hono/client";

const client = hc<App>("http://localhost:3000");

const res = await client.index.$get();
const text: "Hello, World!" = await res.text();
