import React, { useState, useEffect } from "react";
import { Task } from "../types/todo";

interface TaskFormProps {
  onSave: (task: Omit<Task, "id">, id?: string) => void;
  currentTask?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave, currentTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    }
  }, [currentTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description }, currentTask?.id);
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form space-y-4" onSubmit={handleSubmit}>
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        {currentTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
