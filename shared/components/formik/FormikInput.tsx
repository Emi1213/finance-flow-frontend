import { useField, FieldHookConfig } from "formik";
import { Input } from "@nextui-org/input";
import React from "react";

interface FMKInputProps {
  label: string;
  name: string;
  type?: string;
}

export const FMKInput: React.FC<FMKInputProps> = ({
  label,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField(props as FieldHookConfig<any>);

  return (
    <div className="w-full">
      <label htmlFor={props.name}>{label}</label>
      <Input
        {...field}
        {...props}
        fullWidth
        isClearable
        description={meta.touched && meta.error ? meta.error : undefined}
        type={type}
        validationState={meta.touched && meta.error ? "invalid" : "valid"}
      />
    </div>
  );
};
