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

    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

    return new CalendarDate(
      adjustedDate.getFullYear(),
      adjustedDate.getMonth() + 1,
      adjustedDate.getDate(),
    );
  };

  const initialCalendarDate = stringToCalendarDate(field.value);

  const handleChange = (date: DateValue | null) => {
    if (date instanceof CalendarDate) {
      const month = String(date.month).padStart(2, "0");
      const day = String(date.day).padStart(2, "0");

      const dateObj = new Date(date.year, parseInt(month) - 1, parseInt(day));
      const userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
      const adjustedDate = new Date(dateObj.getTime() - userTimezoneOffset);

      const formattedDate = `${adjustedDate.toISOString().split(".")[0]}.000Z`;

      helpers.setValue(formattedDate);
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
        label={label}
        value={initialCalendarDate}
        onChange={handleChange}
      />
      {meta.touched && meta.error && (
        <div className="text-sm text-red-500 mt-1">{meta.error}</div>
      )}
    </div>
  );
};
