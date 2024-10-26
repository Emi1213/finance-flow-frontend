import { IExpense, ITotalExpense } from "../models/IExpense";

import { AxiosClient } from "@/core/infraestructure/http/AxiosClient";
import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { API_ROUTES } from "@/shared/api-routes/api-routes";

interface ExpenseDatasource {
  getExpenses(userId: string): Promise<IExpense[]>;
  getTotalExpenses(
    userId: string,
    year: string,
    month: string,
  ): Promise<ITotalExpense>;
  createExpense(expense: IExpense): Promise<IExpense>;
  updateExpense(expense: IExpense): Promise<IExpense>;
  deleteExpense(expenseId: number): Promise<void>;
}

export class ExpenseDatasourceImpl implements ExpenseDatasource {
  private httpClient: HttpHandler;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  static getInstance(): ExpenseDatasource {
    return new ExpenseDatasourceImpl();
  }

  async getExpenses(userId: string): Promise<IExpense[]> {
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

  async createExpense(expense: IExpense): Promise<IExpense> {
    throw new Error("Method not implemented.");
  }

  async updateExpense(expense: IExpense): Promise<IExpense> {
    throw new Error("Method not implemented.");
  }

  async deleteExpense(expenseId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
