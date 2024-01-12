import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import mongoose from "mongoose";
import { scheduleRouter } from "./routers/schedule";
import { userRouter } from "./routers/user";

mongoose.connect(
  "mongodb+srv://sheninthjr:Sheninth23@todo.on3kfnx.mongodb.net/scheduler",
  { dbName: "scheduler" }
);

export const appRouter = router({
  schedule : scheduleRouter,
  user : userRouter
});

export type AppRouter = typeof appRouter;
