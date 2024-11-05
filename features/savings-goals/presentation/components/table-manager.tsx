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

import { TableFilters } from "../../../../shared/components/table-filters";
import { IGoal } from "../../models/IGoal";

import { useGoalView } from "@/features/savings-goals/hooks/use-expenses-view";
import { IColumn } from "@/shared/interfaces/IColumn";

const INITIAL_VISIBLE_COLUMNS: IColumn[] = [
  { uid: "value", name: "Value" },
  { uid: "status", name: "Status" },
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
  } = useGoalView();

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
            Nueva meta
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
          <TableBody emptyContent="No goals content data" items={items}>
            {(item: IGoal) => (
              <TableRow key={item.id}>
                <TableCell>{item.value}</TableCell>
                <TableCell>
                  {item.status ? (
                    <Chip color="success" variant="dot">
                      Cumplido
                    </Chip>
                  ) : (
                    <Chip color="warning" variant="dot">
                      Incompleto
                    </Chip>
                  )}
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
