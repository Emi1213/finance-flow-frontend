import { createJSONStorage, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";

import { IExpense } from "../models/IExpense";
import { ExpenseDatasourceImpl } from "../services/Datasource";

interface StoreState {
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => void;
  getAllExpenses: (userId: string) => Promise<void>;
}

const DEFAULT_EXPENSES: IExpense[] = [];
const STORE_NAME = "expenses";

export const useExpenseStore = create<StoreState>(
  persist(
    (set) => ({
      expenses: DEFAULT_EXPENSES,
      setExpenses: (expenses: IExpense[]) => set({ expenses }),
      getAllExpenses: async (userId: string) => {
        const expenses =
          await ExpenseDatasourceImpl.getInstance().getExpenses(userId);

        set({ expenses });
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
);
