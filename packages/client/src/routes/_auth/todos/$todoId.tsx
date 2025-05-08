import { createFileRoute } from "@tanstack/react-router";
import ViewTodo from "../../../components/ViewTodo";

export const Route = createFileRoute("/_auth/todos/$todoId")({
  component: todo,
});

function todo() {
  const { todoId } = Route.useParams();
  return <ViewTodo id={todoId} />;
}
