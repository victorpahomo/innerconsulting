"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "../types";

interface UserListCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserListCard({ user, onEdit, onDelete }: UserListCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3">
      <div className="flex items-center mb-3">
        <div className="mr-3">
          <Avatar name={user.name} imageUrl={user.avatar} />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button onClick={() => onEdit(user)} variant="outline" size="sm">
          Editar
        </Button>
        <Button onClick={() => onDelete(user)} variant="danger" size="sm">
          Eliminar
        </Button>
      </div>
    </div>
  );
}
