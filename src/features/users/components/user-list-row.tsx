"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "../types";

interface UserListRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserListRow({ user, onEdit, onDelete }: UserListRowProps) {
  return (
    <tr>
      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
        <Avatar name={user.name} imageUrl={user.avatar} />
      </td>
      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {user.name}
      </td>
      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.email}
      </td>
      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button
          onClick={() => onEdit(user)}
          variant="outline"
          size="sm"
          className="mr-2"
        >
          Editar
        </Button>
        <Button onClick={() => onDelete(user)} variant="danger" size="sm">
          Eliminar
        </Button>
      </td>
    </tr>
  );
}
