import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Aside from "../components/Aside";
import Pinned from "../components/Pinned";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.authentication;
    console.log("isAuthenticated", isAuthenticated());
    if (!isAuthenticated()) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <>
      <div className="relative min-h-screen md:flex flex h-screen">
        <div className="overflow-y-auto">
          <Aside />
        </div>
        <div className="flex-1 max-w-xl mx-auto justify-items-center overflow-y-auto">
          <div className="max-w-md max-h-md mx-auto gap-y-4 mt-8">
            <Outlet />
          </div>
        </div>
        <div className="overflow-y-auto">
          <Pinned />
        </div>
      </div>
    </>
  );
}
