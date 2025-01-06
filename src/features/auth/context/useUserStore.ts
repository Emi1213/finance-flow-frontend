import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import toast from "react-hot-toast";

import { IAuth, IUser } from "../models/IUser";
import { UserDatasourceImpl } from "../services/Datasource";
import { ISignUp } from "../models/ISignUp";

import { deleteCookie } from "@/core/utils/CookiesUtil";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/shared/api-routes/api-routes";

interface StoreState {
  user: IUser | undefined;
  loading: boolean;
  login: (credentials: IAuth) => void;
  setUser: (user?: IUser) => void;
  signUp: (credentials: ISignUp) => void;
  logout: () => void;
}

export const DEFAULT_USER: IUser | undefined = undefined;

const STORE_NAME = "user";

export const UseAccountStore = create<StoreState>(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      loading: true,
      login: async (credentials: IAuth) => {
        const user = await UserDatasourceImpl.getInstance().login(credentials);

        if (!user || !user.id) {
          toast.error("Algo salió mal, por favor intente nuevamente.");

          return;
        }
        toast.success(`Bienvenid@ ${user.name}!`);
        set({ user });
      },

      setUser: (user?: IUser | undefined) => {
        if (!user) {
          set({ user: undefined, loading: false });

          return;
        }
        set({ user, loading: false });
      },
      logout: async () => {
        await deleteCookie(ACCESS_TOKEN_COOKIE_NAME);
        toast.success(`Hasta luego ${get().user?.name as string}!`);
        set({ user: DEFAULT_USER, loading: false });
      },
      signUp: async (credentials: ISignUp) => {
        const user =
          await UserDatasourceImpl.getInstance().register(credentials);

        if (!user || !user.id) {
          toast.error("Algo salió mal, por favor intente nuevamente.");

          return;
        }
        toast.success(`Bienvenid@ ${user.name}!`);
        set({ user });
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
);
