export interface IExpenseType {
  id: number;
  name: string;
  isGlobal: boolean;
  userId: number;
}

export interface ICreateExpenseType extends Omit<IExpenseType, "id"> {}
