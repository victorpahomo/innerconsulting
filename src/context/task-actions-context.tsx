"use client";
import { createContext, useContext, useState, ReactNode } from "react";

import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useTasks } from "./tasks-context";
import { useToast } from "./toast-context";
import { Task } from "@/features/tasks/types";
import { Modal } from "@/components/ui/modal";
import { TaskFormEdit } from "@/features/tasks/components/task-form-edit";

interface TaskActionsContextType {
  openDeleteModal: (taskId: number) => void;
  openEditModal: (task: Task) => void;
  isEditModalOpen: boolean;
  taskToEdit: Task | null;
  closeEditModal: () => void;
}

const TaskActionsContext = createContext<TaskActionsContextType | undefined>(
  undefined
);

export const useTaskActions = () => {
  const context = useContext(TaskActionsContext);
  if (context === undefined) {
    throw new Error(
      "useTaskActions debe usarse dentro de un TaskActionsProvider"
    );
  }
  return context;
};

// Rename this function to maintain compatibility with existing code
export function useDeleteTask() {
  const context = useContext(TaskActionsContext);
  if (!context)
    throw new Error(
      "useDeleteTask debe usarse dentro de un TaskActionsProvider"
    );
  return {
    openDeleteModal: context.openDeleteModal,
  };
}

export function TaskActionsProvider({ children }: { children: ReactNode }) {
  const { deleteTask, tasks } = useTasks();
  const { showToast } = useToast();

  // State for the delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // State for the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const openDeleteModal = (taskId: number) => {
    setTaskToDelete(taskId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    setIsDeleting(true);
    try {
      await deleteTask(taskToDelete);
      showToast("Tarea eliminada con éxito", "success");
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      showToast("Error al eliminar la tarea", "error");
    } finally {
      setIsDeleting(false);
      closeDeleteModal();
    }
  };

  // Find the title of the task for the message
  const task = tasks.find((t) => t.id === taskToDelete);
  const taskTitle = task?.title || "esta tarea";

  return (
    <TaskActionsContext.Provider
      value={{
        openDeleteModal,
        openEditModal,
        isEditModalOpen,
        taskToEdit,
        closeEditModal,
      }}
    >
      {children}

      {/* Delete confirmation modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Eliminar tarea"
        message={`¿Estás seguro de que deseas eliminar la tarea "${taskTitle}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={closeDeleteModal}
        isLoading={isDeleting}
      />

      {/* Edit modal */}
      {taskToEdit && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          title="Editar Tarea"
        >
          <TaskFormEdit
            task={taskToEdit}
            onComplete={closeEditModal}
            onCancel={closeEditModal}
          />
        </Modal>
      )}
    </TaskActionsContext.Provider>
  );
}
