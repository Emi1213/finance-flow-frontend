"use client";

import { EditBreadcrumb } from "../components/edit-breadcrumb";
import { NewEditForm } from "../components/new-edit-form";
import { useExpenseStore } from "../../context/useExpenseStore";

export const ExpensesEditView = ({ id }: { id: number }) => {
  const { expenses } = useExpenseStore();
  const currentExpense = expenses.find((expense) => expense.id === id);

  return (
    <div>
      <EditBreadcrumb />
      <NewEditForm currentExpense={currentExpense} />
    </div>
  );
};
