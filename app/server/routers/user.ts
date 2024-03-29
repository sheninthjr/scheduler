import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        image: z.string(),
      })
    )
    .output(z.object({ userId: z.string() }))
    .mutation(async (opts) => {
      let email = opts.input.email;
      let name = opts.input.name;
      let image = opts.input.image;
      const existing = await opts.ctx.db.User.findOne({ email });
      if (existing) {
        return {
          userId: existing._id.toString(),
        };
      }
      const response = await opts.ctx.db.User.insertMany([
        {
          email,
          name,
          image,
        },
      ]);
      let userId = response[0]._id;
      return {
        userId: userId.toString(),
      };
    }),
});
