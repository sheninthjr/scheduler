import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const scheduleRouter = router({
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
})