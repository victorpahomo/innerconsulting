"use client";
import { useDeleteTask as useDeleteTaskContext } from "@/context/task-actions-context";

/**
 * Hook to access the task deletion context
 *
 * This hook simply re-exports the context to maintain
 * compatibility with existing code
 */
export function useDeleteTask() {
  return useDeleteTaskContext();
}
