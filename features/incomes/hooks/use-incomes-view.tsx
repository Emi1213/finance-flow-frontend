"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

import { useIncomeStore } from "../context/useIncomeStore";
import { IIncome } from "../models/IIncome";

export function useIncomeView() {
  const router = useRouter();
  const pathname = usePathname();
  const { deleteIncome, incomes, getAllIncomes } = useIncomeStore();

  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage] = useState(7);
  const [page, setPage] = useState(1);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    getAllIncomes();
  }, [getAllIncomes]);

  const filteredExpenses = useMemo(() => {
    return incomes.filter((expense: IIncome) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(filterValue.toLowerCase());

      const expenseDate = new Date(expense.date);
      const matchesMonth = expenseDate.getMonth() + 1 === selectedMonth;
      const matchesYear = expenseDate.getFullYear() === selectedYear;

      return matchesSearch && matchesMonth && matchesYear;
    });
  }, [incomes, filterValue, selectedMonth, selectedYear]);

  const pages = Math.ceil(filteredExpenses.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;

    return filteredExpenses.slice(start, start + rowsPerPage);
  }, [page, filteredExpenses, rowsPerPage]);

  const handleDelete = async (id: number) => {
    await deleteIncome(id);
  };

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`);
  };

  const handleAdd = () => {
    router.push(`${pathname}/new`);
  };

  const handleMonthYearChange = ({
    month,
    year,
  }: {
    month: number;
    year: number;
  }) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  return {
    items,
    filterValue,
    setFilterValue,
    page,
    setPage,
    pages,
    handleDelete,
    handleEdit,
    handleAdd,
    handleMonthYearChange,
  };
}
