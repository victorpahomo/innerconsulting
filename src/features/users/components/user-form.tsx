"use client";
import { useUserForm } from "../hooks/use-user-form";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { User } from "../types";
import Image from "next/image";
import {
  Form,
  FormField,
  FormLabel,
  FormInput,
  FormActions,
} from "@/components/ui/form";

interface UserFormProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserForm({ user, isOpen, onClose }: UserFormProps) {
  const { formState, handlers } = useUserForm({
    initialUser: user,
    onClose,
  });

  const { name, email, avatar, isSubmitting } = formState;
  const { setName, setEmail, setAvatar, handleSubmit } = handlers;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? "Editar Usuario" : "Añadir Usuario"}
    >
      <Form onSubmit={handleSubmit} variant="modal">
        <FormField>
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <FormInput
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <FormLabel htmlFor="avatar">URL de Avatar (opcional)</FormLabel>
          <FormInput
            id="avatar"
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {avatar && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Vista previa:</p>
              <Image
                src={avatar}
                alt="Vista previa"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
                onError={(e) => {
                  (
                    e.target as HTMLImageElement
                  ).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    name
                  )}&background=random`;
                }}
                unoptimized
              />
            </div>
          )}
        </FormField>

        <FormActions>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? user
                ? "Actualizando..."
                : "Guardando..."
              : user
              ? "Actualizar"
              : "Guardar"}
          </Button>
        </FormActions>
      </Form>
    </Modal>
  );
}
