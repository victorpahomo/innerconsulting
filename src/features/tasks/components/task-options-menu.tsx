"use client";
import { useState, useRef } from "react";

import { DeleteIcon, DetailIcon, EditIcon, OptionsIcon } from "@/assets/icons";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useDeleteTask } from "../hooks/use-delete-task";
import { Task } from "../types";

interface TaskOptionsMenuProps {
  task: Task;
  onViewDetails: () => void;
  onEdit: () => void;
}

export function TaskOptionsMenu({
  task,
  onViewDetails,
  onEdit,
}: TaskOptionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openDeleteModal } = useDeleteTask();

  // Close menu when clicking outside
  useOnClickOutside(menuRef as React.RefObject<HTMLElement>, () =>
    setIsOpen(false)
  );

  // Structure of options to simplify rendering
  const options = [
    { label: "Ver detalles", icon: "eye", onClick: onViewDetails },
    { label: "Editar", icon: "edit", onClick: onEdit },
    {
      label: "Eliminar",
      icon: "trash",
      onClick: () => openDeleteModal(task.id),
      danger: true,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Opciones de tarea"
      >
        <OptionsIcon />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg bg-white border border-gray-200 z-[100]">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option) => (
              <button
                key={option.label}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  option.onClick();
                }}
                className={`flex items-center w-full px-4 py-2 text-sm 
                  ${
                    option.danger
                      ? "text-red-600 hover:bg-gray-100 hover:text-red-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                role="menuitem"
              >
                {option.icon === "eye" && <DetailIcon />}
                {option.icon === "edit" && <EditIcon />}
                {option.icon === "trash" && <DeleteIcon />}

                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
