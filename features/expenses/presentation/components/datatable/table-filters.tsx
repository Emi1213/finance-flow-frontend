"use client";

import { Input } from "@nextui-org/input";

import { SearchIcon } from "@/shared/components/icons";
import { StatusOption } from "@/shared/utils/table-utils";

interface ExpenseFiltersProps {
  filterValue: string;
  onSearchChange: (value: string) => void;
  statusFilter: Set<string>;
  setStatusFilter: (keys: Set<string>) => void;
  statusOptions: StatusOption[];
  onClear: () => void;
}

export const TableFilters = ({
  filterValue,
  onSearchChange,
  //   statusFilter,
  //   setStatusFilter,
  //   statusOptions,
  onClear,
}: ExpenseFiltersProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by description..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />
        {/* <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button
              endContent={<SearchIcon className="text-small" />}
              variant="flat"
            >
              Status
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            selectedKeys={statusFilter}
            selectionMode="multiple"
            onSelectionChange={(keys) =>
              setStatusFilter(new Set<string>(keys as unknown as string[]))
            }
          >
            {statusOptions.map((status) => (
              <DropdownItem key={status.uid} className="capitalize">
                {capitalize(status.name)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown> */}
      </div>
    </div>
  );
};
