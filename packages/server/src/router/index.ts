import trpc from "../lib/trpc";
import categoriesRouter from "./categoriesRouter";
import todoRouter from "./todo";

export const appRouter = trpc.router({
  todo: todoRouter,
  category: categoriesRouter,
});

export type AppRouter = typeof appRouter;

