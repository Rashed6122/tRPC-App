import { trpc } from "../../lib/trpc";
import { useAuth } from "../useAuth";

export const useGetTodos = () => {
  const user  = useAuth().getUser();
  const { data: allTodos, isLoading, error } = trpc.todo.allTodos.useQuery({id: user.id}, {initialData: []});
  return {
    data: allTodos,
    isLoading,
    error,
  };
};
