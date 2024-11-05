"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { FieldHookConfig, useField } from "formik";
import { useEffect } from "react";

interface Option {
  label: string;
  value: number;
}

interface FMKSelectProps {
  label: string;
  name: string;
  placeholder?: string;
  options: Option[];
}

export const FMKSelect = ({
  label,
  options,
  placeholder,
  ...props
}: FMKSelectProps) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<number>);

  // Sync Formik's initial value with Select
  useEffect(() => {
    if (field.value !== undefined && !isNaN(field.value)) {
      helpers.setValue(field.value);
    }
  }, [field.value, helpers]);

  return (
    <div className="flex flex-col gap-2">
      <Select
        label={label}
        selectedKeys={field.value !== undefined ? [String(field.value)] : []}
        onSelectionChange={(value) => {
          const selectedValue = Number(value.currentKey);

          if (!isNaN(selectedValue)) {
            helpers.setValue(selectedValue); // Update Formik's value
          }
        }}
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
