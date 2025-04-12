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
    if (!process.env.NEXT_PUBLIC_AVATAR_SERVICE_URL) {
      console.error(
        "La variable de entorno NEXT_PUBLIC_AVATAR_SERVICE_URL no está definida"
      );
      return "";
    }

    return `${
      process.env.NEXT_PUBLIC_AVATAR_SERVICE_URL
    }/?name=${encodeURIComponent(name)}&background=random`;
  };

  return (
    <Image
      src={imageUrl || getDefaultAvatarUrl()}
      alt={`Avatar de ${name}`}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      onError={(e) => {
        const defaultUrl = getDefaultAvatarUrl();
        if (defaultUrl) {
          (e.target as HTMLImageElement).src = defaultUrl;
        } else {
          (e.target as HTMLImageElement).style.display = "none";
        }
      }}
      width={size === "sm" ? 32 : size === "md" ? 40 : 48}
      height={size === "sm" ? 32 : size === "md" ? 40 : 48}
    />
  );
}
