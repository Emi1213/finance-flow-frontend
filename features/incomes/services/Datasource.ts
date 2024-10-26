import { IIncome, ITotalIncome } from "../models/IIncome";

import { AxiosClient } from "@/core/infraestructure/http/AxiosClient";
import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { API_ROUTES } from "@/shared/api-routes/api-routes";

interface IncomeDatasource {
  getIncomes(userId: string): Promise<IIncome[]>;
  getTotalIncomes(
    userId: string,
    year: string,
    month: string,
  ): Promise<ITotalIncome>;
  createIncome(income: IIncome): Promise<IIncome>;
  updateIncome(income: IIncome): Promise<IIncome>;
  deleteIncome(incomeId: number): Promise<void>;
}

export class IncomeDatasourceImpl implements IncomeDatasource {
  private httplClient: HttpHandler;

  constructor() {
    this.httplClient = AxiosClient.getInstance();
  }

  static getInstance(): IncomeDatasource {
    return new IncomeDatasourceImpl();
  }

  getIncomes(userId: string): Promise<IIncome[]> {
    throw new Error("Method not implemented.");
  }
  getTotalIncomes(
    userId: string,
    year: string,
    month: string,
  ): Promise<ITotalIncome> {
    const data = this.httplClient.get<ITotalIncome>(
      API_ROUTES.INCOMES.GET_INCOMES(userId, year, month),
    );

    return data;
  }
  createIncome(income: IIncome): Promise<IIncome> {
    throw new Error("Method not implemented.");
  }
  updateIncome(income: IIncome): Promise<IIncome> {
    throw new Error("Method not implemented.");
  }
  deleteIncome(incomeId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
