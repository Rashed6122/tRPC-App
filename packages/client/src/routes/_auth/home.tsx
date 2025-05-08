import { createFileRoute } from "@tanstack/react-router";
import Home from "../../Pages/Home";

export const Route: any = createFileRoute("/_auth/home")({
  component: Index,
});

function Index() {
  return <Home />;
}
