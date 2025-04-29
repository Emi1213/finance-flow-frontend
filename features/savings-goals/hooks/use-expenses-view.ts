import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useGoalStore } from "../context/useGoalStore";
import { IGoal } from "../models/IGoal";

/**
 * Hook que gestiona la visualización y gestión de las metas.
 *
 * - Filtra las metas por porcentaje, mes y año seleccionados.
 * - Permite eliminar, editar y agregar nuevas metas.
 * - Administra la paginación de las metas mostradas.
 * - Controla el filtro de búsqueda por porcentaje y la selección de mes y año.
 *
 * @returns {{
 *   items: IGoal[], 
 *   pages: number,
 *   filterValue: string,
 *   setFilterValue: Function,
 *   page: number,
 *   setPage: Function,
 *   handleDelete: Function,
 *   handleEdit: Function,
 *   handleAdd: Function,
 *   handleMonthYearChange: Function
 * }}
 */
export function useGoalView() {
  const router = useRouter();
  const pathname = usePathname();
  const { goals, getAllGoals, deleteGoal } = useGoalStore();
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage] = useState(7);
  const [page, setPage] = useState(1);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    getAllGoals();
  }, [getAllGoals]);

  const filteredGoals = useMemo(() => {
    return goals.filter((goal: IGoal) => {
      const matchesSearch = goal.percentaje
        .toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase());

      const GoalDate = new Date(goal.date);
      const matchesMonth = GoalDate.getMonth() + 1 === selectedMonth;
      const matchesYear = GoalDate.getFullYear() === selectedYear;

      return matchesSearch && matchesMonth && matchesYear;
    });
  }, [goals, filterValue, selectedMonth, selectedYear]);

  const pages = Math.ceil(filteredGoals.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;

    return filteredGoals.slice(start, start + rowsPerPage);
  }, [page, filteredGoals, rowsPerPage]);

  const handleDelete = async (id: number) => {
    await deleteGoal(id);
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
