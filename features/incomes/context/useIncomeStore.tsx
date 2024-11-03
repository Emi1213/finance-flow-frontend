import { createJSONStorage, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";

import { ICreateIncome, IIncome, IUpdateIncome } from "../models/IIncome";
import { IncomeDatasourceImpl } from "../services/Datasource";

interface StoreState {
  incomes: IIncome[];
  setIncomes: (incomes: IIncome[]) => void;
  getAllIncomes: () => Promise<void>;
  deleteIncome: (id: number) => Promise<void>;
  createIncome: (income: ICreateIncome) => Promise<void>;
  updateIncome: (id: number, income: IUpdateIncome) => Promise<void>;
}

const DEFAULT_INCOMES: IIncome[] = [];

const STORE_NAME = "incomes";

export const useIncomeStore = create<StoreState>(
  persist(
    (set, get) => ({
      incomes: DEFAULT_INCOMES,
      setIncomes: (incomes: IIncome[]) => set({ incomes }),
      getAllIncomes: async () => {
        const incomes = await IncomeDatasourceImpl.getInstance().getIncomes();

        set({ incomes });
      },
      deleteIncome: async (id: number) => {
        const isDeleted =
          await IncomeDatasourceImpl.getInstance().deleteIncome(id);

        if (isDeleted) {
          get().getAllIncomes();
        }
      },
      createIncome: async (income: ICreateIncome) => {
        await IncomeDatasourceImpl.getInstance().createIncome(income);
      },
      updateIncome: async (id: number, income: IUpdateIncome) => {
        await IncomeDatasourceImpl.getInstance().updateIncome(id, income);
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
);
