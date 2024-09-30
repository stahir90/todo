import axios from "axios";
import { Task } from "../common/types/todo";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

const baseUrl = API_URL + "/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await axios.post(baseUrl, task);
  return response.data;
};

export const updateTask = async (
  id: string,
  task: Omit<Task, "id">
): Promise<Task> => {
  const response = await axios.put(`${baseUrl}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`);
};
