import { useEffect } from "react";
import { trpc } from "../lib/trpc";
import TrashStore from "../store/useTrashStore";
import { useNavigate } from "@tanstack/react-router";

function Trash() {
  const { data, isLoading } = trpc.todo.trash.useQuery();
  const { trashList, setTrashList } = TrashStore();
  useEffect(() => {
    if (data) {
      setTrashList(data);
    }
  }, [data]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="text-center text-3xl font-bold text-gray-700 my-9">
        <h1>Trash</h1>
      </div>
      <div className="grid gap-y-4 px-4 ">
        <ul className="menu lg:menu-horizontal bg-base-200 opacity-50 rounded-box lg:mb-64 space-y-2 w-56 lg:w-full mx-auto">
          {trashList.map((todo) => {
            return (
              <li key={todo.id}>
                <details open>
                  <summary className="flex justify-between  items-center  bg-slate-400 py-2 px-3 space-x-2 p-2  rounded-lg shadow-md hover:bg-base-200">
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

                    <button className="text-white bg-blue-600 px-2 py-1 rounded text-sm cursor-pointer hover:text-black">
                      {"Restore"}
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
      </div>
    </div>
  );
}

export default Trash;
