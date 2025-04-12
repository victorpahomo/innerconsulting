import { FC } from "react";

interface IconProps {
  color?: string;
  size?: number;
}

const OptionsIcon: FC<IconProps> = ({ color = "currentColor", size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill={color}
      width={size}
      height={size}
    >
      <path d="M6 10a2 2 0 110-4 2 2 0 010 4zM12 10a2 2 0 110-4 2 2 0 010 4zM18 10a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
  );
};

export default OptionsIcon;
