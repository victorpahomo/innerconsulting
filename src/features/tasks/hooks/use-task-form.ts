"use client";
import { useState } from "react";

import { useTasks } from "@/context/tasks-context";
import { useToast } from "@/context/toast-context";
import { User } from "@/features/users/types";
import { TaskStatus } from "../types";

/**
 * Custom hook to handle the state and logic of the task form
 *
 * This hook manages the state of the task form and provides
 * handlers for opening and closing the modal, resetting the form,
 * and creating a new task
 */
export function useTaskForm() {
  const { addTask } = useTasks();
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedUsers, setAssignedUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset the form to initial values
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAssignedUsers([]);
    setStatus("pending");
  };

  // Create a new task
  const createTask = async () => {
    if (!title.trim() || !description.trim()) return false;

    try {
      setIsSubmitting(true);
      await addTask({ title, description, status, assignedUsers });
      resetForm();
      setIsModalOpen(false);
      showToast("Tarea creada con éxito", "success");
      return true;
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      showToast("Error al crear la tarea", "error");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState: {
      title,
      description,
      assignedUsers,
      status,
      isModalOpen,
      isSubmitting,
    },
    handlers: {
      setTitle,
      setDescription,
      setAssignedUsers,
      setStatus,
      createTask,
      resetForm,
      openModal: () => {
        resetForm();
        setIsModalOpen(true);
      },
      closeModal: () => {
        resetForm();
        setIsModalOpen(false);
      },
    },
  };
}
