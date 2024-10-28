import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ICreateExpenseType, IExpenseType } from "../models/IExpenseType";
import { ExpenseTypeDatasourceImpl } from "../services/Datasource";

interface StoreState {
  types: IExpenseType[];
  setTypes: (types: IExpenseType[]) => void;
  getAllTypes: (userId: string) => Promise<void>;
  addType: (type: ICreateExpenseType) => Promise<void>;
}

const DEFAULT_TYPES: IExpenseType[] = [];
const STORE_NAME = "expense-types";

export const useExpenseTypeStore = create<StoreState>(
  persist(
    (set) => ({
      types: DEFAULT_TYPES,
      setTypes: (types: IExpenseType[]) => set({ types }),
      getAllTypes: async (userId: string) => {
        const types =
          await ExpenseTypeDatasourceImpl.getInstance().getExpenseTypes(userId);

        set({ types });
      },
      addType: async (type: ICreateExpenseType) => {
        await ExpenseTypeDatasourceImpl.getInstance().createExpenseType(type);
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
);
