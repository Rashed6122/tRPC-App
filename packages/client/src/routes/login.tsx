import { createFileRoute } from "@tanstack/react-router";
import SignIn from "../Pages/SignIn";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return <SignIn />;
}
