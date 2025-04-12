"use client";
import { UserListCard } from "./user-list-card";
import { UserListRow } from "./user-list-row";
import { User } from "../types";

interface UserListTableProps {
  users: User[];
  searchTerm: string;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

export function UserListTable({
  users,
  searchTerm,
  onEditUser,
  onDeleteUser,
}: UserListTableProps) {
  const hasUsers = users.length > 0;
  const showEmptyMessage = !hasUsers && !searchTerm;

  return (
    <>
      {/* Mobile and tablets: Card list */}
      <div className="md:hidden space-y-3">
        {hasUsers
          ? users.map((user) => (
              <UserListCard
                key={user.id}
                user={user}
                onEdit={onEditUser}
                onDelete={onDeleteUser}
              />
            ))
          : showEmptyMessage && (
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                No hay usuarios registrados
              </div>
            )}
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avatar
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <UserListRow
                key={user.id}
                user={user}
                onEdit={onEditUser}
                onDelete={onDeleteUser}
              />
            ))}
            {showEmptyMessage && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 md:px-6 py-4 text-center text-sm text-gray-500"
                >
                  No hay usuarios registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
