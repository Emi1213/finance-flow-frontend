import { IExpenseType } from "@/features/expenses-types/models/IExpenseType";

export interface IIncome {
  id: number;
  description: string;
  value: number;
  status: boolean;
  type: IExpenseType;
  observation: string;
  userId: number;
  date: Date;
}

export interface ICreateIncome extends Omit<IIncome, "id" | "type"> {
  typeId: number;
}

export interface IUpdateIncome extends Partial<ICreateIncome> {}

export interface ITotalIncome {
  total: number;
}
