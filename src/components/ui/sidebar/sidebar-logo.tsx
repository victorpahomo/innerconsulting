"use client";
import { FC } from "react";
import Image from "next/image";
import logo from "@/assets/png/innerconsulting-logo.png";

interface SidebarLogoProps {
  onClick: () => void;
}

const SidebarLogo: FC<SidebarLogoProps> = ({ onClick }) => {
  return (
    <div
      className="mb-7 mt-5 flex items-center gap-3 cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={logo}
        alt="InnerKanban Logo"
        width={32}
        height={32}
        className="object-contain"
      />
      <h2 className="text-xl font-bold text-gray-800 tracking-tight">
        innerKanban
      </h2>
    </div>
  );
};

export default SidebarLogo;
