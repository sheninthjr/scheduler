import { initTRPC } from "@trpc/server";
import { Post } from "./db";

const t = initTRPC.context<{db: { Post : typeof Post}; userId?: String}>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
 