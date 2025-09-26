import { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/tasks", { title });
      onTaskAdded(res.data);
      setTitle("");
      toast.success("Task added ✅");
    } catch {
      toast.error("Failed to add task ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="New task..."
        className="flex-grow border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
        Add
      </button>
    </form>
  );
}
