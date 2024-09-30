import React, { useEffect, useState } from "react";
import TaskForm from "../common/components/TaskForm";
import TaskList from "../common/components/TaskList";
import { createTask, updateTask, getTasks } from "../gateway/api";
import { Task } from "../common/types/todo";

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    // Fetch initial list of tasks
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  const handleSaveTask = async (task: Omit<Task, "id">, id?: string) => {
    if (id) {
      // Update existing task
      const updatedTask = await updateTask(id, task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === id ? updatedTask : t))
      );
    } else {
      // Create new task
      const newTask = await createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    setCurrentTask(null);
  };

  return (
    <div className="app-container p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Task List To-Do App
      </h1>
      <TaskForm onSave={handleSaveTask} currentTask={currentTask} />
      <TaskList tasks={tasks} onEdit={setCurrentTask} setTasks={setTasks} />
    </div>
  );
};

export default Todo;
