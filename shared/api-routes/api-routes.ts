export const ACCESS_TOKEN_COOKIE_NAME = "access_token";

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
  EXPENSES: {
    GET_EXPENSES: (userId: number, year: number, month: number) =>
      `/expenses/${userId}/${year}/${month}`,
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: "/expenses",
    UPDATE_EXPENSE: "/expenses",
  },
  INCOMES: {
    GET_INCOMES: (userId: number, year: number, month: number) =>
      `/incomes/${userId}/${year}/${month}`,
    ADD_INCOME: "/incomes",
    DELETE_INCOME: "/incomes",
    UPDATE_INCOME: "/incomes",
  },
  TOTAL: {
    GET_TOTAL: (userId: number, year: number, month: number) =>
      `/total/${userId}/${year}/${month}`,
  },
};
