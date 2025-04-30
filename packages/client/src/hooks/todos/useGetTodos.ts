import { trpc } from "../../lib/trpc";

export const useGetTodos = () => {
  const { data: allTodos, isLoading, error } = trpc.todo.allTodos.useQuery(undefined, {initialData: []});
  return {
    data: allTodos,
    isLoading,
    error,
  };
};
