import { FC } from "react";

interface IconProps {
  color?: string;
  size?: number;
}

const PendingIcon: FC<IconProps> = ({ color = "currentColor", size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-500"
      viewBox="0 0 20 20"
      fill={color}
      width={size}
      height={size}
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default PendingIcon;
