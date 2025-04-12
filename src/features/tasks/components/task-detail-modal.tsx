"use client";
import { useDeleteTask, useTaskActions } from "@/context/task-actions-context";
import { DeleteIcon, EditIcon } from "@/assets/icons";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { User } from "@/features/users/types";
import { Task } from "../types";

interface TaskDetailModalProps {
  task: Task;
  assignedUsers: User[];
  statusBadgeColor: string;
  statusText: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDetailModal(props: TaskDetailModalProps) {
  const { task, assignedUsers, statusBadgeColor, statusText, isOpen, onClose } =
    props;

  const { openDeleteModal } = useDeleteTask();
  const { openEditModal } = useTaskActions();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task.title}>
      <div className="space-y-4">
        {/* Status badge */}
        <div className="mb-4">
          <span
            className={`text-xs px-2 py-1 rounded-full ${statusBadgeColor}`}
          >
            {statusText}
          </span>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Descripción
          </h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>

        {/* Assigned users */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Asignado a</h3>
          <div className="space-y-2">
            {assignedUsers.length > 0 ? (
              assignedUsers.map((user) => (
                <div key={user.id} className="flex items-center">
                  <Avatar
                    name={user.name}
                    imageUrl={user.avatar}
                    size="sm"
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">{user.name}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Sin asignar</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-4 border-t border-gray-100 mt-4 space-x-2">
          <Button
            onClick={() => {
              openDeleteModal(task.id);
              onClose();
            }}
            variant="danger"
            className="flex items-center"
          >
            <DeleteIcon />
            Eliminar
          </Button>
          <Button
            onClick={() => {
              openEditModal(task);
              onClose();
            }}
            variant="primary"
            className="flex items-center"
          >
            <EditIcon />
            Editar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
