"use client";

import { useField, FieldHookConfig } from "formik";
import React, { useEffect, useState } from "react";

interface Option {
  id: number;
  name: string;
}

interface FMKSelectProps {
  label: string;
  name: string;
  placeholder?: string;
  options: Option[];
  onCreateCategory: (name: string) => Promise<void>;
}

export const FMKSelect: React.FC<FMKSelectProps> = ({
  label,
  options,
  placeholder,
  onCreateCategory,
  ...props
}) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<string>);
  const [showCreateOption, setShowCreateOption] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const optionExists = options.some((option) => option.name === field.value);

    setShowCreateOption(Boolean(field.value && !optionExists));
  }, [field.value, options]);

  const handleCreateCategory = async () => {
    if (field.value) {
      await onCreateCategory(field.value);
      helpers.setValue("");
    }
  };

  const handleSelect = (optionName: string) => {
    helpers.setValue(optionName);
    setIsOpen(false);
  };

  return (
    <div className="form-group w-full relative">
      <label className="block text-sm font-medium mb-1" htmlFor={props.name}>
        {label}
      </label>
      <div className="w-full">
        <button
          className="w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {field.value || placeholder || "Seleccionar opción"}
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.id}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                type="button"
                onClick={() => handleSelect(option.name)}
              >
                {option.name}
              </button>
            ))}
            {showCreateOption && (
              <div className="px-4 py-2 text-gray-500 italic">
                No hay esta categoría
              </div>
            )}
          </div>
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};
