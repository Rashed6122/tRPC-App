import { trpc } from "../../lib/trpc";
import { useAuth } from "../useAuth";

const useUpdateTodo = () => {
    const user  = useAuth().getUser();
    const trpcContext = trpc.useUtils();
    return trpc.todo.update.useMutation({
            onMutate: async (updatedTodo) => {
              await trpcContext.todo.allTodos.cancel();
              const previousTodos = trpcContext.todo.allTodos.getData();
              trpcContext.todo.allTodos.setData({id :user.id }, (old) =>
                old?.map((todo) =>
                  todo.id === updatedTodo.id
                    ? {
                        ...todo,
                        pinned: updatedTodo.pinned,
                        isCompleted: updatedTodo.isCompleted,
                      }
                    : todo
                )
              );
              return { previousTodos };
            },
          });
};

export default useUpdateTodo;