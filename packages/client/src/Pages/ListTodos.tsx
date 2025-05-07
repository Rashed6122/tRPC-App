import { useNavigate } from "@tanstack/react-router";
import { trpc } from "../lib/trpc";
import { TiPin } from "react-icons/ti";
import { RiUnpinFill } from "react-icons/ri";
import { TrashIcon } from "../icons/trash";
import { useGetTodos } from "../hooks/todos/useGetTodos";
import useUpdateTodo from "../hooks/todos/useUpdateTodo";
import { useUserStore } from "../hooks/userStore/useUserStore";

export default function ListTodos() {
  const { data: todos, isLoading } = useGetTodos();
  const trpcContext = trpc.useUtils();
  const user = useUserStore((state) => state.user);

  const deleteMutation = trpc.todo.deleteTodo.useMutation({
    onMutate: async (deletedTodo) => {
      trpcContext.todo.allTodos.setData({ id: user?.id || "test" }, (old) => [
        ...(old || []).filter((todo) => todo.id !== deletedTodo.id),
      ]);
    },
  });

  const updateMutation = useUpdateTodo();
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="text-center text-3xl font-bold text-gray-700 my-9">
        Loading...
      </div>
    );
  }
  if (todos.length === 0) {
    return (
      <div className="text-center text-3xl font-bold text-gray-700 my-9">
        Great Job You have no tasks to do
      </div>
    );
  }

  return (
    <ul className="menu lg:menu-horizontal bg-base-200 rounded-box space-y-2 w-56 lg:w-full mx-auto">
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <details open>
              <summary className="flex justify-between items-center bg-slate-400 py-2 px-3 space-x-2 p-2  rounded-lg shadow-md hover:bg-base-200">
                <div className="flex-grow">
                  <div className="inline-flex items-center gap-2">
                    <span>{todo.title}</span>
                    {todo.subTasks.length > 0 && (
                      <span className="flex items-center justify-center size-6 rounded-full bg-blue-600 text-white text-base">
                        {todo.subTasks.length}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  onClick={() => {
                    updateMutation.mutate(
                      {
                        id: todo.id,
                        pinned: !todo.pinned,
                        isCompleted: todo.isCompleted,
                      },
                      {
                        onSuccess: () => {
                          // trpcContext.todo.allTodos.invalidate();
                        },
                      }
                    );
                  }}
                >
                  {todo.pinned ? (
                    <RiUnpinFill className="text-blue-600" />
                  ) : (
                    <TiPin className="text-blue-600" />
                  )}
                </div>

                <button
                  className="text-white bg-blue-600 px-2 py-1 rounded text-sm cursor-pointer hover:text-black"
                  onClick={() => {
                    navigate({
                      to: "/auth/todos/$todoId",
                      params: { todoId: todo.id },
                    });
                  }}
                >
                  {"View"}
                </button>
                <button
                  className="text-white bg-green-600 px-2 py-1 rounded text-sm hover:line-through cursor-pointer hover:text-black"
                  onClick={() =>
                    updateMutation.mutate({
                      id: todo.id,
                      isCompleted: !todo.isCompleted,
                      pinned: todo.pinned,
                    })
                  }
                >
                  {todo.isCompleted ? "Complete" : "Incomplete"}
                </button>
                <button
                  disabled={!todo.id}
                  onClick={() => {
                    deleteMutation.mutate(
                      { id: todo.id },
                      {
                        onSuccess: () => {
                          trpcContext.todo.trash.invalidate();
                        },
                      }
                    );
                  }}
                  className="text-red-500 hover:text-white hover:bg-red-500 p-1 rounded disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <TrashIcon />
                </button>
              </summary>
              <ul className="list-disc list-inside ml-4 mt-2">
                {todo.subTasks.map((subTask) => {
                  return (
                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      ></input>
                      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {subTask.item}
                      </label>
                    </div>
                  );
                })}
              </ul>
            </details>
          </li>
        );
      })}
    </ul>
  );
}
