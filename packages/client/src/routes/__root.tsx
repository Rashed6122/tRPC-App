import { createRootRoute } from "@tanstack/react-router";
import App from "../App";
import { Outlet } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <App />
    </>
  ),
});
