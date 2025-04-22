import { trpc } from "../lib/trpc";
import TaskCard from "./TaskCard";

export default function ViewTodo(props: { id: string }) {
  const response = trpc.todo.getOne.useQuery({ id: props.id });
  const todo = response.data;

  return <TaskCard todo={todo} />;
}
