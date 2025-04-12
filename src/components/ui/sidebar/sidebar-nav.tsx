"use client";
import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/utils/constants";
import { TasksIcon, UsersIcon, DocsIcon, AuthorIcon } from "@/assets/icons";
import SidebarItem from "./sidebar-item";

interface SidebarNavProps {
  onItemClick?: () => void;
}

// Component to render the correct icon based on the route
const getNavIcon = (path: string, isActive: boolean): ReactNode => {
  const activeColor = "#ed7d3a";
  const inactiveColor = "#6B7280";
  const color = isActive ? activeColor : inactiveColor;

  switch (path) {
    case ROUTES.HOME.path:
      return <TasksIcon color={color} />;
    case ROUTES.USERS.path:
      return <UsersIcon color={color} />;
    case ROUTES.DOCUMENTATION.path:
      return <DocsIcon color={color} />;
    case ROUTES.AUTHOR.path:
      return <AuthorIcon color={color} />;
    default:
      return <TasksIcon color={color} />;
  }
};

const SidebarNav: FC<SidebarNavProps> = ({ onItemClick }) => {
  const pathname = usePathname();

  const menuItems = Object.values(ROUTES).map((route) => ({
    name: route.title,
    href: route.path,
    isActive: pathname === route.path,
  }));

  return (
    <nav className="flex-1">
      <ul className="space-y-3">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.name}
            name={item.name}
            href={item.href}
            isActive={item.isActive}
            icon={getNavIcon(item.href, item.isActive)}
            onClick={onItemClick}
          />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
