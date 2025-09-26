import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    API.get("/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => {
        toast.error(err.response?.data?.msg || "Failed to load tasks ❌");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out 👋");
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Task Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Your Tasks</h3>
        <TaskForm onTaskAdded={(task) => setTasks((prev) => [...prev, task])} />
        {tasks.length > 0 ? (
          <TaskList tasks={tasks} setTasks={setTasks} />
        ) : (
          <p className="text-gray-500 mt-4">No tasks yet. Add one above 👆</p>
        )}
      </div>
    </div>
  );
}