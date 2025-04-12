"use client";
import { useTaskActions } from "@/context/task-actions-context";
import { TaskOptionsMenu } from "./task-options-menu";
import { TaskDetailModal } from "./task-detail-modal";
import { useTaskCard } from "../hooks/use-task-card";
import { Avatar } from "@/components/ui/avatar";
import { Task } from "../types";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task: initialTask }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    task,
    assignedUsers,
    statusBadgeColor,
    statusText,
    isDetailModalOpen,
    openDetailModal,
    closeDetailModal,
  } = useTaskCard(initialTask);

  const { openEditModal } = useTaskActions();

  // Function to handle the click on the card
  const handleCardClick = (e: React.MouseEvent) => {
    // Do not open the modal if we are dragging or if a button was clicked
    if (isDragging || (e.target as HTMLElement).closest("button")) {
      return;
    }
    openDetailModal();
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onClick={handleCardClick}
        className={`bg-white p-3 rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-200 flex flex-col select-none
                 ${
                   isDragging
                     ? "z-50 shadow-xl cursor-grabbing"
                     : "cursor-pointer"
                 }`}
      >
        <div className="flex flex-col gap-2 justify-between items-start mb-2">
          <div className="flex items-center justify-between w-full">
            <span
              className={`text-xs px-2 py-1 rounded-full ${statusBadgeColor}`}
            >
              {statusText}
            </span>
            <TaskOptionsMenu
              task={task}
              onViewDetails={openDetailModal}
              onEdit={() => openEditModal(task)}
            />
          </div>
          <h3 className="font-semibold text-lg text-gray-900 truncate w-full">
            {task.title}
          </h3>
        </div>

        <p className="text-sm text-gray-600 mb-3 flex-grow">
          {task.description}
        </p>

        <hr className="w-full border-gray-200" />

        <div className="flex justify-between items-center mt-2">
          {assignedUsers.length > 0 ? (
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {assignedUsers.slice(0, 3).map((user, index) => (
                  <Avatar
                    key={user.id}
                    name={user.name}
                    imageUrl={user.avatar}
                    size="sm"
                    className={`border-2 border-white ${
                      index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                    }`}
                  />
                ))}
                {assignedUsers.length > 3 && (
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 text-xs font-medium rounded-full border-2 border-white z-0">
                    +{assignedUsers.length - 3}
                  </div>
                )}
              </div>
              <span className="ml-2 text-xs text-gray-600">
                {assignedUsers.length === 1
                  ? assignedUsers[0].name
                  : `${assignedUsers.length} asignados`}
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-xs text-gray-500">Sin asignar</span>
            </div>
          )}
        </div>
      </div>

      {/* Details modal */}
      <TaskDetailModal
        task={task}
        assignedUsers={assignedUsers}
        statusBadgeColor={statusBadgeColor}
        statusText={statusText}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
      />
    </>
  );
}
