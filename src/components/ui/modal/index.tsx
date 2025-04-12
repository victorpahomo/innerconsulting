"use client";
import React, { useEffect } from "react";

import { CloseIcon } from "@/assets/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        data-testid="modal-overlay"
      />

      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md z-10 text-gray-800">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          {title && (
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
