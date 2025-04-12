"use client";
import { DoneIcon, InProgressIcon, PendingIcon } from "@/assets/icons";
import { useDroppable } from "@dnd-kit/core";
import { Task, TaskStatus } from "../types";
import { TaskCard } from "./task-card";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

export function TaskColumn({ title, status, tasks }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <PendingIcon />;
      case "in-progress":
        return <InProgressIcon />;
      case "completed":
        return <DoneIcon />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col h-full w-full min-w-[280px] border border-gray-200 rounded-lg shadow-sm select-none
                 ${
                   isOver
                     ? "bg-flush-orange-50/50 ring-2 ring-indigo-300"
                     : "bg-background-100"
                 }`}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <h2 className="text-xl font-medium text-gray-600/80">{title}</h2>
        </div>
        <span className="bg-gray-200 border border-gray-200 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div ref={setNodeRef} className="flex-1 min-h-[200px] px-4 pt-1">
        <div className="flex flex-col gap-3">
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="text-center py-8 text-gray-400">No hay tareas</div>
          )}
        </div>
      </div>
    </div>
  );
}
