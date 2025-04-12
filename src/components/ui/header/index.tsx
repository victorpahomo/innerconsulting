"use client";
import { FC } from "react";

import { pathToTitle } from "@/utils/constants";
import { HamburgerIcon } from "@/assets/icons";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/ui-context";
import HeaderLogo from "./header-logo";

interface HeaderProps {
  title?: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const { toggleSidebar } = useUI();
  const pathname = usePathname();

  // Get title from props or generate from path
  const getTitle = () => {
    if (title) return title;
    return pathToTitle(pathname);
  };

  return (
    <header className="pt-5 md:pt-2">
      {/* First row with menu and centered logo (mobile only) */}
      <div className="md:hidden flex items-center relative">
        <button
          onClick={toggleSidebar}
          className="p-1.5 text-gray-500 hover:bg-flush-orange-50 hover:text-flush-orange-600 rounded-md transition-colors absolute left-0"
          aria-label="Abrir menú"
        >
          <HamburgerIcon />
        </button>

        {/* Centered logo */}
        <div className="flex justify-center w-full">
          <HeaderLogo />
        </div>
      </div>

      {/* Page section title - second row */}
      <div className="mt-4 md:py-0 py-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {getTitle()}
        </h1>
      </div>
    </header>
  );
};

export default Header;
