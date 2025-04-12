"use client";
import { useState, useEffect } from "react";

import { useTasks } from "@/context/tasks-context";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../types";

/**
 * Hook to handle the task card
 *
 * This hook provides the necessary state and handlers for the task card
 * including DnD configuration, status colors, and modal state
 */
export function useTaskCard(task: Task) {
  const { tasks } = useTasks();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);

  // Update currentTask when task changes or when tasks array is updated
  useEffect(() => {
    // Find the latest version of this task in the tasks array
    const updatedTask = tasks.find((t) => t.id === task.id);
    if (updatedTask) {
      setCurrentTask(updatedTask);
    } else {
      setCurrentTask(task);
    }
  }, [task, tasks]);

  // DndKit configuration for dragging and dropping
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: currentTask.id.toString(),
    data: currentTask,
  });

  // Style based on the component state
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
    position: isDragging ? ("relative" as const) : undefined,
  };

  // Status colors for the badge
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const statusBadgeColor =
    statusColors[currentTask.status as keyof typeof statusColors];

  // Status text in Spanish
  const statusText =
    currentTask.status === "pending"
      ? "Pendiente"
      : currentTask.status === "in-progress"
      ? "En progreso"
      : "Completada";

  // Handlers for the details modal
  const openDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  return {
    // DnD props
    attributes,
    listeners,
    setNodeRef,
    style,
    isDragging,

    // Task data
    task: currentTask,
    assignedUsers: currentTask.assignedUsers,
    statusBadgeColor,
    statusText,

    // Modal state
    isDetailModalOpen,
    openDetailModal,
    closeDetailModal,
  };
}
