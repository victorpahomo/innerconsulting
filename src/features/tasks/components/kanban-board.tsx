"use client";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { useKanbanSensors } from "../hooks/use-kanban-sensors";
import { useDragHandlers } from "../hooks/use-drag-handlers";
import { SearchInput } from "@/components/ui/search-input";
import { useTaskColumns } from "../hooks/use-task-columns";
import { useTaskSearch } from "../hooks/use-task-search";
import { useTasks } from "@/context/tasks-context";
import { TaskColumn } from "./task-column";
import { TaskCard } from "./task-card";
import { TaskForm } from "./task-form";

export function KanbanBoard() {
  const { tasks, loading } = useTasks();

  // Search hook
  const { searchTerm, setSearchTerm, filteredTasks } = useTaskSearch(tasks);

  // Use the custom hooks with the filtered tasks
  const sensors = useKanbanSensors();
  const { columns, allTaskIds } = useTaskColumns(filteredTasks);
  const { activeTask, handleDragStart, handleDragOver, handleDragEnd } =
    useDragHandlers(filteredTasks);

  // If loading, show a loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <p className="text-gray-500">Cargando tareas...</p>
      </div>
    );
  }

  // If there are no tasks, show the empty state
  if (!tasks.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500 mb-4">No hay tareas disponibles</p>
        <TaskForm />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full select-none">
      {/* Search Input and Add Task Button - Responsive Layout */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-6">
        <div className="w-full sm:max-w-md order-2 sm:order-1">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar tareas..."
          />
        </div>
        <div className="order-1 sm:order-2 mb-2 sm:mb-0">
          <TaskForm />
        </div>
      </div>

      {filteredTasks.length === 0 && searchTerm && (
        <div className="flex justify-center items-center h-32 bg-gray-50 rounded-lg mb-6">
          <p className="text-gray-500 text-center px-4">
            No se encontraron tareas con ese criterio de búsqueda
          </p>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={allTaskIds} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 flex-1 overflow-auto">
            <TaskColumn
              title="Pendientes"
              status="pending"
              tasks={columns.pending}
            />
            <TaskColumn
              title="En progreso"
              status="in-progress"
              tasks={columns.inProgress}
            />
            <TaskColumn
              title="Completadas"
              status="completed"
              tasks={columns.completed}
            />
          </div>
        </SortableContext>

        {/* Drag overlay for better visual feedback */}
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
