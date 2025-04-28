import trpc from "../lib/trpc";
import categoriesRouter from "./category";
import todoRouter from "./todo";

export const appRouter = trpc.router({
  todo: todoRouter,
  category: categoriesRouter,
});

export type AppRouter = typeof appRouter;

