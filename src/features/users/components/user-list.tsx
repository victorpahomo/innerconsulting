"use client";
import { useState } from "react";

import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { UserListEmptyMessage } from "./user-list-empty-message";
import { useDeleteUser } from "../hooks/use-delete-user";
import { useUserList } from "../hooks/use-user-list";
import { UserListHeader } from "./user-list-header";
import { useUsers } from "@/context/users-context";
import { UserListTable } from "./user-list-table";
import { UserForm } from "./user-form";
import { User } from "../types";

export function UserList() {
  const { loading } = useUsers();
  const {
    users,
    isFormOpen,
    editingUser,
    searchTerm,
    setSearchTerm,
    handlers,
  } = useUserList();
  const { handleOpenForm, handleCloseForm } = handlers;

  // States for the delete confirmation modal
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Use the user deletion use case
  const { executeDeleteUser } = useDeleteUser();

  // Open the delete confirmation modal
  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Close the delete confirmation modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Handle the delete confirmation
  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);

    // Use the use case with callbacks
    await executeDeleteUser(userToDelete.id, {
      onSuccess: () => {
        closeDeleteModal();
      },
      onError: (error) => {
        console.error("Error al eliminar el usuario:", error);
      },
      onFinally: () => {
        setIsDeleting(false);
      },
    });
  };

  // If loading, show a loading spinner
  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
          <p className="text-gray-500">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* Search Input and Add User Button */}
      <UserListHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddUser={() => handleOpenForm()}
      />

      {/* User Form */}
      <UserForm
        user={editingUser}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
      />

      {/* Delete confirmation modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Eliminar usuario"
        message={
          userToDelete
            ? `¿Estás seguro de que deseas eliminar a "${userToDelete.name}"? Esta acción no se puede deshacer.`
            : ""
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmVariant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={closeDeleteModal}
        isLoading={isDeleting}
      />

      {/* Show message if no search results */}
      {users.length === 0 && searchTerm && (
        <UserListEmptyMessage message="No se encontraron usuarios con ese criterio de búsqueda" />
      )}

      {/* Users Table */}
      <UserListTable
        users={users}
        searchTerm={searchTerm}
        onEditUser={handleOpenForm}
        onDeleteUser={openDeleteModal}
      />
    </div>
  );
}
