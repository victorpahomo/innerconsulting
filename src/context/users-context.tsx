"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { userService } from "@/features/users/services/user-service";
import * as localDB from "@/features/storage/indexed-DB";
import { User } from "@/features/users/types";

// Define the type of the users context
interface UsersContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (user: Omit<User, "id">) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
  getUser: (userId: number) => User | undefined;
}

// Create the context with a default value
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Hook to use the users context
export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers debe usarse dentro de un UsersProvider");
  }
  return context;
};

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        // Try to get from IndexedDB first
        const localUsers = await localDB.getAllUsers();

        if (localUsers.length > 0) {
          setUsers(localUsers);
        }

        // Then try to get from the API
        try {
          const apiUsers = await userService.getAllUsers();
          setUsers(apiUsers);

          // Store in IndexedDB
          await localDB.storeUsers(apiUsers);
        } catch (apiError) {
          console.error("Error de API, usando datos en caché:", apiError);
          // If the API fails but we have local data, continue silently
          if (localUsers.length === 0) {
            throw apiError; // Rethrow if we don't have local data
          }
        }

        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ocurrió un error desconocido"
        );
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Add a new user
  const addUser = async (userData: Omit<User, "id">) => {
    try {
      // Try to add to the API first
      let newUser: User;
      try {
        newUser = await userService.createUser(userData);
      } catch (apiError) {
        // If the API fails, create a local user with a temporary ID
        console.error("Error de API al crear usuario:", apiError);
        newUser = {
          ...userData,
          id: Date.now(), // Use timestamp as a temporary ID
        };
      }

      // Update state
      setUsers((prevUsers) => [...prevUsers, newUser]);

      // Store in IndexedDB
      await localDB.storeUsers([...users, newUser]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al añadir usuario");
    }
  };

  // Update a user
  const updateUser = async (updatedUser: User) => {
    try {
      // Update in state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );

      // Update in IndexedDB
      await localDB.storeUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );

      // Try to update in the API
      try {
        await userService.updateUser(updatedUser);
      } catch (apiError) {
        console.error("Error de API al actualizar usuario:", apiError);
        // Continue silently if the API fails, since we're updating locally
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al actualizar usuario"
      );
    }
  };

  // Delete a user
  const deleteUser = async (userId: number) => {
    try {
      // Delete from state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      // Delete from IndexedDB
      await localDB.storeUsers(users.filter((user) => user.id !== userId));

      // Try to delete from the API
      try {
        await userService.deleteUser(userId);
      } catch (apiError) {
        console.error("Error de API al eliminar usuario:", apiError);
        // Continue silently if the API fails, since we're deleting locally
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al eliminar usuario"
      );
    }
  };

  // Get a user by ID
  const getUser = (userId: number) => {
    return users.find((user) => user.id === userId);
  };

  // Context value
  const value = {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    getUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export default UsersContext;
