"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { taskService } from "@/features/tasks/services/task-service";
import { Task, TaskStatus } from "@/features/tasks/types";
import * as localDB from "@/features/storage/indexed-DB";

// Define the type of the tasks context
interface TasksContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  updateTaskStatus: (taskId: number, status: TaskStatus) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
}

// Create the tasks context with a default value
const TasksContext = createContext<TasksContextType | undefined>(undefined);

// Hook to use the tasks context
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks debe usarse dentro de un TasksProvider");
  }
  return context;
};

// Provider component
export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        // Try to get tasks from IndexedDB first
        const localTasks = await localDB.getAllTasks();

        if (localTasks.length > 0) {
          setTasks(localTasks);
        }

        // Then try to get tasks from the API
        try {
          const apiTasks = await taskService.getAllTasks();
          setTasks(apiTasks);

          // Store tasks in IndexedDB
          await localDB.storeTasks(apiTasks);
        } catch (apiError) {
          console.error("Error de API, usando datos en caché:", apiError);
          // If the API fails but we have local data, continue silently
          if (localTasks.length === 0) {
            throw apiError; // Rethrow if we don't have local data
          }
        }

        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ocurrió un error desconocido"
        );
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (taskData: Omit<Task, "id">) => {
    try {
      // Ensure assignedUsers is initialized
      const taskDataWithDefaults = {
        ...taskData,
        assignedUsers: taskData.assignedUsers || [],
      };

      // Try to add to the API first
      let newTask: Task;
      try {
        newTask = await taskService.createTask(taskDataWithDefaults);
      } catch (apiError) {
        // If the API fails, create a local task with a temporary ID
        console.error("Error de API al crear tarea:", apiError);
        newTask = {
          ...taskDataWithDefaults,
          id: Date.now(), // Use timestamp as a temporary ID
        };
      }

      // Update state
      setTasks((prevTasks) => [...prevTasks, newTask]);

      // Store in IndexedDB
      await localDB.addTask(newTask);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al añadir tarea");
    }
  };

  // Update a complete task
  const updateTask = async (updatedTask: Task) => {
    try {
      // Update in state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      // Update in IndexedDB
      await localDB.updateTask(updatedTask);

      // Try to update in the API
      try {
        await taskService.updateTask(updatedTask);
      } catch (apiError) {
        console.error("Error de API al actualizar la tarea:", apiError);
        // Continue silently if the API fails, since we're updating locally
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al actualizar la tarea"
      );
    }
  };

  // Update the status of a task
  const updateTaskStatus = async (taskId: number, status: TaskStatus) => {
    try {
      // Find the task to update
      const taskToUpdate = tasks.find((t) => t.id === taskId);
      if (!taskToUpdate) {
        throw new Error(`No se encontró la tarea con id ${taskId}`);
      }

      // Create updated task, ensuring assignedUsers is initialized
      const updatedTask = {
        ...taskToUpdate,
        status,
        assignedUsers: taskToUpdate.assignedUsers || [],
      };

      // Update in state
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );

      // Update in IndexedDB
      await localDB.updateTask(updatedTask);

      // Try to update in the API
      try {
        await taskService.updateTaskStatus(taskId, status);
      } catch (apiError) {
        console.error(
          "Error de API al actualizar el estado de la tarea:",
          apiError
        );
        // Continue silently if the API fails, since we're updating locally
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al actualizar el estado de la tarea"
      );
    }
  };

  // Delete a task
  const deleteTask = async (taskId: number) => {
    try {
      // Delete from state
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

      // Delete from IndexedDB
      await localDB.deleteTask(taskId);

      // Try to delete from the API
      try {
        await taskService.deleteTask(taskId);
      } catch (apiError) {
        console.error("Error de API al eliminar tarea:", apiError);
        // Continue silently if the API fails, since we're deleting locally
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar tarea");
    }
  };

  // Context value
  const value = {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export default TasksContext;
