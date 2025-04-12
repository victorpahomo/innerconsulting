import { openDB, DBSchema } from "idb";
import { Task } from "../tasks/types";
import { User } from "../users/types";

interface TasksDB extends DBSchema {
  tasks: {
    key: number;
    value: Task;
    indexes: { "by-status": string };
  };
  users: {
    key: number;
    value: User;
  };
}

const DB_NAME = "tasks-kanban-db";
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB<TasksDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create a store of tasks
      const taskStore = db.createObjectStore("tasks", {
        keyPath: "id",
      });
      taskStore.createIndex("by-status", "status");

      // Create a store of users
      db.createObjectStore("users", {
        keyPath: "id",
      });
    },
  });
};

// Tasks operations
export const storeTasks = async (tasks: Task[]) => {
  const db = await initDB();
  const tx = db.transaction("tasks", "readwrite");
  tasks.forEach((task) => tx.store.put(task));
  await tx.done;
};

export const getAllTasks = async (): Promise<Task[]> => {
  const db = await initDB();
  return db.getAll("tasks");
};

export const getTasksByStatus = async (status: string): Promise<Task[]> => {
  const db = await initDB();
  return db.getAllFromIndex("tasks", "by-status", status);
};

export const addTask = async (task: Task): Promise<void> => {
  const db = await initDB();
  await db.add("tasks", task);
};

export const updateTask = async (task: Task): Promise<void> => {
  const db = await initDB();
  await db.put("tasks", task);
};

export const deleteTask = async (id: number): Promise<void> => {
  const db = await initDB();
  await db.delete("tasks", id);
};

// Users operations
export const storeUsers = async (users: User[]) => {
  const db = await initDB();
  const tx = db.transaction("users", "readwrite");
  users.forEach((user) => tx.store.put(user));
  await tx.done;
};

export const getAllUsers = async (): Promise<User[]> => {
  const db = await initDB();
  return db.getAll("users");
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  const db = await initDB();
  return db.get("users", id);
};
