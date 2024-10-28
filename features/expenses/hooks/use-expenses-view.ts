import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useExpenseStore } from "../context/useExpenseStore";
import { IExpense } from "../models/IExpense";

export function useExpenseView() {
  const router = useRouter();
  const pathname = usePathname();
  const { expenses, getAllExpenses } = useExpenseStore();
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const userId = "1";

    getAllExpenses(userId);
  }, [getAllExpenses]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense: IExpense) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(filterValue.toLowerCase());

      const expenseDate = new Date(expense.date);
      const matchesMonth = expenseDate.getMonth() + 1 === selectedMonth;
      const matchesYear = expenseDate.getFullYear() === selectedYear;

      return matchesSearch && matchesMonth && matchesYear;
    });
  }, [expenses, filterValue, selectedMonth, selectedYear]);

  const pages = Math.ceil(filteredExpenses.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;

    return filteredExpenses.slice(start, start + rowsPerPage);
  }, [page, filteredExpenses, rowsPerPage]);

  const handleDelete = async (id: number) => {
    const userId: number = id;

    router.push(`${pathname}/delete/${userId}`);
  };

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`);
  };

  const handleAdd = () => {
    router.push(`${pathname}/new`);
  };

  // Funciones para actualizar el mes y año seleccionados
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
    pages,
    filterValue,
    setFilterValue,
    page,
    setPage,
    handleDelete,
    handleEdit,
    handleAdd,
    handleMonthYearChange, // Exportamos la función para pasarla a `TableFilters`
  };
}
