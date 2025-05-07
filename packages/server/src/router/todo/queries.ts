import trpc from "../../lib/trpc";
import { getOneService, todosService, trashService } from "../../services/todo";
import {idSchema, optionalIdSchema} from "../../schemas/todo"

export const allTodos = trpc.procedure
.input(idSchema)
.query(async ({input}) => {
  const data = await todosService(input.id);
  return data;
});

export const trash = trpc.procedure
.input(idSchema)
.query(async ({input}) => {
  const data = await trashService(input.id);
  return data;
});

export const getOne = trpc.procedure
  .input(idSchema)
  .query(async ({ input }) => {
    const data = await getOneService(input.id);
    return data;
  });
