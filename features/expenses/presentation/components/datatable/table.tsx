import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import { IExpense } from "../../../models/IExpense";

import { IColumn } from "@/shared/interfaces/IColumn";

interface ExpenseTableProps {
  items: IExpense[];
  columns: IColumn[];
  renderCell: (item: IExpense, columnKey: keyof IExpense) => React.ReactNode;
}

export const ExpensesTable = async ({
  items,
  columns,
  renderCell,
}: ExpenseTableProps) => {
  return (
    <Table isHeaderSticky aria-label="Expense table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={(column.uid as string) === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No expenses found"} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof IExpense)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
