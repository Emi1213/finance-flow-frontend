"use client";

import { useParams } from "next/navigation";
import { FC } from "react";

import { ExpensesEditView } from "@/features/expenses/presentation/views/expenses-edit-view";
import { IncomesEditView } from "@/features/incomes/presentation/views/incomes-edit-view";
import { GoalsEditView } from "@/features/savings-goals/presentation/views/goals-edit-view";

interface EditViewProps {
  id: number;
}

const Page = () => {
  const { module, id } = useParams() as { module: string; id: string };

  const AvaliableEditViews: Record<string, FC<EditViewProps>> = {
    expenses: ExpensesEditView,
    incomes: IncomesEditView,
    goals: GoalsEditView,
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
