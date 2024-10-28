"use client";

import { Input } from "@nextui-org/input";

import { DateFilter } from "./date-filter";

import { SearchIcon } from "@/shared/components/icons";

interface ExpenseFiltersProps {
  filterValue: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  onMonthYearChange: (date: { month: number; year: number }) => void;
}

export const TableFilters = ({
  filterValue,
  onSearchChange,
  onClear,
  onMonthYearChange,
}: ExpenseFiltersProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className=" flex justify-center items-center">
        <DateFilter onMonthYearChange={onMonthYearChange} />
      </div>
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-1/2 sm:max-w-[44%]"
          placeholder="Search by description..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />
      </div>
    </div>
  );
};
