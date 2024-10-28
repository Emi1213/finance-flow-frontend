"use client";

import { useParams } from "next/navigation";
import { FC } from "react";

import { ExpensesCreateView } from "@/features/expenses/presentation/views/expenses-create-view";

const Page = () => {
  const { module } = useParams() as { module: string };

  const AvaliableCreateViews: Record<string, FC> = {
    expenses: ExpensesCreateView,
    incomes: ExpensesCreateView,
    reports: ExpensesCreateView,
  };

  const CreateView = AvaliableCreateViews[module];

  if (!CreateView) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <CreateView />
    </div>
  );
};

export default Page;
