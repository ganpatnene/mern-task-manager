import API from "../api";
import toast from "react-hot-toast";
export default function TaskList({ tasks, setTasks }) {
  const toggleTask = async (id, completed) => {
    try {
      const res = await API.put(`/tasks/${id}`, { completed: !completed });
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      toast.success("Task updated ✏️");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to update task ❌");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted 🗑️");
    } catch (err) {
      toast.error("Failed to delete task ❌");
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
