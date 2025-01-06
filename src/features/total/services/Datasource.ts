import { ITotal } from "../models/ITotal";

import { API_ROUTES } from "@/shared/api-routes/api-routes";
import { AxiosClient } from "@/core/infraestructure/http/AxiosClient";
import { HttpHandler } from "@/core/interfaces/HttpHandler";

interface TotalDatasource {
  getTotal(userId: string, year: string, month: string): Promise<ITotal>;
}

export class TotalDatasourceImpl implements TotalDatasource {
  private httplClient: HttpHandler;

  constructor() {
    this.httplClient = AxiosClient.getInstance();
  }

  static getInstance(): TotalDatasource {
    return new TotalDatasourceImpl();
  }

  async getTotal(userId: string, year: string, month: string): Promise<ITotal> {
    const data = await this.httplClient.get<ITotal>(
      API_ROUTES.TOTAL.GET_TOTAL(userId, year, month),
    );

    return data;
  }
}
