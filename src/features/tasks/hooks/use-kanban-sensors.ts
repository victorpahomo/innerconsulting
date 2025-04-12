"use client";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

/**
 * Hook to configure sensors for the Kanban board
 *
 * This hook sets up the sensors for the Kanban board
 * with better defaults for activation constraints
 * and improved Safari mobile support
 */
export function useKanbanSensors() {
  // Configure sensors with better defaults
  const sensors = useSensors(
    // Touch sensor for mobile devices, especially for Safari
    useSensor(TouchSensor, {
      // Increase delay for better mobile Safari support
      activationConstraint: {
        delay: 150,
        tolerance: 12,
      },
    }),
    // Pointer sensor as fallback for desktop
    useSensor(PointerSensor, {
      // Improved activationConstraint for better compatibility
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return sensors;
}
