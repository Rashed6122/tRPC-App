interface SubTasksProps {
  subTasks: string[];
}

function SubTasks({ subTasks }: SubTasksProps) {
  return (
    <div className="mb-4">
      <ul className="menu bg-base-200 rounded-box w-56 list-decimal list-inside ml-4 mt-2">
        {subTasks.map((subTask, index) => (
          <li key={index}>{subTask}</li>
        ))}
      </ul>
    </div>
  );
}

export default SubTasks;
