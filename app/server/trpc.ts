import { initTRPC } from "@trpc/server";
import { Post, User } from "./db";

const t = initTRPC.context<{db: { Post : typeof Post, User: typeof User}; userId?: String}>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
 