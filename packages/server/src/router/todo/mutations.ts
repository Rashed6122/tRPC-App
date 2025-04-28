import trpc from "../../lib/trpc";
import {createSchema, idSchema, updateSchema} from "../../schemas/todo";
import { createService, deleteService, destoryService, restoreService, updateService} from "../../services/todo";

export const create = trpc.procedure
  .input(
    createSchema
  )
  .mutation(({ input }) => {
    createService(input)
  });

export const deleteTodo = trpc.procedure
  .input(idSchema)
  .mutation(({ input }) => {
    deleteService(input.id)
  });

export const destory = trpc.procedure
  .input(idSchema)
  .mutation(({ input }) => {
    destoryService(input.id)
  });

export const restore = trpc.procedure
  .input(idSchema)
  .mutation(({ input }) => {
    restoreService(input.id)    
  });

export const update = trpc.procedure
  .input(
    updateSchema
  )
  .mutation(({ input }) => {
    updateService(input)
  });
