import { trpc } from "../../lib/trpc";
import { useUserStore } from "../userStore/useUserStore";

export const useGetTodos = () => {
  const user  = useUserStore((state) => state.user);
  const { data: allTodos, isLoading, error } = trpc.todo.allTodos.useQuery({id: user?.id || "cmachm7w60002v2wc0djgsrde"}, {initialData: []});
  return {
    data: allTodos,
    isLoading,
    error,
  };
};
