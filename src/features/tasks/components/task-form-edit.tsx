"use client";
import { useEffect, useState } from "react";

import { useTaskForm } from "../hooks/use-task-form";
import { useUsers } from "@/context/users-context";
import { useTasks } from "@/context/tasks-context";
import { useToast } from "@/context/toast-context";
import { Button } from "@/components/ui/button";
import { User } from "@/features/users/types";
import { Task, TaskStatus } from "../types";
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

interface TaskFormEditProps {
  task: Task;
  onComplete?: () => void;
  onCancel?: () => void;
}

export function TaskFormEdit({
  task,
  onComplete,
  onCancel,
}: TaskFormEditProps) {
  const { users } = useUsers();
  const { updateTask } = useTasks();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formState, handlers } = useTaskForm();
  const { title, description, assignedUsers, status } = formState;
  const { setTitle, setDescription, setAssignedUsers, setStatus } = handlers;

  // Load the initial task data
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setAssignedUsers(task.assignedUsers);
  }, [task, setTitle, setDescription, setStatus, setAssignedUsers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      setIsSubmitting(true);
      await updateTask({
        ...task,
        title,
        description,
        status: status as TaskStatus,
        assignedUsers,
      });

      showToast("Tarea actualizada con éxito", "success");
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Error updating task:", error);
      showToast("Error al actualizar la tarea", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // List of status options for the select
  const statusOptions = [
    { value: "pending", label: "Pendiente" },
    { value: "in-progress", label: "En progreso" },
    { value: "completed", label: "Completada" },
  ];

  return (
    <Form onSubmit={handleSubmit} variant="modal">
      <FormField>
        <FormLabel htmlFor="title">Título</FormLabel>
        <FormInput
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
        />
      </FormField>

      <FormField>
        <FormLabel htmlFor="status">Estado</FormLabel>
        <FormSelect
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          disabled={isSubmitting}
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
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </Button>
      </FormActions>
    </Form>
  );
}
