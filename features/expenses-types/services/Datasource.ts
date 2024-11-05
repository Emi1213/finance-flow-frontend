import { ICreateExpenseType, IExpenseType } from "../models/IExpenseType";
import { HttpHandler } from "../../../core/interfaces/HttpHandler";

import { AxiosClient } from "@/core/infraestructure/http/AxiosClient";
import { API_ROUTES } from "@/shared/api-routes/api-routes";

interface ExpenseTypeDatasource {
  getExpenseTypes(userId: string): Promise<IExpenseType[]>;
  createExpenseType(expenseType: ICreateExpenseType): Promise<IExpenseType>;
}

export class ExpenseTypeDatasourceImpl implements ExpenseTypeDatasource {
  private httpClient: HttpHandler;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }
  static getInstance(): ExpenseTypeDatasource {
    return new ExpenseTypeDatasourceImpl();
  }

  async getExpenseTypes(userId: string): Promise<IExpenseType[]> {
    const data = await this.httpClient.get<IExpenseType[]>(
      API_ROUTES.EXPENSE_TYPES.GET_ALL(userId),
    );

    return data;
  }

  async createExpenseType(
    expenseType: ICreateExpenseType,
  ): Promise<IExpenseType> {
    const data = await this.httpClient.post<IExpenseType>(
      API_ROUTES.EXPENSE_TYPES.CREATE,
      expenseType,
    );

    return data;
  }
}
