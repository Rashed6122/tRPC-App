import { createFileRoute } from "@tanstack/react-router";
import Home from "../../../Pages/Home";

export const Route = createFileRoute("/_teamLead/admin/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Home />;
}
