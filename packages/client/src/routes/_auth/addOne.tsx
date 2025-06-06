import { createFileRoute } from "@tanstack/react-router";
import AddTodoForm from "../../components/AddTodoForm";

export const Route: any = createFileRoute("/_auth/addOne")({
  component: AddOne,
});

function AddOne() {
  return <AddTodoForm />;
}
