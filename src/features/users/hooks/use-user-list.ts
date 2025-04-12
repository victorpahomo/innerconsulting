"use client";
import { useState, useCallback } from "react";

import { useUsers } from "@/context/users-context";
import { useSearch } from "@/hooks/use-search";
import { User } from "../types";

/**
 * Hook for the user list
 *
 * Provides a state and handlers for the user list
 * with error handling and reset
 */
export function useUserList() {
  const { users } = useUsers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Search function for users
  const searchUserPredicate = useCallback((user: User, searchTerm: string) => {
    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  }, []);

  // Use the reusable search hook
  const {
    searchTerm,
    setSearchTerm,
    filteredItems: filteredUsers,
  } = useSearch<User>(users, searchUserPredicate);

  const handleOpenForm = (user: User | null = null) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  return {
    users: filteredUsers,
    isFormOpen,
    editingUser,
    searchTerm,
    setSearchTerm,
    handlers: {
      handleOpenForm,
      handleCloseForm,
    },
  };
}
