"use client";
import { FC, ReactNode } from "react";
import Link from "next/link";

interface SidebarItemProps {
  name: string;
  href: string;
  isActive: boolean;
  icon: ReactNode;
  onClick?: () => void;
}

const SidebarItem: FC<SidebarItemProps> = ({
  name,
  href,
  isActive,
  icon,
  onClick,
}) => {
  return (
    <li>
      <Link
        href={href}
        className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          isActive
            ? "bg-flush-orange-50 text-flush-orange-600"
            : "text-gray-600 hover:bg-gray-200/50 "
        }`}
        onClick={onClick}
      >
        {icon}
        <span className="text-sm font-medium">{name}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
