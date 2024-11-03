"use client";

import { FC } from "react";
import { useParams } from "next/navigation";

import { ExpensesListView } from "@/features/expenses/presentation/views/expenses-list-view";
import { IncomesListView } from "@/features/incomes/presentation/views/incomes-list-view";

const ModulePage = () => {
  const { module } = useParams() as { module: string };
  const AvaliableListViews: Record<string, FC> = {
    expenses: ExpensesListView,
    incomes: IncomesListView,
  };

  const ListView = AvaliableListViews[module];

  if (!ListView) {
    return <div>jej</div>;
  }

  return (
    <div className="w-full ">
      <ListView />
    </div>
  );
};

export default ModulePage;
