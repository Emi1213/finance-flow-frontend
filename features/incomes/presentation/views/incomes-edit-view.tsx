"use client";

import { EditBreadcrumb } from "../components/edit-breadcrumb";
import { NewEditForm } from "../components/new-edit-form";
import { useIncomeStore } from "../../context/useIncomeStore";

export const IncomesEditView = ({ id }: { id: number }) => {
  const { incomes } = useIncomeStore();
  const currentIncome = incomes.find((incomes) => incomes.id === id);

  return (
    <div>
      <EditBreadcrumb />
      <NewEditForm currentIncome={currentIncome} />
    </div>
  );
};
