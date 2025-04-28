import trpc from "../../lib/trpc";
import { getOneService, todosService, trashService } from "../../services/todo";
import {idSchema, optionalIdSchema} from "../../schemas/todo"

export const allTodos = trpc.procedure
.query(async () => {
  const data = await todosService();
  return data;
});

export const trash = trpc.procedure.query(async () => {
  const data = await trashService()
  return data;
});

export const getOne = trpc.procedure
  .input(idSchema)
  .query(async ({ input }) => {
    const data = await getOneService(input.id);
    return data;
  });
