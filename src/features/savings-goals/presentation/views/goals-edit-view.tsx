"use client";

import { EditBreadcrumb } from "../components/edit-breadcrumb";
import { NewEditForm } from "../components/new-edit-form";
import { useGoalStore } from "../../context/useGoalStore";

export const GoalsEditView = ({ id }: { id: number }) => {
  const { goals } = useGoalStore();
  const currentGoal = goals.find((goal) => goal.id === id);

  return (
    <div>
      <EditBreadcrumb />
      <NewEditForm currentGoal={currentGoal} />
    </div>
  );
};
