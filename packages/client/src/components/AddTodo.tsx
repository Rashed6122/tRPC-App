import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";

export default function AddTodo() {
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const user = getUser();
  return (
    <div className="grid grid-cols-1 grid-rows-1 mx-1">
      <button
        className={`${user.role === "ADMIN" ? "bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-700" : "bg-blue-500 hover:bg-blue-600 active:bg-blue-500"} text-white py-1 px-3 rounded-md`}
        onClick={() => {
          if (user.role === "ADMIN") {
            navigate({ to: "/admin/addOne" });
          } else {
            navigate({ to: "/addOne" });
          }
        }}
      >
        Add {user.role === "ADMIN" && <span>or assign</span>} todo
      </button>
    </div>
  );
}
