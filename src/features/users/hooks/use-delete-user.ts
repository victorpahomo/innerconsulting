"use client";
import { useUsers } from "@/context/users-context";
import { useToast } from "@/context/toast-context";

/**
 * Custom hook for deleting a user
 *
 * Provides a clean interface for the delete operation
 * with callback handling for success, error, and completion
 */
export function useDeleteUser() {
  const { deleteUser } = useUsers();
  const { showToast } = useToast();

  /**
   * Executes the deletion of a user with callback handling
   */
  const executeDeleteUser = async (
    userId: number,
    {
      onSuccess,
      onError,
      onFinally,
    }: {
      onSuccess?: () => void;
      onError?: (error: Error) => void;
      onFinally?: () => void;
    } = {}
  ) => {
    try {
      await deleteUser(userId);
      showToast("Usuario eliminado con éxito", "success");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      showToast("Error al eliminar el usuario", "error");

      if (onError) {
        onError(
          error instanceof Error
            ? error
            : new Error("Error desconocido al eliminar el usuario")
        );
      }
    } finally {
      if (onFinally) {
        onFinally();
      }
    }
  };

  return { executeDeleteUser };
}
