"use client";
import { useState, useEffect } from "react";

import { useUsers } from "@/context/users-context";
import { useToast } from "@/context/toast-context";
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
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    try {
      setIsSubmitting(true);
      if (initialUser) {
        await updateUser({
          ...initialUser,
          name,
          email,
          avatar: avatar.trim() || undefined,
        });
        showToast("Usuario actualizado con éxito", "success");
      } else {
        await addUser({
          name,
          email,
          avatar: avatar.trim() || undefined,
        });
        showToast("Usuario añadido con éxito", "success");
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      showToast("Error al guardar el usuario", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState: {
      name,
      email,
      avatar,
      isSubmitting,
    },
    handlers: {
      setName,
      setEmail,
      setAvatar,
      handleSubmit,
    },
  };
}
