// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Enable automatic mocks
jest.mock(
  "@/context/users-context",
  () => ({
    useUsers: jest.fn(),
  }),
  { virtual: true }
);

jest.mock(
  "@/features/users/hooks/use-user-list",
  () => ({
    useUserList: jest.fn(),
  }),
  { virtual: true }
);

jest.mock(
  "@/features/users/hooks/use-delete-user",
  () => ({
    useDeleteUser: jest.fn(),
  }),
  { virtual: true }
);
