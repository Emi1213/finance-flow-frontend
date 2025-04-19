import { act } from "react-dom/test-utils";
import { useGoalStore } from "../../context/useGoalStore";
import { GoalDatasourceImpl } from "../../services/Datasource";
import { ICreateGoal, IGoal, IUpdateGoal } from "../../models/IGoal";

// Mock del Datasource
jest.mock("../../services/Datasource", () => ({
  GoalDatasourceImpl: {
    getInstance: jest.fn(() => ({
      getGoal: jest.fn(),
      createGoal: jest.fn(),
      updateGoal: jest.fn(),
      deleteGoal: jest.fn(),
    })),
  },
}));

describe("useGoalStore", () => {
  const mockGoals: IGoal[] = [
    {
      id: 1,
      value: 1000,
      percentaje: 75,
      status: true,
      date: new Date("2025-01-01"),
      userId: 1,
    },
  ];

  const mockCreate: ICreateGoal = {
    value: 1500,
    percentaje: 0,
    status: false,
    date: new Date("2025-04-18"),
    userId: 1,
  };

  const mockUpdate: IUpdateGoal = {
    value: 2000,
    percentaje: 50,
  };

  beforeEach(() => {
    useGoalStore.setState({ goals: [] });
    jest.clearAllMocks();
  });

  it("should fetch and set goals", async () => {
    const mockGetGoal = jest.fn().mockResolvedValue(mockGoals);

    (GoalDatasourceImpl.getInstance as jest.Mock).mockReturnValue({
      getGoal: mockGetGoal,
      createGoal: jest.fn(),
      updateGoal: jest.fn(),
      deleteGoal: jest.fn(),
    });

    await act(async () => {
      await useGoalStore.getState().getAllGoals();
    });

    expect(mockGetGoal).toHaveBeenCalled();
    expect(useGoalStore.getState().goals).toEqual(mockGoals);
  });

  it("should create a goal", async () => {
    const mockCreateGoal = jest.fn().mockResolvedValue(undefined);

    (GoalDatasourceImpl.getInstance as jest.Mock).mockReturnValue({
      getGoal: jest.fn(),
      createGoal: mockCreateGoal,
      updateGoal: jest.fn(),
      deleteGoal: jest.fn(),
    });

    await act(async () => {
      await useGoalStore.getState().createGoal(mockCreate);
    });

    expect(mockCreateGoal).toHaveBeenCalledWith(mockCreate);
  });

  it("should update a goal", async () => {
    const mockUpdateGoal = jest.fn().mockResolvedValue(undefined);

    (GoalDatasourceImpl.getInstance as jest.Mock).mockReturnValue({
      getGoal: jest.fn(),
      createGoal: jest.fn(),
      updateGoal: mockUpdateGoal,
      deleteGoal: jest.fn(),
    });

    await act(async () => {
      await useGoalStore.getState().updateGoal(1, mockUpdate);
    });

    expect(mockUpdateGoal).toHaveBeenCalledWith(1, mockUpdate);
  });

  it("should delete a goal and refresh", async () => {
    const mockDeleteGoal = jest.fn().mockResolvedValue(true);
    const mockGetGoal = jest.fn().mockResolvedValue(mockGoals);

    (GoalDatasourceImpl.getInstance as jest.Mock).mockReturnValue({
      getGoal: mockGetGoal,
      createGoal: jest.fn(),
      updateGoal: jest.fn(),
      deleteGoal: mockDeleteGoal,
    });

    await act(async () => {
      await useGoalStore.getState().deleteGoal(1);
    });

    expect(mockDeleteGoal).toHaveBeenCalledWith(1);
    expect(mockGetGoal).toHaveBeenCalled(); // se vuelve a cargar la lista
  });
});
