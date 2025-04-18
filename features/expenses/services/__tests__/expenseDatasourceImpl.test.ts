import { ExpenseDatasourceImpl } from "../../services/Datasource";
import { API_ROUTES } from "@/shared/api-routes/api-routes";
import { UseAccountStore } from "@/features/auth/context/useUserStore";

// Mock de las funciones de HTTP
const getMock = jest.fn();
const postMock = jest.fn();
const patchMock = jest.fn();
const deleteMock = jest.fn();

// Mock de AxiosClient
jest.mock("@/core/infraestructure/http/AxiosClient", () => ({
  AxiosClient: {
    getInstance: () => ({
      get: getMock,
      post: postMock,
      patch: patchMock,
      delete: deleteMock,
    }),
  },
}));

// Mock del store de usuario
jest.mock("@/features/auth/context/useUserStore", () => ({
  UseAccountStore: {
    getState: () => ({
      user: { id: "1" }, // Usuario con ID "1"
    }),
  },
}));

describe("ExpenseDatasourceImpl", () => {
  const service = ExpenseDatasourceImpl.getInstance();

  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar mocks antes de cada test
  });

  it("debe obtener los gastos del usuario", async () => {
    const mockExpenses = [{ id: 1, description: "Comida", value: 100 }];
    getMock.mockResolvedValue(mockExpenses);

    const result = await service.getExpenses();

    expect(getMock).toHaveBeenCalledWith(API_ROUTES.EXPENSES.GET_ALL("1"));
    expect(result).toEqual(mockExpenses);
  });

  it("debe obtener el total de los gastos del usuario", async () => {
    const mockTotalExpense = { total: 1000, month: "04", year: "2025" };
    getMock.mockResolvedValue(mockTotalExpense);

    const result = await service.getTotalExpenses("1", "2025", "04");

    expect(getMock).toHaveBeenCalledWith(API_ROUTES.EXPENSES.GET_EXPENSES("1", "2025", "04"));
    expect(result).toEqual(mockTotalExpense);
  });


  it("debe actualizar un gasto", async () => {
    const mockUpdatedExpense = { description: "Gasto actualizado", value: 300 };
    patchMock.mockResolvedValue(mockUpdatedExpense);

    const result = await service.updateExpense(1, mockUpdatedExpense);

    expect(patchMock).toHaveBeenCalledWith(API_ROUTES.EXPENSES.UPDATE(1), mockUpdatedExpense);
    expect(result).toEqual(mockUpdatedExpense);
  });

  it("debe eliminar un gasto", async () => {
    deleteMock.mockResolvedValue(true);

    const result = await service.deleteExpense(1);

    expect(deleteMock).toHaveBeenCalledWith(API_ROUTES.EXPENSES.DELETE(1));
    expect(result).toBe(true);
  });

  it("debe obtener el reporte de gastos por categoría", async () => {
    const mockCategoryReport = [{ category: "Alimentos", total: 100 }];
    getMock.mockResolvedValue(mockCategoryReport);

    const result = await service.getExpenseById("1", "2025", "04");

    expect(getMock).toHaveBeenCalledWith(API_ROUTES.REPORTS.GET_CATEGORY_REPORT_EXPENSE("1", "2025", "04"));
    expect(result).toEqual(mockCategoryReport);
  });
});
