export interface IGoal {
  id: number;
  value: number;
  percentaje: number;
  status: boolean;
  date: Date;
  userId: number;
}

export interface ICreateGoal extends Omit<IGoal, "id"> {}

export interface IUpdateGoal extends Partial<ICreateGoal> {}
