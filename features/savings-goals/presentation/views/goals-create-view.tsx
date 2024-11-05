"use client";

import { CreateBreadcrumb } from "../components/create-breadcrumb";
import { NewEditForm } from "../components/new-edit-form";

export const GoalsCreateView = () => {
  return (
    <div>
      <CreateBreadcrumb />
      <NewEditForm />
    </div>
  );
};
