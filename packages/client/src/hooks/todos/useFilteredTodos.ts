import { trpc } from "../../lib/trpc";

export const useFilteredTodos = (categoryId: string | undefined) => {
  // Fetch all todos
  let { data: allTodos, isLoading, error } = trpc.todo.allTodos.useQuery();

  if (categoryId) {
    const filteredTodos = allTodos?.filter((todo) => todo.categoryId === categoryId) ?? [];
    allTodos = filteredTodos;
  }
  return {
    data: allTodos,
    isLoading,
    error,
  };
};
