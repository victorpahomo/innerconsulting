"use client";
import { useEffect, useState } from "react";

import { CloseIcon, DoneIcon } from "@/assets/icons";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the toast with a small delay to trigger the transition
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    // Configure the timer to close automatically
    const closeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for the transition to finish before removing it
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose, duration]);

  const typeStyles: Record<ToastType, string> = {
    success:
      "bg-emerald-600 text-white font-medium shadow-lg border border-emerald-400/20",
    error:
      "bg-rose-600 text-white font-medium shadow-lg border border-rose-400/20",
    info: "bg-sky-600 text-white font-medium shadow-lg border border-sky-400/20",
  };

  const getIcon = () => {
    if (type === "success") {
      return <DoneIcon size={18} color="white" />;
    }
    if (type === "error") {
      return <CloseIcon size={18} color="white" />;
    }
    return null;
  };

  return (
    <div
      className={`${
        typeStyles[type]
      } text-white p-4 rounded-md shadow-lg max-w-md fixed bottom-4 right-4 z-50 flex justify-between items-center transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="mr-2">{getIcon()}</span>
        <p>{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="text-white ml-4 flex items-center justify-center w-6 h-6"
        aria-label="Cerrar notificación"
      >
        ×
      </button>
    </div>
  );
}
