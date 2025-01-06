import { ICreateIncomeType, IIncomeType } from "../models/IIncomeType";
import { HttpHandler } from "../../../core/interfaces/HttpHandler";

import { AxiosClient } from "@/core/infraestructure/http/AxiosClient";
import { API_ROUTES } from "@/shared/api-routes/api-routes";

interface IncomeTypeDatasource {
  getIncomeTypes(userId: string): Promise<IIncomeType[]>;
  createIncomeType(incomeType: ICreateIncomeType): Promise<IIncomeType>;
}

export class IncomeTypeDatasourceImpl implements IncomeTypeDatasource {
  private httpClient: HttpHandler;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }
  static getInstance(): IncomeTypeDatasource {
    return new IncomeTypeDatasourceImpl();
  }

  async getIncomeTypes(userId: string): Promise<IIncomeType[]> {
    const data = await this.httpClient.get<IIncomeType[]>(
      API_ROUTES.INCOME_TYPES.GET_ALL(userId),
    );

    return data;
  }

  async createIncomeType(incomeType: ICreateIncomeType): Promise<IIncomeType> {
    const data = await this.httpClient.post<IIncomeType>(
      API_ROUTES.INCOME_TYPES.CREATE,
      incomeType,
    );

    return data;
  }
}
