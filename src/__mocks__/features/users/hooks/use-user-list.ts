import { User } from "@/features/users/types";

const mockUsers: User[] = [
  {
    id: 1,
    name: "Usuario 1",
    email: "usuario1@example.com",
    avatar: "https://example.com/avatar1.jpg",
  },
  {
    id: 2,
    name: "Usuario 2",
    email: "usuario2@example.com",
    avatar: "https://example.com/avatar2.jpg",
  },
];

export const useUserList = jest.fn(() => ({
  users: mockUsers,
  isFormOpen: false,
  editingUser: null,
  searchTerm: "",
  setSearchTerm: jest.fn(),
  handlers: {
    handleOpenForm: jest.fn(),
    handleCloseForm: jest.fn(),
  },
}));
