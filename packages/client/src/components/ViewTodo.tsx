import { trpc } from "../lib/trpc";
import TaskCard from "./TaskCard";

export default function ViewTodo(props: { id: string }) {
  const { data: todo } = trpc.todo.getOne.useQuery(
    { id: props.id },
    {
      initialData: {
        id: props.id,
        title: "",
        isCompleted: false,
        createdAt: new Date().toString(),
        subTasks: [],
      },
    }
  );

  return <TaskCard todo={todo} />;
}
