export const ACCESS_TOKEN_COOKIE_NAME = "access_token";

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
  EXPENSES: {
    GET_ALL: (userId: string) => `/expenses/${userId}`,
    GET_EXPENSES: (userId: string, year: string, month: string) =>
      `/expenses/${userId}/${year}/${month}`,
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: "/expenses",
    UPDATE_EXPENSE: "/expenses",
  },
  INCOMES: {
    GET_INCOMES: (userId: string, year: string, month: string) =>
      `/incomes/${userId}/${year}/${month}`,
    ADD_INCOME: "/incomes",
    DELETE_INCOME: "/incomes",
    UPDATE_INCOME: "/incomes",
  },
  TOTAL: {
    GET_TOTAL: (userId: string, year: string, month: string) =>
      `/total/${userId}/${year}/${month}`,
  },
};
