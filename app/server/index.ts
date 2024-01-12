import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://sheninthjr:Sheninth23@todo.on3kfnx.mongodb.net/scheduler",
  { dbName: "scheduler" }
);

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [10, 20, 30];
  }),
  schedulePost: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async (opts) => {
      const title = opts.input.title;
      const newPost = new opts.ctx.db.Post({
        title,
        done: false,
        userId: opts.ctx.userId,
      });
      let res = await newPost.save();
      return {
        id: res.id,
      };
    }),
});

export type AppRouter = typeof appRouter;
