"use client";
import { FC } from "react";

interface SidebarFooterProps {
  onClick?: () => void;
  className?: string;
}

const SidebarFooter: FC<SidebarFooterProps> = ({ onClick, className = "" }) => {
  return (
    <div
      className={`mt-auto pt-4 border-t cursor-pointer ${className}`}
      onClick={onClick}
    >
      <p className="text-sm text-gray-400 hover:text-flush-orange-600 transition-colors">
        @victorpahomo
      </p>
    </div>
  );
};

export default SidebarFooter;
