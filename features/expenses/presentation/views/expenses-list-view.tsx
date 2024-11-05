"use client";

import { ExpenseTable } from "../components/table-manager";
import { TableBreadcrumb } from "../components/table-breadcrumb";

export const ExpensesListView = () => {
  return (
    <div>
      <TableBreadcrumb />
      <ExpenseTable />
    </div>
  );
};
