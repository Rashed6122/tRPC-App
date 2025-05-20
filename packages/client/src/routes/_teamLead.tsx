import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { trpcClient } from "../lib/trpcClient";
import Aside from "../components/Aside";
import Pinned from "../components/Pinned";

export const Route = createFileRoute("/_teamLead")({
  beforeLoad: async () => {
    try {
      console.log("Auth route");
      const userId = await trpcClient.auth.me.query();
      if (!userId) throw new Error("Unauthorized");
    } catch {
      throw redirect({ to: "/login" });
    }
  },
  component: adminLayout,
});

function adminLayout() {
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
