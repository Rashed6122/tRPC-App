import { trpc } from "../../lib/trpc";
import { useUserStore } from "../userStore/useUserStore";

const useCreateTodo = () => {
  const user  = useUserStore((state) => state.user);
  const context = trpc.useUtils();
  return trpc.todo.create.useMutation({
    onMutate: (todo) => {
      context.todo.allTodos.setData({id: user?.id || "cmachm7w60002v2wc0djgsrde"}, (old) => {
        if (!old) return;
        return [
          ...old,
          {
            ...todo,
            subTasks: todo.subTasks ?? [],
            isCompleted: false,
            createdAt: new Date().toString(),
            id: "",
          },
        ];
      });
    },
  });
};

export default useCreateTodo;
