import { IExpenseType } from "@/features/expenses-types/models/IExpenseType";

export interface IIncome {
  id: number;
  description: string;
  value: number;
  status: boolean;
  typeId: IExpenseType;
  observation: string;
  userId: number;
  date: string;
}

export interface ITotalIncome {
  total: number;
}
