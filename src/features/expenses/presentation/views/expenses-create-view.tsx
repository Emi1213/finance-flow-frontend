"use client";

import { CreateBreadcrumb } from "../components/create-breadcrumb";
import { NewEditForm } from "../components/new-edit-form";

export const ExpensesCreateView = () => {
  return (
    <div>
      <CreateBreadcrumb />
      <NewEditForm />
    </div>
  );
};
