import React from "react";
import { User } from "@/features/users/types";

export const UserListTable = jest.fn(({ users, onDeleteUser }) => (
  <div data-testid="user-list-table">
    {users.map((user: User) => (
      <div key={user.id} data-testid={`user-${user.id}`}>
        {user.name}
        <button
          data-testid={`delete-user-${user.id}`}
          onClick={() => onDeleteUser(user)}
        >
          Eliminar
        </button>
      </div>
    ))}
  </div>
));
