import { trpc } from "../../lib/trpc";
import { useAuth } from "../useAuth";

const useCreateTodo = () => {
  const user  = useAuth().getUser();
  const context = trpc.useUtils();
  return trpc.todo.create.useMutation({
    onMutate: (todo) => {
      context.todo.allTodos.setData({id: user.id}, (old) => {
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
