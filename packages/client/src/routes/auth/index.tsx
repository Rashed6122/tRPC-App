import { createFileRoute, Outlet } from "@tanstack/react-router";
import Home from "../../Pages/Home";
import Aside from "../../components/Aside";
import Pinned from "../../components/Pinned";

export const Route: any = createFileRoute("/auth/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div className="relative min-h-screen md:flex flex h-screen">
        <div className="overflow-y-auto">
          <Aside />
        </div>
        <div className="flex-1 max-w-xl mx-auto justify-items-center overflow-y-auto">
          <div className="max-w-md max-h-md mx-auto gap-y-4 mt-8">
            <Home />
          </div>
        </div>
        <div className="overflow-y-auto">
          <Pinned />
        </div>
      </div>
    </>
  );
}
