import { createJSONStorage, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";

import { IIncome } from "../models/IIncome";
import { IncomeDatasourceImpl } from "../services/Datasource";

interface StoreState {
  incomes: IIncome[];
  setIncomes: (incomes: IIncome[]) => void;
  getAllIncomes: (userId: string) => Promise<void>;
}

const DEFAULT_INCOMES: IIncome[] = [];

const STORE_NAME = "incomes";

export const useIncomeStore = create<StoreState>(
  persist(
    (set) => ({
      incomes: DEFAULT_INCOMES,
      setIncomes: (incomes: IIncome[]) => set({ incomes }),
      getAllIncomes: async (userId: string) => {
        const incomes =
          await IncomeDatasourceImpl.getInstance().getIncomes(userId);

        set({ incomes });
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
);
