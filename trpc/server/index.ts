import { createHTTPServer } from "@trpc/server/adapters/standalone";
import * as v from "valibot";
import { publicProcedure, router } from "./trpc";

let appState = 0;
const appRouter = router({
  increment: publicProcedure.input(v.object({ increment: v.number() })).mutation(async (opts) => {
    const { increment } = opts.input;
    appState += increment;
    return appState;
  }),
  current: publicProcedure.query(async (_opts) => {
    return appState;
  }),
});

createHTTPServer({ router: appRouter }).listen(3000);

export type AppRouter = typeof appRouter;
