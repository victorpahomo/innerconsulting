"use client";
import { useState, useEffect } from "react";

import { useUsers } from "@/context/users-context";
import { User } from "../types";

interface UseUserFormProps {
  initialUser: User | null;
  onClose: () => void;
}

/**
 * Hook for the user form
 *
 * Provides a state and handlers for the user form
 * with error handling and reset
 */
export function useUserForm({ initialUser, onClose }: UseUserFormProps) {
  const { addUser, updateUser } = useUsers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (initialUser) {
      setName(initialUser.name);
      setEmail(initialUser.email);
      setAvatar(initialUser.avatar || "");
    } else {
      resetForm();
    }
  }, [initialUser]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setAvatar("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      return;
    }

    if (initialUser) {
      await updateUser({
        ...initialUser,
        name,
        email,
        avatar: avatar.trim() || undefined,
      });
    } else {
      await addUser({
        name,
        email,
        avatar: avatar.trim() || undefined,
      });
    }

    resetForm();
    onClose();
  };

  return {
    formState: {
      name,
      email,
      avatar,
    },
    handlers: {
      setName,
      setEmail,
      setAvatar,
      handleSubmit,
    },
  };
}
