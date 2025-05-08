import { useNavigate } from "@tanstack/react-router";

export default function AddTodo() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 grid-rows-1 mx-1">
      <button
        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-500 text-white py-1 px-3 rounded-md"
        onClick={() => {
          navigate({ to: "/addOne" });
        }}
      >
        Add todo
      </button>
    </div>
  );
}
