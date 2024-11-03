import { IExpenseType } from "@/features/expenses-types/models/IExpenseType";

export interface IExpense {
  id: number;
  description: string;
  value: number;
  status: boolean;
  type: IExpenseType;
  observation: string;
  userId: number;
  date: Date;
}

export interface ICreateExpense extends Omit<IExpense, "id" | "type"> {
  typeId: number;
}

export interface IUpdateExpense extends Partial<ICreateExpense> {}

export interface ITotalExpense {
  total: number;
}
