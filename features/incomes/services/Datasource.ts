import {
  ICreateIncome,
  IIncome,
  ITotalIncome,
  IUpdateIncome,
} from "../models/IIncome";

import { AxiosClient } from "@/core/infraestructure/http/AxiosClient";
import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { UseAccountStore } from "@/features/auth/context/useUserStore";
import { API_ROUTES } from "@/shared/api-routes/api-routes";

interface IncomeDatasource {
  getIncomes(): Promise<IIncome[]>;
  getTotalIncomes(
    userId: string,
    year: string,
    month: string,
  ): Promise<ITotalIncome>;
  createIncome(income: ICreateIncome): Promise<IIncome>;
  updateIncome(id: number, income: IUpdateIncome): Promise<IIncome>;
  deleteIncome(incomeId: number): Promise<boolean>;
}

export class IncomeDatasourceImpl implements IncomeDatasource {
  private httplClient: HttpHandler;

  constructor() {
    this.httplClient = AxiosClient.getInstance();
  }

  static getInstance(): IncomeDatasource {
    return new IncomeDatasourceImpl();
  }

  async getIncomes(): Promise<IIncome[]> {
    const userId = UseAccountStore.getState().user?.id.toString();

    if (!userId) {
      throw new Error("User not found");
    }

    const data = await this.httplClient.get<IIncome[]>(
      API_ROUTES.INCOMES.GET_ALL(userId),
    );

    return data;
  }

  async getTotalIncomes(
    userId: string,
    year: string,
    month: string,
  ): Promise<ITotalIncome> {
    const data = await this.httplClient.get<ITotalIncome>(
      API_ROUTES.INCOMES.GET_INCOMES(userId, year, month),
    );

    return data;
  }

  async createIncome(income: ICreateIncome): Promise<IIncome> {
    const data = await this.httplClient.post<IIncome>(
      API_ROUTES.INCOMES.CREATE,
      income,
    );

    return data;
  }

  async updateIncome(id: number, income: IUpdateIncome): Promise<IIncome> {
    const data = await this.httplClient.put<IIncome>(
      API_ROUTES.INCOMES.UPDATE(id),
      income,
    );

    return data;
  }

  async deleteIncome(incomeId: number): Promise<boolean> {
    return await this.httplClient.delete(API_ROUTES.INCOMES.DELETE(incomeId));
  }
}
