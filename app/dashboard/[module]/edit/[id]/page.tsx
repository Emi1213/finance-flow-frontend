"use client";

import { useParams } from "next/navigation";
import { FC } from "react";

import { ExpensesEditView } from "@/features/expenses/presentation/views/expenses-edit-view";

interface EditViewProps {
  id: number;
}

const Page = () => {
  const { module, id } = useParams() as { module: string; id: string };

  const AvaliableEditViews: Record<string, FC<EditViewProps>> = {
    expenses: ExpensesEditView,
    incomes: ExpensesEditView,
    reports: ExpensesEditView,
  };

  const EditView = AvaliableEditViews[module];

  if (!EditView) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <EditView id={Number(id)} />
    </div>
  );
};

export default Page;
