"use client";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/assets/icons";

interface TaskButtonProps {
  onClick: () => void;
  className?: string;
}

export function TaskButton({ onClick, className = "" }: TaskButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center justify-center w-full sm:w-auto ${className}`}
    >
      <AddIcon />
      Nueva Tarea
    </Button>
  );
}
