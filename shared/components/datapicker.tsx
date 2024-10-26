// DatePicker.tsx
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@nextui-org/button";

interface MonthYearPickerProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
  minYear?: number;
  maxYear?: number;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  initialDate = new Date(),
  onDateChange,
  minYear = 1900,
  maxYear = 2024,
}) => {
  const [date, setDate] = useState<Date>(initialDate);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const years: number[] = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i,
  );

  const months: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handleYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const newDate = new Date(date.setFullYear(parseInt(event.target.value)));

    setDate(newDate);
    onDateChange?.(newDate);
  };

  const handleMonthChange = (monthIndex: number): void => {
    const newDate = new Date(date.setMonth(monthIndex));

    setDate(newDate);
    onDateChange?.(newDate);
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      placement="bottom"
      onOpenChange={(open: boolean) => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button className="min-w-[200px] justify-start" variant="bordered">
          {format(date, "MMMM yyyy", { locale: es })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] p-4">
        <div className="flex flex-col gap-4">
          <select
            className="p-2 border rounded"
            value={date.getFullYear()}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <Button
                key={month}
                size="sm"
                variant={date.getMonth() === index ? "solid" : "light"}
                onClick={() => handleMonthChange(index)}
              >
                {month}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MonthYearPicker;
