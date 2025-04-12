import { useCallback } from "react";

import { useSearch } from "@/hooks/use-search";
import { Task } from "../types";

/**
 * Hook to search for tasks
 *
 * This hook provides a search function for tasks
 * and a search term state with filtering
 */
export function useTaskSearch(tasks: Task[]) {
  // Search function for tasks
  const searchTaskPredicate = useCallback((task: Task, searchTerm: string) => {
    return (
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    );
  }, []);

  // Use the reusable search hook
  const {
    searchTerm,
    setSearchTerm,
    filteredItems: filteredTasks,
  } = useSearch<Task>(tasks, searchTaskPredicate);

  return {
    searchTerm,
    setSearchTerm,
    filteredTasks,
  };
}
