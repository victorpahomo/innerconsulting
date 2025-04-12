"use client";
import { useMemo } from "react";

import { Task } from "../types";

/**
 * Hook to group tasks by status
 *
 * This hook groups tasks by their status and returns an object
 * with arrays of tasks for each status
 */
export function useTaskColumns(tasks: Task[]) {
  // Group tasks by status
  const columns = useMemo(() => {
    const pending = tasks.filter((task) => task.status === "pending");
    const inProgress = tasks.filter((task) => task.status === "in-progress");
    const completed = tasks.filter((task) => task.status === "completed");

    return {
      pending,
      inProgress,
      completed,
    };
  }, [tasks]);

  // Create a single array with all task IDs for the main sortable context
  const allTaskIds = useMemo(
    () => tasks.map((task) => task.id.toString()),
    [tasks]
  );

  return { columns, allTaskIds };
}
