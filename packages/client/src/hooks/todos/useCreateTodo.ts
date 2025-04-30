import { trpc } from "../../lib/trpc";

const useCreateTodo = () => {
  const context = trpc.useUtils();
  return trpc.todo.create.useMutation({
    onMutate: (todo) => {
      context.todo.allTodos.setData(undefined, (old) => {
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
