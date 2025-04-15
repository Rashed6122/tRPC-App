interface SubTasksProps {
  subTasks: string[];
}

function SubTasks({ subTasks }: SubTasksProps) {
  return (
    <div>
      <ul className="menu bg-base-200 rounded-box w-56">
        <li>
          <ul>
            {subTasks.map((subTask, index) => (
              <li key={index}>
                <a> {index + 1 + "-" + subTask}</a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default SubTasks;
