import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useExpenseStore } from "../context/useExpenseStore";
import { IExpense } from "../models/IExpense";

/**
 * Hook que gestiona la visualización y operaciones sobre los gastos.
 *
 * - Obtiene todos los gastos al montar el componente.
 * - Filtra los gastos por descripción, mes y año seleccionados.
 * - Maneja la paginación de la lista de gastos.
 * - Permite eliminar, editar y añadir nuevos gastos.
 *
 * @returns {{
 *   items: IExpense[],
 *   pages: number,
 *   filterValue: string,
 *   setFilterValue: (value: string) => void,
 *   page: number,
 *   setPage: (page: number) => void,
 *   handleDelete: (id: number) => Promise<void>,
 *   handleEdit: (id: number) => void,
 *   handleAdd: () => void,
 *   handleMonthYearChange: ({ month, year }: { month: number; year: number }) => void
 * }}
 */
export function useExpenseView() {
  const router = useRouter();
  const pathname = usePathname();
  const { expenses, getAllExpenses, deleteExpense } = useExpenseStore();

  // Estado para el filtro de búsqueda por descripción
  const [filterValue, setFilterValue] = useState("");
  // Número de filas a mostrar por página (constante)
  const [rowsPerPage] = useState(7);
  // Página actual en la paginación
  const [page, setPage] = useState(1);

  // Mes y año seleccionados para el filtrado temporal
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Al montar, carga todos los gastos
  useEffect(() => {
    getAllExpenses();
  }, [getAllExpenses]);

  // Filtra los gastos según descripción, mes y año
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

  // Calcula el número de páginas
  const pages = Math.ceil(filteredExpenses.length / rowsPerPage);

  // Obtiene los elementos de la página actual
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredExpenses.slice(start, start + rowsPerPage);
  }, [page, filteredExpenses, rowsPerPage]);

  /**
   * Elimina un gasto por su ID.
   * @param {number} id - ID del gasto a eliminar.
   */
  const handleDelete = async (id: number) => {
    await deleteExpense(id);
  };

  /**
   * Navega al formulario de edición de un gasto.
   * @param {number} id - ID del gasto a editar.
   */
  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`);
  };

  /**
   * Navega al formulario de creación de un nuevo gasto.
   */
  const handleAdd = () => {
    router.push(`${pathname}/new`);
  };

  /**
   * Actualiza el mes y año seleccionados para el filtrado.
   * @param {{ month: number; year: number }} param0 - Objeto con mes y año.
   */
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
    handleMonthYearChange,
  };
}
