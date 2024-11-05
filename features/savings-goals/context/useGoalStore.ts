import { createJSONStorage, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";

import { GoalDatasourceImpl } from "../services/Datasource";
import { ICreateGoal, IGoal, IUpdateGoal } from "../models/IGoal";

interface StoreState {
  goals: IGoal[];
  setGoals: (expenses: IGoal[]) => void;
  getAllGoals: () => Promise<void>;
  deleteGoal: (id: number) => Promise<void>;
  createGoal: (expense: ICreateGoal) => Promise<void>;
  updateGoal: (id: number, expense: IUpdateGoal) => Promise<void>;
}

const DEFAULT_EXPENSES: IGoal[] = [];
const STORE_NAME = "goals";

export const useGoalStore = create<StoreState>(
  persist(
    (set, get) => ({
      goals: DEFAULT_EXPENSES,
      setGoals: (expenses: IGoal[]) => set({ goals: expenses }),
      getAllGoals: async () => {
        const expenses = await GoalDatasourceImpl.getInstance().getGoal();

        set({ goals: expenses });
      },
      deleteGoal: async (id: number) => {
        const isDeleted = await GoalDatasourceImpl.getInstance().deleteGoal(id);

        if (isDeleted) {
          get().getAllGoals();
        }
      },
      createGoal: async (expense: ICreateGoal) => {
        await GoalDatasourceImpl.getInstance().createGoal(expense);
      },
      updateGoal: async (id: number, expense: IUpdateGoal) => {
        await GoalDatasourceImpl.getInstance().updateGoal(id, expense);
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
);
