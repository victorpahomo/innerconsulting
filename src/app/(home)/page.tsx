import { Metadata } from "next";
import { KanbanBoard } from "@/features/tasks/components/kanban-board";

export const metadata: Metadata = {
  title: "Tablero de Tareas | InnerKanban",
  description: "Administra tus tareas con InnerKanban",
  keywords: "tareas, gestión, administración, innerkanban",
};

export default function HomePage() {
  return <KanbanBoard />;
}
