"use client";
import { FC } from "react";
import SidebarLogo from "./sidebar-logo";
import SidebarNav from "./sidebar-nav";
import SidebarFooter from "./sidebar-footer";

interface DesktopSidebarProps {
  onLogoClick: () => void;
  onLinkClick: () => void;
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({
  onLogoClick,
  onLinkClick,
}) => {
  const handleExternalLink = () => {
    window.open("https://www.linkedin.com/in/victorpahomo/", "_blank");
  };

  return (
    <div className="hidden md:block fixed inset-y-0 left-0 z-30 w-56">
      <div className="h-full bg-background-100 text-gray-800 p-4 flex flex-col">
        <SidebarLogo onClick={onLogoClick} />
        <SidebarNav onItemClick={onLinkClick} />
        <SidebarFooter
          onClick={handleExternalLink}
          className="border-gray-200"
        />
      </div>
    </div>
  );
};

export default DesktopSidebar;
