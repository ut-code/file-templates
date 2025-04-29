import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "^server";

const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

const r = await client.increment.mutate({ increment: 3 });
console.log("incremented to", await client.current.query());
