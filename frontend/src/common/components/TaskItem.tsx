import React from "react";
import { Task } from "../types/todo";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => {
  return (
    <div className="task-item p-4 border rounded-md flex justify-between items-center bg-white shadow-md slide-in">
      <div>
        <h3 className="font-bold text-lg">{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="space-x-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
