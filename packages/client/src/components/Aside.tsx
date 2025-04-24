import { useEffect } from "react";
import { trpc } from "../lib/trpc";
import CategoryStore from "../store/useCategoryStore";
import todosStore from "../store/useTodoStore";
import { useNavigate } from "@tanstack/react-router";

function Aside() {
  const { setTodos, todosList, todos } = todosStore();
  const { categories, setCategories } = CategoryStore();
  const { data } = trpc.category.getAll.useQuery();
  const navigate = useNavigate({ from: "/" });
  const navigate2 = useNavigate({ from: "/trash" });

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data, setCategories]);

  return (
    <div className="relative min-h-screen md:flex">
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        <a href="#" className="block p-4 text-white font-bold">
          Categories
        </a>

        <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        <a href="#" className="text-white flex items-center space-x-2 px-4">
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <span className="text-2xl font-extrabold">Categories</span>
        </a>

        <nav>
          <a
            onClick={() => {
              console.log(todosList, todos);
              setTodos(todosList);
              navigate2({ to: "/" });
            }}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            All Tasks
          </a>
          {categories.map((category) => {
            return (
              <a
                onClick={() => {
                  setTodos(
                    todosList.filter((todo) => todo.categoryId === category.id)
                  );
                }}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
              >
                {category.name}
              </a>
            );
          })}
          <a
            className="flex  justify-between py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white "
            onClick={() => navigate({ to: "/trash" })}
          >
            Trash List
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Aside;
