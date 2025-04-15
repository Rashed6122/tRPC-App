import { trpc } from "../lib/trpc";
import SubTasks from "./SubTasks";

export default function ViewTodo(props: { id: string }) {
  const response = trpc.todo.getOne.useQuery({ id: props.id });
  const todo = response.data;
  const subtasks = todo?.subTasks.map((subTask) => subTask.item) || [];
  const formattedDate = todo?.createdAt
    ? new Date(todo?.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "Invalid date";
  return (
    //  <h2>{ response.data?.title }</h2>
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-sm w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{todo?.title}</h2>
      <SubTasks subTasks={subtasks} />
      <p className="text-sm text-gray-600 mb-2">
        Created At:{" "}
        <span className="text-gray-700 font-medium">{formattedDate}</span>
      </p>
      <p
        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
          todo?.isCompleted
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {todo?.isCompleted ? "Completed" : "Not Completed"}
      </p>
    </div>
  );
}
