import { adminProcedure, protectedProcedure } from "../../lib/trpc";
import { createCategorySchema } from "../../schemas/todo";
import { createCategoryForAllService, createCategoryService } from "../../services/category";

export const create = protectedProcedure
  .input(
    createCategorySchema
  )
  .mutation(({ input , ctx }) => {
    createCategoryService(input.name , ctx.userId)
  });

export const createForAll = adminProcedure
  .input(
    createCategorySchema
  )
  .mutation(({ input }) => {
    createCategoryForAllService(input.name )
  });