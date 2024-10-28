"use client";

import { useField, FieldHookConfig } from "formik";
import { Switch } from "@nextui-org/switch";
import React, { InputHTMLAttributes } from "react";

interface FMKSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export const FMKSwitch = ({ label, ...props }: FMKSwitchProps) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<any>);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={field.value}
        id={props.name}
        onChange={(e) => helpers.setValue(e.target.checked)}
      />
      <label htmlFor={props.name}>{label}</label>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
