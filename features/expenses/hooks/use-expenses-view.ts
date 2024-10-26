import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useExpenseStore } from "../context/useExpenseStore";
import { IExpense } from "../models/IExpense";

export function useExpenseView() {
  const router = useRouter();
  const pathname = usePathname();
  const { expenses, getAllExpenses } = useExpenseStore();
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState(new Set<string>(["all"]));
  const [rowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const userId = "1";

    getAllExpenses(userId);
  }, [getAllExpenses]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense: IExpense) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(filterValue.toLowerCase());
      const matchesStatus =
        statusFilter.has(expense.status ? "active" : "paused") ||
        statusFilter.has("all");

      return matchesSearch && matchesStatus;
    });
  }, [expenses, filterValue, statusFilter]);

  const pages = Math.ceil(filteredExpenses.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;

    return filteredExpenses.slice(start, start + rowsPerPage);
  }, [page, filteredExpenses, rowsPerPage]);

  const handleDelete = async (id: number) => {
    //await deleteExpense(id);
    console.log("Deleting expense with id: ", id);
  };

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`);
  };

  const handleAdd = () => {
    router.push(`${pathname}/new`);
  };

  return {
    items,
    pages,
    filterValue,
    setFilterValue,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    handleDelete,
    handleEdit,
    handleAdd,
  };
}
