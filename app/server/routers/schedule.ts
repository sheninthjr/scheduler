import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const scheduleRouter = router({
    schedulePost: publicProcedure
    .input(z.object({ title: z.string(),day:z.string(),userId:z.string() }))
    .mutation(async (opts) => {
      const title = opts.input.title;
      const day = opts.input.day;
      const userId = opts.input.userId;
      const newPost = new opts.ctx.db.Post({
        title,
        day,
        done: false,
        userId
      });
      console.log(newPost)
      let res = await newPost.save();
      return {
        id: res.id,
      };
    }),
})