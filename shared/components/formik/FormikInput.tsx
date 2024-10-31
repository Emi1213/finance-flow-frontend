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
  type,
  ...props
}) => {
  const [field, meta] = useField(props as FieldHookConfig<any>);

  return (
    <div className="w-full ">
      <Input
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
      />
    </div>
  );
};
