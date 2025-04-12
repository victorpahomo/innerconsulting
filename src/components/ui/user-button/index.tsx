import { AddUserIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";

interface UserButtonProps {
  onClick: () => void;
  className?: string;
}

export function UserButton({ onClick, className = "" }: UserButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center justify-center w-full sm:w-auto ${className}`}
    >
      <AddUserIcon />
      Añadir Usuario
    </Button>
  );
}
