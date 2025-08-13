import React, { useEffect, useState } from "react";
import API from "../api";

export default function TaskForm({ onSaved, editingTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask && editingTask.id) {
        await API.put(`/tasks/${editingTask.id}`, {
          title,
          description,
          completed: editingTask.completed ?? false
        });
      } else {
        await API.post("/tasks", { title, description });
      }
      setTitle("");
      setDescription("");
      onSaved();
    } catch (err) {
      console.error(err);
      alert("Error saving task");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4 mb-4 transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {editingTask ? "Edit Task" : "Add Task"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editingTask ? "Save Changes" : "Add Task"}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
