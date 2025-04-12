import { FC } from "react";

interface IconProps {
  color?: string;
  size?: number;
}

const DoneIcon: FC<IconProps> = ({ color = "currentColor", size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-500"
      viewBox="0 0 20 20"
      fill={color}
      width={size}
      height={size}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default DoneIcon;
