import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ICreateIncomeType, IIncomeType } from "../models/IIncomeType";
import { IncomeTypeDatasourceImpl } from "../services/Datasource";

interface StoreState {
  types: IIncomeType[];
  setTypes: (types: IIncomeType[]) => void;
  getAllTypes: () => Promise<void>;
  addType: (type: ICreateIncomeType) => Promise<void>;
}

const DEFAULT_TYPES: IIncomeType[] = [];
const STORE_NAME = "incomes-types";

export const useIncomeTypeStore = create<StoreState>(
  persist(
    (set) => ({
      types: DEFAULT_TYPES,
      setTypes: (types: IIncomeType[]) => set({ types }),
      getAllTypes: async () => {
        const types =
          await IncomeTypeDatasourceImpl.getInstance().getIncomeTypes("1");

        set({ types });
      },
      addType: async (type: ICreateIncomeType) => {
        await IncomeTypeDatasourceImpl.getInstance().createIncomeType(type);
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
);
