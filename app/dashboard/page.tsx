"use client";

import { useState } from "react";

import MonthYearPicker from "@/shared/components/datapicker";
import "react-datepicker/dist/react-datepicker.css";
import { TotalExpenseCard } from "@/features/expenses/presentation/components/total-expense";
import { TotalIncomeCard } from "@/features/incomes/presentation/components/total-income";
import { UseAccountStore } from "@/features/auth/context/useUserStore";
import { TotalCard } from "@/features/total/presentation/components/total";

import { CategoryReport } from "../../features/incomes/presentation/components/report-category";
import { CategoryReportExpense } from "../../features/expenses/presentation/components/report-category";

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const userId = UseAccountStore((state) => state.user?.id.toString());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const year = selectedDate ? selectedDate.getFullYear().toString() : "";
  const month = selectedDate ? (selectedDate.getMonth() + 1).toString() : "";

  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center mb-6">
        <MonthYearPicker
          initialDate={new Date()}
          maxYear={2030}
          minYear={2010}
          onDateChange={handleDateChange}
        />
      </div>
      {userId && (
        <div className="flex flex-col gap-6 p-6 h-min">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full ">
            <TotalIncomeCard month={month} userId={userId} year={year} />
            <TotalExpenseCard month={month} userId={userId} year={year} />
            <TotalCard month={month} userId={userId} year={year} />
          </div>

          <div className="w-full flex justify-center h-1/2">
            <div className="h-1/2 flex gap-20">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Ingresos por Categoría
                </h2>
                <CategoryReport month={month} userId={userId} year={year} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Gastos por Categoría
                </h2>
                <CategoryReportExpense
                  month={month}
                  userId={userId}
                  year={year}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
