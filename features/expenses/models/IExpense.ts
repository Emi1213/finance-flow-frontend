export interface IExpense {
  id: number;
  description: string;
  value: number;
  status: boolean;
  typeId: number;
  observation: string;
  userId: number;
  date: string;
}

export interface ITotalExpense {
  total: number;
}
