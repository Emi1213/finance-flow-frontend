import { GoalDatasourceImpl } from "../Datasource";
import { API_ROUTES } from "@/shared/api-routes/api-routes";
import { ICreateGoal, IGoal, IUpdateGoal } from "../../models/IGoal";

// Mock del store UseAccountStore
jest.mock("@/features/auth/context/useUserStore", () => ({
  UseAccountStore: {
    getState: () => ({
      user: { id: 1 },
    }),
  },
}));

// Mock del cliente AxiosClient
const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPatch = jest.fn();
const mockDelete = jest.fn();

jest.mock("@/core/infraestructure/http/AxiosClient", () => ({
  AxiosClient: {
    getInstance: () => ({
      get: mockGet,
      post: mockPost,
      patch: mockPatch,
      delete: mockDelete,
    }),
  },
}));

describe("GoalDatasourceImpl", () => {
  const goalDataSource = GoalDatasourceImpl.getInstance();

  it("getGoal debería retornar metas", async () => {
    const mockGoals: IGoal[] = [
      {
        id: 1,
        value: 100,
        percentaje: 50,
        status: true,
        date: new Date(),
        userId: 1,
      },
    ];
    mockGet.mockResolvedValue(mockGoals);

    const result = await goalDataSource.getGoal();

    expect(mockGet).toHaveBeenCalledWith(API_ROUTES.GOALS.GET_ALL("1"));
    expect(result).toEqual(mockGoals);
  });

  it("createGoal debería llamar a POST con los datos correctos", async () => {
    const goal: ICreateGoal = {
      value: 200,
      percentaje: 70,
      status: true,
      date: new Date(),
      userId: 1,
    };

    const mockGoalResponse: IGoal = { ...goal, id: 2 };
    mockPost.mockResolvedValue(mockGoalResponse);

    const result = await goalDataSource.createGoal(goal);

    expect(mockPost).toHaveBeenCalledWith(API_ROUTES.GOALS.CREATE, goal);
    expect(result).toEqual(mockGoalResponse);
  });

  it("updateGoal debería llamar a PATCH con los datos correctos", async () => {
    const updateGoal: IUpdateGoal = {
      value: 300,
      percentaje: 80,
      status: false,
      date: new Date(),
      userId: 1,
    };
    const mockUpdated: IGoal = { ...updateGoal, id: 3 } as IGoal;
    mockPatch.mockResolvedValue(mockUpdated);

    const result = await goalDataSource.updateGoal(3, updateGoal);

    expect(mockPatch).toHaveBeenCalledWith(API_ROUTES.GOALS.UPDATE(3), updateGoal);
    expect(result).toEqual(mockUpdated);
  });

  it("deleteGoal debería llamar a DELETE con el ID correcto", async () => {
    mockDelete.mockResolvedValue(true);

    const result = await goalDataSource.deleteGoal(4);

    expect(mockDelete).toHaveBeenCalledWith(API_ROUTES.GOALS.DELETE(4));
    expect(result).toBe(true);
  });
});
