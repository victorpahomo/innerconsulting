"use client";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

/**
 * Hook to configure sensors for the Kanban board
 *
 * This hook sets up the sensors for the Kanban board
 * with better defaults for activation constraints
 */
export function useKanbanSensors() {
  // Configure sensors with better defaults
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Default activationConstraint
      activationConstraint: {
        delay: 80,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return sensors;
}
