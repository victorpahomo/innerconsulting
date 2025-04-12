"use client";
import { TaskButton } from "@/components/ui/task-button";
import { useTaskForm } from "../hooks/use-task-form";
import { useUsers } from "@/context/users-context";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { User } from "@/features/users/types";
import { TaskStatus } from "../types";
import {
  Form,
  FormField,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormActions,
  FormMultiSelect,
} from "@/components/ui/form";

// Main component that contains both the button and the modal
export function TaskForm() {
  const { users } = useUsers();
  const { formState, handlers } = useTaskForm();
  const {
    title,
    description,
    assignedUsers,
    status,
    isModalOpen,
    isSubmitting,
  } = formState;
  const {
    setTitle,
    setDescription,
    setAssignedUsers,
    setStatus,
    createTask,
    closeModal,
    openModal,
  } = handlers;

  // List of status options for the select
  const statusOptions = [
    { value: "pending", label: "Pendiente" },
    { value: "in-progress", label: "En progreso" },
    { value: "completed", label: "Completada" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask();
  };

  return (
    <>
      <TaskButton onClick={openModal} className="w-full sm:w-auto" />

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Nueva Tarea">
        <Form onSubmit={handleSubmit} variant="modal">
          <FormField>
            <FormLabel htmlFor="title">Título</FormLabel>
            <FormInput
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="description">Descripción</FormLabel>
            <FormTextarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="users">Asignar a</FormLabel>
            <FormMultiSelect<User>
              id="users"
              value={assignedUsers}
              onChange={setAssignedUsers}
              options={users}
              getOptionLabel={(user) => user.name}
              getOptionValue={(user) => user.id.toString()}
              placeholder="Seleccionar usuarios..."
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="status">Estado</FormLabel>
            <FormSelect
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormSelect>
          </FormField>

          <FormActions>
            <Button
              type="button"
              variant="secondary"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </FormActions>
        </Form>
      </Modal>
    </>
  );
}
