import { IIncomeType } from "@/features/incomes-types/models/IIncomeType";

export interface IIncome {
  id: number;
  description: string;
  value: number;
  status: boolean;
  type: IIncomeType;
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
