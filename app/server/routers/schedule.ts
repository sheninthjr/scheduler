import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const scheduleRouter = router({
  schedulePost: publicProcedure
  .input(z.object({ title: z.string(), day: z.string(), userId: z.string() }))
  .mutation(async (opts) => {
    const title = opts.input.title;
    const day = opts.input.day;
    const userId = opts.input.userId;
    const newPost = new opts.ctx.db.Post({
      title,
      day,
      done: false,
      userId,
    });
    let res = await newPost.save();
    return {
      id: res.id,
    };
  }),
  queryPost: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const userId = opts.input.userId;
      const response = await opts.ctx.db.Post.find({
        userId: userId,
      });
      return response.map((x) => ({
        _id: x._id.toString(),
        title: x.title || "",
        day: x.day || "",
        done: x.done,
      }));
    }),
  doneStatus: publicProcedure
    .input(z.object({  _id: z.string(),done: z.boolean() }))
    .mutation(async (opts) => {
      const _id = opts.input._id;
      const updatedPost = await opts.ctx.db.Post.findByIdAndUpdate(
        _id,
        { done: opts.input.done },
        { new: true }
      );
      if (!updatedPost) {
        throw new Error(`Post with id ${_id} not found`);
      }
      console.log(updatedPost)
      return updatedPost;
    }),
});
