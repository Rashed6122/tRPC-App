import { createFileRoute } from "@tanstack/react-router";
import TrashPage from "../../Pages/Trash";
import Aside from "../../components/Aside";
import Pinned from "../../components/Pinned";

export const Route = createFileRoute("/auth/trash")({
  component: Trash,
});

function Trash() {
  return (
    <>
      <div className="relative min-h-screen md:flex flex h-screen">
        <div className="overflow-y-auto">
          <Aside />
        </div>
        <div className="flex-1 max-w-xl mx-auto justify-items-center overflow-y-auto">
          <div className="max-w-md max-h-md mx-auto gap-y-4 mt-8">
            <TrashPage />
          </div>
        </div>
      </div>
    </>
  );
}
