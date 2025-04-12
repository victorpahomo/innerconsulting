"use client";
import { useState } from "react";

import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { useTasks } from "@/context/tasks-context";
import { Task, TaskStatus } from "../types";

/**
 * Hook to handle drag events for tasks
 *
 * This hook provides handlers for drag start, drag over, and drag end events
 * and updates the task status in real-time
 */
export function useDragHandlers(tasks: Task[]) {
  const { updateTaskStatus } = useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Get container ID for a task
  const getContainerIdByTaskId = (taskId: string) => {
    const task = tasks.find((t) => t.id.toString() === taskId);
    return task?.status || null;
  };

  // Handle drag start event
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id.toString();
    const task = tasks.find((t: Task) => t.id.toString() === taskId);

    if (task) {
      setActiveTask(task);
    }
  };

  // Handle drag over event - this is key for container transitions
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    // Return if no over element or if active element has no ID
    if (!over || !active.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // Find the containers (statuses)
    const activeContainer = getContainerIdByTaskId(activeId);

    // If hovering directly over a container instead of a task
    const isOverContainer = ["pending", "in-progress", "completed"].includes(
      overId
    );
    const overContainer = isOverContainer
      ? overId
      : getContainerIdByTaskId(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    // If we're hovering over a different container, find the task
    const task = tasks.find((t) => t.id.toString() === activeId);
    if (task) {
      // Update task status in real-time during drag
      updateTaskStatus(task.id, overContainer as TaskStatus);
    }
  };

  // Handle drag end event
  const handleDragEnd = () => {
    setActiveTask(null);
  };

  return {
    activeTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
