import {
  ICreateExpense,
  IExpense,
  IExpenseCategoryReport,
  ITotalExpense,
  IUpdateExpense,
} from "../models/IExpense";

import { AxiosClient } from "@/core/infraestructure/http/AxiosClient";
import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { UseAccountStore } from "@/features/auth/context/useUserStore";
import { API_ROUTES } from "@/shared/api-routes/api-routes";

interface ExpenseDatasource {
  getExpenses(): Promise<IExpense[]>;
  getTotalExpenses(
    userId: string,
    year: string,
    month: string,
  ): Promise<ITotalExpense>;
  createExpense(expense: ICreateExpense): Promise<IExpense>;
  updateExpense(id: number, expense: IUpdateExpense): Promise<IExpense>;
  deleteExpense(expenseId: number): Promise<boolean>;
  getExpenseById(
    userId: string,
    year: string,
    month: string,
  ): Promise<IExpenseCategoryReport[]>;
}

export class ExpenseDatasourceImpl implements ExpenseDatasource {
  private httpClient: HttpHandler;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  static getInstance(): ExpenseDatasource {
    return new ExpenseDatasourceImpl();
  }

  async getExpenses(): Promise<IExpense[]> {
    const userId = UseAccountStore.getState().user?.id.toString();

    if (!userId) {
      throw new Error("User not found");
    }

    const data = await this.httpClient.get<IExpense[]>(
      API_ROUTES.EXPENSES.GET_ALL(userId),
    );

    return data;
  }
  async getTotalExpenses(
    userId: string,
    year: string,
    month: string,
  ): Promise<ITotalExpense> {
    const data = await this.httpClient.get<ITotalExpense>(
      API_ROUTES.EXPENSES.GET_EXPENSES(userId, year, month),
    );

    return data;
  }

  async createExpense(expense: ICreateExpense): Promise<IExpense> {
    const data = await this.httpClient.post<IExpense>(
      API_ROUTES.EXPENSES.CREATE,
      expense,
    );

    return data;
  }

  async updateExpense(id: number, expense: IUpdateExpense): Promise<IExpense> {
    const data = await this.httpClient.patch<IExpense>(
      API_ROUTES.EXPENSES.UPDATE(id),
      expense,
    );

    return data;
  }

  async deleteExpense(expenseId: number): Promise<boolean> {
    return await this.httpClient.delete(API_ROUTES.EXPENSES.DELETE(expenseId));
  }

  async getExpenseById(
    userId: string,
    year: string,
    month: string,
  ): Promise<IExpenseCategoryReport[]> {
    const data = await this.httpClient.get<IExpenseCategoryReport[]>(
      API_ROUTES.REPORTS.GET_CATEGORY_REPORT_EXPENSE(userId, year, month),
    );

    return data;
  }
}
