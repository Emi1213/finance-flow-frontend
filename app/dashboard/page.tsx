"use client";

import { useState } from "react";

import MonthYearPicker from "@/shared/components/datapicker";
import "react-datepicker/dist/react-datepicker.css";
import { TotalExpenseCard } from "@/features/expenses/presentation/components/total-expense";
import { TotalIncomeCard } from "@/features/incomes/presentation/components/total-income";

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const year = selectedDate ? selectedDate.getFullYear().toString() : "";
  const month = selectedDate ? (selectedDate.getMonth() + 1).toString() : "";

  return (
    <div className="w-full ">
      <div className="flex justify-center items-center">
        <MonthYearPicker
          initialDate={new Date()}
          maxYear={2030}
          minYear={2010}
          onDateChange={handleDateChange}
        />
      </div>
      <div className="p-6 flex  gap-10 w-ful">
        <TotalIncomeCard month={month} year={year} />
        <TotalExpenseCard month={month} year={year} />
        <TotalIncomeCard month={month} year={year} />
      </div>
    </div>
  );
};

export default DashboardPage;
