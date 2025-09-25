import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

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
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Your Tasks</h3>
      <TaskForm onTaskAdded={(task) => setTasks((prev) => [...prev, task])} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
