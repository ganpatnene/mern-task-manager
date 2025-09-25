import API from "../api";

export default function TaskList({ tasks, setTasks }) {
  const toggleTask = async (id, completed) => {
    try {
      const res = await API.put(`/tasks/${id}`, { completed: !completed });
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
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
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => toggleTask(task._id, task.completed)}
          >
            {task.title}
          </span>
          <button onClick={() => deleteTask(task._id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}