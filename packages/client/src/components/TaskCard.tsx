import CreatedAt from "./CreatedAt";
import SubTasks from "./SubTasks";

function TaskCard({
  todo,
}: {
  todo:
    | {
        id: string;
        title: string;
        isCompleted: boolean;
        createdAt: string;
        subTasks: { item: string }[];
      }
    | null
    | undefined;
}) {
  const subtasks = todo?.subTasks.map((subTask) => subTask.item) || [];
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-sm w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{todo?.title}</h2>
      <SubTasks subTasks={subtasks} />
      <CreatedAt createdAt={todo?.createdAt} />
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

export default TaskCard;
