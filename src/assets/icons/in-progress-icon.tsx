import { FC } from "react";

interface IconProps {
  color?: string;
  size?: number;
}

const InProgressIcon: FC<IconProps> = ({
  color = "currentColor",
  size = 20,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-500"
      viewBox="0 0 20 20"
      fill={color}
      width={size}
      height={size}
    >
      <rect x="3" y="5" width="14" height="2" rx="1" fill="currentColor" />
      <rect x="3" y="9" width="10" height="2" rx="1" fill="currentColor" />
      <rect x="3" y="13" width="6" height="2" rx="1" fill="currentColor" />
    </svg>
  );
};

export default InProgressIcon;
