"use client";
import { SearchInput } from "@/components/ui/search-input";
import { UserButton } from "@/components/ui/user-button";

interface UserListHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddUser: () => void;
}

export function UserListHeader({
  searchTerm,
  onSearchChange,
  onAddUser,
}: UserListHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
      <div className="w-full md:max-w-md order-2 md:order-1">
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Buscar por nombre o email..."
        />
      </div>
      <div className="order-1 md:order-2 mb-2 md:mb-0">
        <UserButton onClick={onAddUser} />
      </div>
    </div>
  );
}
