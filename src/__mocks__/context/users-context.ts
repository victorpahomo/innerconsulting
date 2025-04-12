import { User } from "@/features/users/types";

export const mockUsers: User[] = [
  { id: 1, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 2, name: "Usuario 2", email: "usuario2@example.com" },
];

export const useUsers = jest.fn(() => ({
  loading: false,
  users: [],
  addUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));
