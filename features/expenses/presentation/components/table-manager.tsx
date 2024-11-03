"use client";

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
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";

import { TableFilters } from "../../../../shared/components/table-filters";

import { useExpenseView } from "@/features/expenses/hooks/use-expenses-view";
import { IColumn } from "@/shared/interfaces/IColumn";
import { IExpense } from "@/features/expenses/models/IExpense";

const INITIAL_VISIBLE_COLUMNS: IColumn[] = [
  { uid: "description", name: "Description" },
  { uid: "value", name: "Value" },
  { uid: "status", name: "Status" },
  { uid: "type", name: "Category  " },
  { uid: "date", name: "Fecha" },
  { uid: "actions", name: "Actions" },
];

export const ExpenseTable = () => {
  const formatDate = (date: Date) => {
    const utcDate = new Date(date);

    utcDate.setMinutes(utcDate.getMinutes() + utcDate.getTimezoneOffset());

    return utcDate.toLocaleDateString("es-ES").replace(/\//g, "-");
  };

  const {
    items,
    pages,
    filterValue,
    setFilterValue,
    page,
    setPage,
    handleDelete,
    handleEdit,
    handleAdd,
    handleMonthYearChange,
  } = useExpenseView();

  return (
    <div className="w-full">
      <div className="flex w-full my-3">
        <div className="w-full">
          <TableFilters
            filterValue={filterValue}
            onClear={() => {
              setFilterValue("");
              setPage(1);
            }}
            onMonthYearChange={handleMonthYearChange}
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
          <TableBody emptyContent="No expenses content data" items={items}>
            {(item: IExpense) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Tooltip
                    content={
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">Observación</div>
                        <div className="text-tiny">
                          {item.observation || "Sin observación"}
                        </div>
                      </div>
                    }
                  >
                    <Button variant="light">{item.description}</Button>
                  </Tooltip>
                </TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>
                  {item.status ? (
                    <Chip color="success" variant="dot">
                      Pagado
                    </Chip>
                  ) : (
                    <Chip color="warning" variant="dot">
                      Pagado
                    </Chip>
                  )}
                </TableCell>
                <TableCell>
                  <Chip color="primary" variant="bordered">
                    {item.type.name}
                  </Chip>
                </TableCell>
                <TableCell>{formatDate(item.date)}</TableCell>
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
