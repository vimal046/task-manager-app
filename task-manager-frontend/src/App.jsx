import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./index.css"; // Tailwind styles

export default function App() {
  const [refreshSignal, setRefreshSignal] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  // Refresh task list
  const triggerReload = () => setRefreshSignal((prev) => prev + 1);

  // Edit task
  const handleEditRequested = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaved = () => {
    setEditingTask(null);
    triggerReload();
  };

  const handleCancelEdit = () => setEditingTask(null);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        <TaskForm
          onSaved={handleSaved}
          editingTask={editingTask}
          onCancel={handleCancelEdit}
        />
        <TaskList
          onEditRequested={handleEditRequested}
          refreshSignal={refreshSignal}
        />
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 pb-4">
        Built with Spring Boot + React + Tailwind
      </div>
    </div>
  );
}
