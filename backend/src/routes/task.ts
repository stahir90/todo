import { Request, Response, Router } from "express";

const router = Router();

interface Task {
  id: string;
  title: string;
  description?: string;
}

let taskList: Task[] = [];

//Get all Tasks
router.get("/", (req: Request, res: Response) => {
  res.status(200).json(taskList);
});

//Get all Tasks by id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const savedTask = taskList.find((task) => task.id === id);

  if (!savedTask) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(200).json(savedTask);
});

// Post Todo
router.post("/", (req, res) => {
  const { title, description } = req.body;

  const newTask = {
    id: new Date().toISOString(),
    title,
    description,
  };
  taskList.push(newTask);

  res.status(201).json(newTask);
});

// Put to update a task
router.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const savedTaskIndex = taskList.findIndex((task) => task.id === id);

  if (savedTaskIndex === -1) {
    res.status(404).send("Item not found, please create a Todo first");
    return;
  }

  const { title, description } = req.body;

  if (!title) {
    res.status(400).send("Invalid input: title is required.");
    return;
  }

  taskList[savedTaskIndex] = {
    ...taskList[savedTaskIndex],
    title,
    description,
  };

  res.status(200).json(taskList[savedTaskIndex]);
});

// delete a task
router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  // filter the task to be deleted
  const filteredTasks = taskList.filter((task) => task.id !== id);

  if (filteredTasks.length === taskList.length) {
    // task not found response
    res.status(404).send("Item not found, please send a valid ID to delete");
    return;
  }

  taskList = filteredTasks;
  res.status(204).send();
});

export default router;
