import { useField, FieldHookConfig } from "formik";
import { Input } from "@nextui-org/input";
import React from "react";

interface FMKInputProps {
  label: string;
  name: string;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FMKInput: React.FC<FMKInputProps> = ({
  label,
  type,
  onChange,
  ...props
}) => {
  const [field, meta] = useField(props as FieldHookConfig<any>);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="w-full">
      <Input
        disabled={props.disabled}
        label={label}
        {...field}
        {...props}
        fullWidth
        isClearable
        className="h-full"
        description={meta.touched && meta.error ? meta.error : undefined}
        labelPlacement="outside"
        size="lg"
        type={type}
        validationState={meta.touched && meta.error ? "invalid" : "valid"}
        onChange={handleChange}
      />
    </div>
  );
};
