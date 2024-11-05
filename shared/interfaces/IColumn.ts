import { IExpense } from "@/features/expenses/models/IExpense";

export interface IColumn {
  uid: keyof IExpense | "actions";
  name: string;
  sortable?: boolean;
}
