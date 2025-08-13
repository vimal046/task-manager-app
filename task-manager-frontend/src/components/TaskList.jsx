import React, { useEffect, useState } from "react";
import API from "../api";

export default function TaskList({ onEditRequested, refreshSignal }) {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, [refreshSignal]);

  const toggleComplete = async (task) => {
    try {
      await API.put(`/tasks/${task.id}`, { ...task, completed: !task.completed });
      setTasks((prev) => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-md p-4 transition-colors duration-300">
      <h3 className="text-md font-semibold mb-3 text-gray-900 dark:text-gray-100">Tasks</h3>
      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No tasks yet.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map(task => (
            <li key={task.id} className="flex items-start justify-between gap-4 border rounded p-3 border-gray-300 dark:border-gray-600 transition-colors duration-300">
              <div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleComplete(task)}
                    className={`px-2 py-1 rounded text-sm ${task.completed ? "bg-green-200 dark:bg-green-700" : "bg-yellow-200 dark:bg-yellow-700"}`}
                  >
                    {task.completed ? "✅" : "⏳"}
                  </button>
                  <span className={`font-medium ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-gray-100"}`}>
                    {task.title}
                  </span>
                </div>
                {task.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {task.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEditRequested(task)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
