"use client";

import { FC } from "react";
import { useParams } from "next/navigation";

import { ExpensesListView } from "@/features/expenses/presentation/views/expenses-list-view";

const ModulePage = () => {
  const { module } = useParams() as { module: string };
  const AvaliableListViews: Record<string, FC> = {
    expenses: ExpensesListView,
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
