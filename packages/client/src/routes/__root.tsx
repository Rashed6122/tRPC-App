import { createRootRouteWithContext } from "@tanstack/react-router";
import App from "../App";
import { AuthContext } from "../hooks/useAuth";

type RouterContext = {
  authentication: AuthContext;
};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <App />
    </>
  ),
});
