import { createFileRoute } from "@tanstack/react-router";
import ListTodos from "../Pages/ListTodos";
import AddTodo from "../components/AddTodo";
import Home from "../Pages/Home";

export const Route: any = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Home />
    </>
  );
}
