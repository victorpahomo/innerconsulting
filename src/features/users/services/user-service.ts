import { User } from "../types";

const API_URL = "http://localhost:3001";

export const userService = {
  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  },

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user with id ${id}`);
    }
    return response.json();
  },

  async createUser(userData: Omit<User, "id">): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json();
  },

  async updateUser(user: User): Promise<User> {
    const response = await fetch(`${API_URL}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user with id ${user.id}`);
    }

    return response.json();
  },

  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user with id ${id}`);
    }
  },
};
