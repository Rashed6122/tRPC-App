import { useEffect } from "react";
import AddTodo from "../components/AddTodo";
import ListTodos from "./ListTodos";
import { trpc } from "../lib/trpc";
import todosStore from "../store/useTodoStore";

function Home() {
  const { todosList, setTodosList } = todosStore();

  const { data, isLoading } = trpc.todo.allTodos.useQuery();
  useEffect(() => {
    if (data) {
      setTodosList(data);
    }
  }, [data]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="text-center text-3xl font-bold text-gray-700 my-9">
        <h1>ToDo List </h1>
      </div>
      <div className="grid gap-y-4 px-4">
        <AddTodo />
        <hr className="border-t-4 rounded-sm"></hr>
        <ListTodos todolist={todosList} />
      </div>
    </div>
  );
}

export default Home;
