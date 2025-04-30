import trpc from "../lib/trpc";
import authRouter from "./auth";
import categoriesRouter from "./category";
import todoRouter from "./todo";

export const appRouter = trpc.router({
  todo: todoRouter,
  category: categoriesRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;

