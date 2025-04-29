import { trpc } from "../../lib/trpc";

export const useFilteredTodos = (categoryId: string) => {
  // Fetch all todos
  let { data: allTodos, isLoading, error } = trpc.todo.allTodos.useQuery(undefined, {initialData: []});
  console.log("allTodos fetched", allTodos);
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
