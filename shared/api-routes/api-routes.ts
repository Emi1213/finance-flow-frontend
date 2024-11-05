export const ACCESS_TOKEN_COOKIE_NAME = "access_token";

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/signup",
  },
  EXPENSES: {
    GET_ALL: (userId: string) => `/expenses/${userId}`,
    GET_EXPENSES: (userId: string, year: string, month: string) =>
      `/expenses/${userId}/${year}/${month}`,
    CREATE: "/expenses",
    DELETE: (id: number) => `/expenses/${id}`,
    UPDATE: (id: number) => `/expenses/${id}`,
  },
  INCOMES: {
    GET_ALL: (userId: string) => `/incomes/${userId}`,
    GET_INCOMES: (userId: string, year: string, month: string) =>
      `/incomes/${userId}/${year}/${month}`,
    CREATE: "/incomes",
    DELETE: (id: number) => `/incomes/${id}`,
    UPDATE: (id: number) => `/incomes/${id}`,
  },
  EXPENSE_TYPES: {
    GET_ALL: (userId: string) => `/type/expense/${userId}`,
    CREATE: "/expense-types",
  },
  INCOME_TYPES: {
    GET_ALL: (userId: string) => `/type/income/${userId}`,
    CREATE: "/income-types",
  },
  TOTAL: {
    GET_TOTAL: (userId: string, year: string, month: string) =>
      `/total/${userId}/${year}/${month}`,
  },
  REPORTS: {
    GET_CATEGORY_REPORT_INCOME: (userId: string, year: string, month: string) =>
      `/incomes/report/${userId}/${year}/${month}`,
    GET_CATEGORY_REPORT_EXPENSE: (
      userId: string,
      year: string,
      month: string,
    ) => `/expenses/report/${userId}/${year}/${month}`,
  },
  GOALS: {
    GET_ALL: (userId: string) => `/goals/${userId}`,
    CREATE: "/goals",
    DELETE: (id: number) => `/goals/${id}`,
    UPDATE: (id: number) => `/goals/${id}`,
  },
};
