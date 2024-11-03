"use client";

import React, { FC, useState } from "react";
import { useField, FieldHookConfig } from "formik";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

interface Option {
  label: string;
  value: number;
}

interface FMKAutocompleteProps {
  label: string;
  name: string;
  placeholder?: string;
  options: Option[];
}

export const FMKAutocomplete: FC<FMKAutocompleteProps> = ({
  label,
  options,
  placeholder,
  ...props
}) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<number>);
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(options);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setFilteredItems(
      options.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <div className="w-full">
      <Autocomplete
        className="max-w-xs"
        defaultItems={filteredItems}
        defaultSelectedKey={Number(2)}
        label={label}
        placeholder={placeholder || "Seleccionar opción"}
        validationState={meta.touched && meta.error ? "invalid" : "valid"}
        value={inputValue}
        variant="bordered"
        onInputChange={handleInputChange}
        onSelectionChange={(key) => {
          const selectedItem = options.find(
            (item) => item.value === Number(key),
          );

          if (selectedItem) {
            helpers.setValue(selectedItem.value);
            setInputValue(selectedItem.label);
          }
        }}
      >
        {(item) => (
          <AutocompleteItem
            key={item.value}
            className="capitalize"
            textValue={item.label}
          >
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
      {meta.touched && meta.error && (
        <div className="text-sm text-red-500 mt-1">{meta.error}</div>
      )}
    </div>
  );
};
