import { appRouter } from "@/app/server";
import { Post, User } from "@/app/server/db";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";


const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({
      db: {
        Post: Post,
        User: User
      }
    }),
  });

export { handler as GET, handler as POST };
