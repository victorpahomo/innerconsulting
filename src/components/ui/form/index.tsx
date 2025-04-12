"use client";
import React, { useEffect, useRef, useState } from "react";

import { useOnClickOutside } from "@/hooks/use-on-click-outside";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  variant?: "default" | "modal";
}

export function Form({
  children,
  onSubmit,
  className = "",
  variant = "default",
  ...props
}: FormProps) {
  const variantClasses = {
    default: "bg-white p-6 rounded-lg shadow-md",
    modal: "p-0",
  };

  return (
    <form
      className={`${variantClasses[variant]} ${className}`}
      onSubmit={onSubmit}
      {...props}
    >
      {children}
    </form>
  );
}

// Form Field Container
interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export function FormField({ children, className = "" }: FormFieldProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

// Form Label
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
}

export function FormLabel({
  children,
  htmlFor,
  className = "",
  ...props
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

// Form Input
export function FormInput({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
      {...props}
    />
  );
}

// Form Textarea
export function FormTextarea({
  className = "",
  rows = 3,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={`w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
      {...props}
    />
  );
}

// Form Select
export function FormSelect({
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
      {...props}
    />
  );
}

// Form Multi-Select
interface FormMultiSelectProps<T> {
  id: string;
  value: T[];
  onChange: (selectedItems: T[]) => void;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export function FormMultiSelect<T>({
  id,
  value,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
  placeholder = "Seleccionar...",
  className = "",
  required = false,
  disabled = false,
}: FormMultiSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close the dropdown when clicking outside of it
  useOnClickOutside(dropdownRef as React.RefObject<HTMLElement>, () =>
    setIsOpen(false)
  );

  // When the dropdown is opened, focus the search input
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Filter options based on the search term
  const filteredOptions = options.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if an option is selected
  const isSelected = (option: T) => {
    return value.some(
      (item) => getOptionValue(item) === getOptionValue(option)
    );
  };

  // Handle the selection/deselection of an option
  const handleSelect = (option: T) => {
    if (disabled) return;
    const selectedValue = getOptionValue(option);
    const newValue = isSelected(option)
      ? value.filter((item) => getOptionValue(item) !== selectedValue)
      : [...value, option];
    onChange(newValue);
  };

  // Handle the keyboard for accessible navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`flex flex-wrap gap-1 min-h-[42px] p-2 border border-gray-300 rounded-md ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"
        } ${isOpen ? "ring-1 ring-indigo-500 border-indigo-500" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {value.length > 0 ? (
          value.map((item) => (
            <div
              key={getOptionValue(item)}
              className="bg-indigo-100 text-indigo-800 text-sm rounded-md px-2 py-1 flex items-center"
            >
              <span>{getOptionLabel(item)}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(item);
                }}
                className="ml-1 text-indigo-500 hover:text-indigo-700"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full p-2 border border-gray-300 rounded-md"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ul
            ref={listRef}
            className="max-h-30 overflow-y-auto py-1 custom-scrollbar"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={getOptionValue(option)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option);
                  }}
                  className={`px-3 py-2 cursor-pointer hover:bg-indigo-50 ${
                    isSelected(option) ? "bg-indigo-100" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isSelected(option)}
                      onChange={() => {}}
                      className="mr-2"
                    />
                    {getOptionLabel(option)}
                  </div>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No hay resultados</li>
            )}
          </ul>
        </div>
      )}

      {required && (
        <input
          type="hidden"
          id={id}
          required={required}
          value={value.length > 0 ? "valid" : ""}
        />
      )}
    </div>
  );
}

// Action Buttons Container
interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function FormActions({ children, className = "" }: FormActionsProps) {
  return (
    <div className={`flex justify-end space-x-2 ${className}`}>{children}</div>
  );
}
