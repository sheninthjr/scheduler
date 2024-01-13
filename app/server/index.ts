import { router } from "./trpc";
import mongoose from "mongoose";
import { scheduleRouter } from "./routers/schedule";
import { userRouter } from "./routers/user";

mongoose.connect(
  process.env.MONGODB_URI || "",
  { dbName: "scheduler" }
);

export const appRouter = router({
  schedule : scheduleRouter,
  user : userRouter
});

export type AppRouter = typeof appRouter;
