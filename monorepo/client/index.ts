import { hc } from "hono/client";
import type { App } from "&server";

const client = hc<App>("http://localhost:3000");

const res = await client.index.$get();
const text: "Hello, World!" = await res.text();
