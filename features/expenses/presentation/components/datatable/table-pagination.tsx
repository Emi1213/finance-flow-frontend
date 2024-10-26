import React from "react";
import { Pagination } from "@nextui-org/pagination";
import { Button } from "@nextui-org/button";

interface ExpensePaginationProps {
  page: number;
  pages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  setPage: (page: number) => void;
}

const ExpensePagination = async ({
  page,
  pages,
  onNextPage,
  onPreviousPage,
  setPage,
}: ExpensePaginationProps) => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button
          isDisabled={page <= 1}
          size="sm"
          variant="flat"
          onPress={onPreviousPage}
        >
          Previous
        </Button>
        <Button
          isDisabled={page >= pages}
          size="sm"
          variant="flat"
          onPress={onNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ExpensePagination;
