import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import { Button } from "@nextui-org/button";

import { TableFilters } from "./table-filters";

import { useExpenseView } from "@/features/expenses/hooks/use-expenses-view";
import { IColumn } from "@/shared/interfaces/IColumn";
import { IExpense } from "@/features/expenses/models/IExpense";

const INITIAL_VISIBLE_COLUMNS: IColumn[] = [
  { uid: "description", name: "Description" },
  { uid: "value", name: "Value" },
  { uid: "status", name: "Status" },
  { uid: "actions", name: "Actions" },
];

export const ExpenseTable = () => {
  const {
    items,
    pages,
    filterValue,
    setFilterValue,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    handleDelete,
    handleEdit,
    handleAdd,
  } = useExpenseView();

  return (
    <div className="w-full">
      <div className="flex w-full my-3">
        <div className="w-full">
          <TableFilters
            filterValue={filterValue}
            setStatusFilter={setStatusFilter}
            statusFilter={statusFilter}
            statusOptions={[
              { uid: "active", name: "Active" },
              { uid: "paused", name: "Paused" },
            ]}
            onClear={() => {
              setFilterValue("");
              setStatusFilter(new Set<string>(["all"]));
              setPage(1);
            }}
            onSearchChange={setFilterValue}
          />
        </div>
        <div className="">
          <Button color="primary" onPress={handleAdd}>
            Nuevo Gasto
          </Button>
        </div>
      </div>
      <div className="w-full my-4">
        <Table aria-label="Expenses Table">
          <TableHeader columns={INITIAL_VISIBLE_COLUMNS}>
            {(column: IColumn) => (
              <TableColumn key={column.uid} allowsSorting>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item: IExpense) => (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.status ? "Pagado" : "Pendiente"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" onPress={() => handleEdit(item.id)}>
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onPress={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination page={page} total={pages} onChange={setPage} />
    </div>
  );
};
