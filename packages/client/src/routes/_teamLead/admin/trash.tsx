import { createFileRoute } from "@tanstack/react-router";
import TrashPage from "../../../Pages/Trash";

export const Route = createFileRoute("/_teamLead/admin/trash")({
  component: Trash,
});

function Trash() {
  return <TrashPage />;
}
