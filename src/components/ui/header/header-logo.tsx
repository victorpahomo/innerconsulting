import { FC } from "react";

import logo from "@/assets/png/innerconsulting-logo.png";
import Image from "next/image";

const HeaderLogo: FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={logo}
        alt="InnerKanban Logo"
        width={24}
        height={24}
        className="object-contain"
      />
      <h2 className="text-lg font-bold text-gray-800 tracking-tight">
        innerKanban
      </h2>
    </div>
  );
};

export default HeaderLogo;
