"use client";

import { ExpenseTable } from "../components/table-manager";
import { TableBreadcrumb } from "../components/table-breadcrumb";

export const GoalsListView = () => {
  return (
    <div>
      <TableBreadcrumb />
      <ExpenseTable />
    </div>
  );
};
