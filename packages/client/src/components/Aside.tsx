import { useGetCategories } from "../hooks/categories/useGetCategories";
import { useUserStore } from "../hooks/userStore/useUserStore";
import LogoIcon from "../icons/logo";
import { TrashIcon } from "../icons/trash";
import { trpc } from "../lib/trpc";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { UserCard } from "./UserCard";
import { useAuth } from "../hooks/useAuth";

function Aside() {
  // const context = useRouteContext({ from: "/_auth" });
  const { getUser } = useAuth();
  const user = getUser();
  const { data: categories } = useGetCategories();
  const navigate = useNavigate();
  const trpcContext = trpc.useUtils();
  const fillterTodos = async (categoryId: string) => {
    await trpcContext.todo.allTodos.refetch({
      id: user?.id || "test",
    });
    if (categoryId) {
      trpcContext.todo.allTodos.setData({ id: user?.id || "test" }, (old) => [
        ...(old || []).filter((todo) => todo.categoryId === categoryId),
      ]);
    }
    const data = trpcContext.todo.allTodos.getData() ?? [];
    console.log("data", data);
  };

  return (
    <div className="relative min-h-screen md:flex">
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        <a className="block p-4 text-white font-bold">Categories</a>

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

      <div
        className={`sidebar ${user.id ? "bg-cyan-700" : "bg-blue-800"} flex flex-col h-screen  text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <UserCard name={user.name} />
        <a
          className="text-white flex items-center space-x-2 px-4"
          onClick={() => {
            navigate({ to: "/home" });
          }}
        >
          <LogoIcon />
          <span className="text-2xl font-extrabold">Categories</span>
        </a>

        <nav className="flex flex-col flex-grow justify-between">
          <div>
            <a
              onClick={() => {
                fillterTodos("");
                navigate({ to: "/home" });
              }}
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
            >
              All Tasks
            </a>
            {categories.map((category) => {
              return (
                <a
                  onClick={() => {
                    fillterTodos(category.id);
                  }}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
                >
                  {category.name}
                </a>
              );
            })}
          </div>
          <a
            className=" flex justify-between py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white "
            onClick={() => navigate({ to: "/trash" })}
          >
            Trash List
            <TrashIcon />
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Aside;
