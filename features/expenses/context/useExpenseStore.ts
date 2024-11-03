import { createJSONStorage, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";

import { ICreateExpense, IExpense, IUpdateExpense } from "../models/IExpense";
import { ExpenseDatasourceImpl } from "../services/Datasource";

interface StoreState {
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => void;
  getAllExpenses: () => Promise<void>;
  deleteExpense: (id: number) => Promise<void>;
  createExpense: (expense: ICreateExpense) => Promise<void>;
  updateExpense: (id: number, expense: IUpdateExpense) => Promise<void>;
}

const DEFAULT_EXPENSES: IExpense[] = [];
const STORE_NAME = "expenses";

export const useExpenseStore = create<StoreState>(
  persist(
    (set, get) => ({
      expenses: DEFAULT_EXPENSES,
      setExpenses: (expenses: IExpense[]) => set({ expenses }),
      getAllExpenses: async () => {
        const expenses =
          await ExpenseDatasourceImpl.getInstance().getExpenses("1");

        set({ expenses });
      },
      deleteExpense: async (id: number) => {
        const isDeleted =
          await ExpenseDatasourceImpl.getInstance().deleteExpense(id);

        if (isDeleted) {
          get().getAllExpenses();
        }
      },
      createExpense: async (expense: ICreateExpense) => {
        await ExpenseDatasourceImpl.getInstance().createExpense(expense);
      },
      updateExpense: async (id: number, expense: IUpdateExpense) => {
        await ExpenseDatasourceImpl.getInstance().updateExpense(id, expense);
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
);
