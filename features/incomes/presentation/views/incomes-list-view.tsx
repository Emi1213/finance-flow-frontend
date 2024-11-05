"use client";

import { IncomeTable } from "../components/table-manager";
import { TableBreadcrumb } from "../components/table-breadcrumb";

export const IncomesListView = () => {
  return (
    <div>
      <TableBreadcrumb />
      <IncomeTable />
    </div>
  );
};
