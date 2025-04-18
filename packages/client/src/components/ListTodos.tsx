import { useNavigate } from "@tanstack/react-router";
import { trpc } from "../lib/trpc";

export default function ListTodos() {
  const response = trpc.todo.allTodos.useQuery();
  const deleteMutation = trpc.todo.delete.useMutation();
  const updateMutation = trpc.todo.update.useMutation();
  const trpcContext = trpc.useUtils();
  const navigate = useNavigate({ from: "/" });

  if (response.isError) {
    return <h2>Error...</h2>;
  }
  if (response.isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <ul className="menu lg:menu-horizontal bg-base-200 rounded-box lg:mb-64 space-y-2">
      {response.data?.map((todo) => {
        return (
          <li key={todo.id}>
            <details open>
              <summary className="flex justify-between items-center bg-slate-400 py-2 px-3 space-x-2 p-2 bg-base-100 rounded-lg shadow-md hover:bg-base-200">
                <span className="flex-grow">
                  {todo.title + "  "}
                  {todo.subTasks.length || null}
                </span>
                <button
                  className="text-white bg-blue-600 px-2 py-1 rounded text-sm cursor-pointer hover:text-black"
                  onClick={() => {
                    navigate({
                      to: "/todos/$todoId",
                      params: { todoId: todo.id },
                    });
                  }}
                >
                  {"View"}
                </button>
                <button
                  className="text-white bg-green-600 px-2 py-1 rounded text-sm hover:line-through cursor-pointer hover:text-black"
                  onClick={() =>
                    updateMutation.mutate(
                      { id: todo.id, isCompleted: !todo.isCompleted },
                      {
                        onSuccess: () => {
                          trpcContext.todo.allTodos.invalidate();
                        },
                      }
                    )
                  }
                >
                  {todo.isCompleted ? "Complete" : "Incomplete"}
                </button>
                <button
                  onClick={() =>
                    deleteMutation.mutate(
                      { id: todo.id },
                      {
                        onSuccess: () => {
                          trpcContext.todo.allTodos.invalidate();
                        },
                      }
                    )
                  }
                  className="text-red-500 hover:text-white hover:bg-red-500 p-1 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </summary>
              <ul>
                {todo.subTasks.map((subTask) => {
                  return <li className="ml-4">{subTask.item}</li>;
                })}
              </ul>
            </details>
          </li>
        );
      })}
    </ul>
  );
}
