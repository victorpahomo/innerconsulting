"use client";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

import DesktopSidebar from "./desktop-sidebar";
import { useUI } from "@/context/ui-context";
import MobileSidebar from "./mobile-sidebar";

interface SidebarProps {
  className?: string;
}

const Sidebar: FC<SidebarProps> = () => {
  const { isSidebarOpen, closeSidebar } = useUI();
  const router = useRouter();

  const handleHomeRedirect = () => {
    router.push("/");
    closeSidebar();
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <DesktopSidebar
        onLogoClick={handleHomeRedirect}
        onLinkClick={closeSidebar}
      />
      <MobileSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
};

export default Sidebar;
