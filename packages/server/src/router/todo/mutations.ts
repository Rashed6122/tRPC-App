import { protectedProcedure} from "../../lib/trpc";
import {createSchema, idSchema, updateSchema} from "../../schemas/todo";
import { assignService, createService, deleteService, destoryService, restoreService, updateService} from "../../services/todo";

export const create = protectedProcedure
  .input(
    createSchema
  )
  .mutation(({ input }) => {
    createService(input)
  });

export const assign = protectedProcedure
  .input(
    createSchema
  )
  .mutation(({ input }) => {
    assignService(input)
  });

export const deleteTodo = protectedProcedure
  .input(idSchema)
  .mutation(({ input }) => {
    deleteService(input.id)
  });

export const destory = protectedProcedure
  .input(idSchema)
  .mutation(({ input }) => {
    destoryService(input.id)
  });

export const restore = protectedProcedure
  .input(idSchema)
  .mutation(({ input }) => {
    restoreService(input.id)    
  });

export const update = protectedProcedure
  .input(
    updateSchema
  )
  .mutation(({ input }) => {
    updateService(input)
  });
