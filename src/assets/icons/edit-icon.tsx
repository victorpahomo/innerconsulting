import { FC } from "react";

interface IconProps {
  color?: string;
  size?: number;
}

const EditIcon: FC<IconProps> = ({ color = "currentColor", size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 mr-1"
      viewBox="0 0 20 20"
      fill={color}
      width={size}
      height={size}
    >
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
  );
};

export default EditIcon;
