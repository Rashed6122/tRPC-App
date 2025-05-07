import { createFileRoute } from "@tanstack/react-router";
import RegisterPage from "../Pages/Register";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  return <RegisterPage />;
}
