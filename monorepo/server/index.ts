import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  return c.text("Hello, World!");
});

export default app;
export type App = typeof app;
