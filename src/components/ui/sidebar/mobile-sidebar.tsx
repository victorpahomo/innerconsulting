"use client";
import { FC } from "react";

import SidebarFooter from "./sidebar-footer";
import { CloseIcon } from "@/assets/icons";
import SidebarNav from "./sidebar-nav";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:hidden w-56 bg-white text-gray-800 p-4 flex flex-col shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">InnerKanban</h2>
          <button
            onClick={onClose}
            className="text-gray-500 p-1.5 rounded-full hover:bg-flush-orange-50 hover:text-flush-orange-600 transition-colors"
            aria-label="Cerrar menú"
          >
            <CloseIcon />
          </button>
        </div>

        <SidebarNav onItemClick={onClose} />
        <SidebarFooter className="border-gray-100" />
      </div>

      {/* Backdrop to close the sidebar when clicking outside */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-30" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
    </>
  );
};

export default MobileSidebar;
