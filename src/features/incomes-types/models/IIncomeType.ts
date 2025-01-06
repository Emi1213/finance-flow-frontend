export interface IIncomeType {
  id: number;
  name: string;
  isGlobal: boolean;
  userId: number;
}

export interface ICreateIncomeType extends Omit<IIncomeType, "id"> {}
