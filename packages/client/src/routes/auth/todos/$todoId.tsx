import { createFileRoute } from "@tanstack/react-router";
import ViewTodo from "../../../components/ViewTodo";
import Pinned from "../../../components/Pinned";
import Aside from "../../../components/Aside";

export const Route = createFileRoute("/auth/todos/$todoId")({
  component: todo,
});

function todo() {
  const { todoId } = Route.useParams();
  return (
    <>
      <div className="relative min-h-screen md:flex flex h-screen">
        <div className="overflow-y-auto">
          <Aside />
        </div>
        <div className="flex-1 max-w-xl mx-auto justify-items-center overflow-y-auto">
          <div className="max-w-md max-h-md mx-auto gap-y-4 mt-8">
            <ViewTodo id={todoId} />
          </div>
        </div>
        <div className="overflow-y-auto">
          <Pinned />
        </div>
      </div>
    </>
  );
}
