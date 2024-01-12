import { appRouter } from "@/app/server";
import { Post } from "@/app/server/db";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({
      db: {
        Post: Post
      },
      userId: crypto.randomUUID()
    }),
  });

export { handler as GET, handler as POST };
