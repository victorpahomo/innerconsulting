import { User } from "@/features/users/types";

export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedUsers: User[]; // Única fuente de usuarios asignados
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}
