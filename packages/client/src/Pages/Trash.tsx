import React, { useEffect } from "react";
import ListTodos from "./ListTodos";
import { trpc } from "../lib/trpc";
import TrashStore from "../store/useTrashStore";

function Trash() {
  const { data, isLoading } = trpc.todo.trash.useQuery();
  const { trashList, setTrashList } = TrashStore();
  useEffect(() => {
    if (data) {
      setTrashList(data);
    }
  }, [data]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="text-center text-3xl font-bold text-gray-700 my-9">
        <h1>Trash</h1>
      </div>
      <div className="grid gap-y-4 px-4">
        <ListTodos todolist={trashList} />
      </div>
    </div>
  );
}

export default Trash;
