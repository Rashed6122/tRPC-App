import AddTodo from "../components/AddTodo";
import ListTodos from "./ListTodos";

function Home() {
  return (
    <div>
      <div className="text-center text-3xl font-bold text-gray-700 my-9">
        <h1>ToDo List </h1>
      </div>
      <div className="grid gap-y-4 px-4">
        <AddTodo />
        <hr className="border-t-4 rounded-sm"></hr>
        <ListTodos />
      </div>
    </div>
  );
}

export default Home;
