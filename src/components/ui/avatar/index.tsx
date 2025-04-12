"use client";
import Image from "next/image";

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({
  name,
  imageUrl,
  size = "md",
  className = "",
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const getDefaultAvatarUrl = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random`;
  };

  return (
    <Image
      src={imageUrl || getDefaultAvatarUrl()}
      alt={`Avatar de ${name}`}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      onError={(e) => {
        (e.target as HTMLImageElement).src = getDefaultAvatarUrl();
      }}
      width={size === "sm" ? 32 : size === "md" ? 40 : 48}
      height={size === "sm" ? 32 : size === "md" ? 40 : 48}
    />
  );
}
