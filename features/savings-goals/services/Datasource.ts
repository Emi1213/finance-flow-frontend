import { ICreateGoal, IGoal, IUpdateGoal } from "../models/IGoal";

import { AxiosClient } from "@/core/infraestructure/http/AxiosClient";
import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { UseAccountStore } from "@/features/auth/context/useUserStore";
import { API_ROUTES } from "@/shared/api-routes/api-routes";

interface GoalDatasource {
  getGoal(): Promise<IGoal[]>;
  createGoal(expense: ICreateGoal): Promise<IGoal>;
  updateGoal(id: number, expense: IUpdateGoal): Promise<IGoal>;
  deleteGoal(goalId: number): Promise<boolean>;
}

export class GoalDatasourceImpl implements GoalDatasource {
  private httpClient: HttpHandler;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  static getInstance(): GoalDatasource {
    return new GoalDatasourceImpl();
  }

  async getGoal(): Promise<IGoal[]> {
    const userId = UseAccountStore.getState().user?.id.toString();

    if (!userId) {
      throw new Error("User not found");
    }

    const data = await this.httpClient.get<IGoal[]>(
      API_ROUTES.GOALS.GET_ALL(userId),
    );

    return data;
  }

  async createGoal(goal: ICreateGoal): Promise<IGoal> {
    const data = await this.httpClient.post<IGoal>(
      API_ROUTES.GOALS.CREATE,
      goal,
    );

    return data;
  }

  async updateGoal(id: number, goal: IUpdateGoal): Promise<IGoal> {
    const data = await this.httpClient.patch<IGoal>(
      API_ROUTES.GOALS.UPDATE(id),
      goal,
    );

    return data;
  }

  async deleteGoal(expenseId: number): Promise<boolean> {
    return await this.httpClient.delete(API_ROUTES.GOALS.DELETE(expenseId));
  }
}
