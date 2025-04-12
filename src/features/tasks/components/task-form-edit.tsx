"use client";
import { useEffect } from "react";

import { useTaskForm } from "../hooks/use-task-form";
import { useUsers } from "@/context/users-context";
import { useTasks } from "@/context/tasks-context";
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
      await updateTask({
        ...task,
        title,
        description,
        status: status as TaskStatus,
        assignedUsers,
      });

      if (onComplete) onComplete();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // List of status options for the select
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In progress" },
    { value: "completed", label: "Completed" },
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
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar cambios</Button>
      </FormActions>
    </Form>
  );
}
