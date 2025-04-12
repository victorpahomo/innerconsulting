import { User } from "@/features/users/types";
import { Task, TaskStatus } from "../types";

const API_URL = "http://localhost:3001";

// Función para normalizar las tareas ignorando cualquier campo userId
const normalizeTask = (task: Record<string, unknown>): Task => {
  // Extraer los campos que necesitamos para crear un objeto Task válido
  const id = task.id as number;
  const title = task.title as string;
  const description = task.description as string;
  const status = task.status as TaskStatus;
  const assignedUsers = (task.assignedUsers as User[]) || [];

  // Retornar un objeto Task limpio
  return {
    id,
    title,
    description,
    status,
    assignedUsers,
  };
};

export const taskService = {
  async getAllTasks(): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const tasks = await response.json();
    // Normalizar todas las tareas
    return tasks.map(normalizeTask);
  },

  async getTaskById(id: number): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch task with id ${id}`);
    }
    const task = await response.json();
    return normalizeTask(task);
  },

  async createTask(task: Omit<Task, "id">): Promise<Task> {
    // Asegurar que solo enviamos los campos válidos para nuestra interfaz Task
    const { title, description, status, assignedUsers = [] } = task;

    const cleanTask = {
      title,
      description,
      status,
      assignedUsers,
    };

    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanTask),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    const createdTask = await response.json();
    return normalizeTask(createdTask);
  },

  async updateTaskPartial(id: number, task: Partial<Task>): Promise<Task> {
    // Eliminar cualquier campo antiguo que pudiera haberse colado
    const { title, description, status, assignedUsers } = task;

    const cleanPartialTask: Partial<Task> = {};
    if (title !== undefined) cleanPartialTask.title = title;
    if (description !== undefined) cleanPartialTask.description = description;
    if (status !== undefined) cleanPartialTask.status = status;
    if (assignedUsers !== undefined)
      cleanPartialTask.assignedUsers = assignedUsers;

    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanPartialTask),
    });
    if (!response.ok) {
      throw new Error(`Failed to update task with id ${id}`);
    }
    const updatedTask = await response.json();
    return normalizeTask(updatedTask);
  },

  async updateTask(task: Task): Promise<Task> {
    // Eliminar cualquier campo antiguo y usar solo los campos válidos
    const { id, title, description, status, assignedUsers = [] } = task;

    const cleanTask = {
      title,
      description,
      status,
      assignedUsers,
    };

    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanTask),
    });
    if (!response.ok) {
      throw new Error(`Failed to update task with id ${id}`);
    }
    const updatedTask = await response.json();
    return normalizeTask(updatedTask);
  },

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    return this.updateTaskPartial(id, { status });
  },

  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete task with id ${id}`);
    }
  },
};
