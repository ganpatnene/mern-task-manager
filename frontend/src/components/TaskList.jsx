import API from "../api";
export default function TaskList({ tasks, setTasks }) {
  const toggleTask = async (id, completed) => {
    try {
      const res = await API.put(`/tasks/${id}`, { completed: !completed });
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow"
        >
          <span
            className={`cursor-pointer ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
            onClick={() => toggleTask(task._id, task.completed)}
          >
            {task.title}
          </span>
          <button
            onClick={() => deleteTask(task._id)}
            className="text-red-600 hover:text-red-800"
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}
