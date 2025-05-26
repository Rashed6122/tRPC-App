import { createFileRoute } from "@tanstack/react-router";
import AddTodoForm from "../../../components/admin/AddTodoForm";

export const Route = createFileRoute("/_teamLead/admin/addOne")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AddTodoForm />;
}
