import {protectedProcedure } from "../../lib/trpc";
import { getOneService, todosService, trashService } from "../../services/todo";
import {idSchema} from "../../schemas/todo"

export const allTodos = protectedProcedure
.input(idSchema)
.query(async ({input}) => {
  const data = await todosService(input.id);
  return data;
});

export const trash = protectedProcedure
.input(idSchema)
.query(async ({input}) => {
  const data = await trashService(input.id);
  return data;
});

export const getOne = protectedProcedure
  .input(idSchema)
  .query(async ({ input }) => {
    const data = await getOneService(input.id);
    return data;
  });
