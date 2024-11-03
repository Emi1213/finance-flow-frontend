"use client";

import React from "react";
import { DatePicker } from "@nextui-org/date-picker";
import { useField, FieldHookConfig } from "formik";
import {
  DateValue,
  today,
  getLocalTimeZone,
  CalendarDate,
} from "@internationalized/date";

interface FMKDatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  name: string;
}

export const FMKDatePicker: React.FC<FMKDatePickerProps> = ({
  label,
  ...props
}) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<string>);

  const stringToCalendarDate = (dateString: string | null): CalendarDate => {
    if (!dateString) return today(getLocalTimeZone());
    try {
      const date = new Date(dateString);

      return new CalendarDate(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate() + 1,
      );
    } catch {
      return today(getLocalTimeZone());
    }
  };

  const handleChange = (date: DateValue | null) => {
    if (date instanceof CalendarDate) {
      const jsDate = date.toDate(getLocalTimeZone());
      const isoString = jsDate.toISOString();

      helpers.setValue(isoString);
    } else {
      helpers.setValue("");
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <label>{label}</label>
      <DatePicker
        showMonthAndYearPickers
        className="max-w-[284px]"
        defaultValue={stringToCalendarDate(field.value)}
        label={label}
        onChange={handleChange}
      />
      {meta.touched && meta.error && (
        <div className="text-sm text-red-500 mt-1">{meta.error}</div>
      )}
    </div>
  );
};
