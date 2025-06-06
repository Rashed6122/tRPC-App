import { trpc } from "../lib/trpc";
import MiniCard from "./MiniCard";
import { useAuth } from "../hooks/useAuth";
function Pinned() {
  const user = useAuth().getUser();
  const { data: todosList } = trpc.todo.allTodos.useQuery({
    id: user.id,
  });
  const pinnedList = todosList?.filter((todo) => todo.pinned) ?? [];
  return (
    <div className="relative min-h-screen md:flex">
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        <a href="#" className="block p-4 text-white font-bold ">
          Pinned Tasks
        </a>
      </div>
      <div
        className={`${user.role === "ADMIN" ? "bg-cyan-700" : "bg-blue-800"} text-blue-100 w-66 space-y-6 py-7 px-2 absolute inset-y-0 right-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <a href="#" className="text-white flex items-center space-x-2 px-4">
          <span className="text-2xl font-extrabold">Pinned Tasks</span>
        </a>
        <div className="text-white flex-grow space-y-6 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
          {pinnedList.map((todo) => {
            return <MiniCard todo={todo} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Pinned;
