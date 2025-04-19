import { IncomeDatasourceImpl } from "../Datasource";
import { API_ROUTES } from "@/shared/api-routes/api-routes";
import { UseAccountStore } from "@/features/auth/context/useUserStore";

// Mock del cliente HTTP
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
      user: { id: 1 },
    }),
  },
}));

describe("IncomeDatasourceImpl", () => {
  const service = IncomeDatasourceImpl.getInstance();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe obtener ingresos del usuario", async () => {
    const mockData = [{ id: 1, description: "Salario", value: 1000 }];
    getMock.mockResolvedValue(mockData);

    const result = await service.getIncomes();

    expect(getMock).toHaveBeenCalledWith(API_ROUTES.INCOMES.GET_ALL("1"));
    expect(result).toEqual(mockData);
  });


  it("debe crear un ingreso", async () => {
    const mockIncome = { description: "Extra", value: 200, date: new Date(), status: true, typeId: 1, observation: "", userId: 1 };
    postMock.mockResolvedValue(mockIncome);

    const result = await service.createIncome(mockIncome);

    expect(postMock).toHaveBeenCalledWith(API_ROUTES.INCOMES.CREATE, mockIncome);
    expect(result).toEqual(mockIncome);
  });

  it("debe actualizar un ingreso", async () => {
    const mockIncome = { description: "Actualización", value: 300 };
    const updatedIncome = { id: 1, description: "Actualización", value: 300 };
    patchMock.mockResolvedValue(updatedIncome);

    const result = await service.updateIncome(1, mockIncome);

    expect(patchMock).toHaveBeenCalledWith(API_ROUTES.INCOMES.UPDATE(1), mockIncome);
    expect(result).toEqual(updatedIncome);
  });

  it("debe eliminar un ingreso", async () => {
    deleteMock.mockResolvedValue(true);

    const result = await service.deleteIncome(5);

    expect(deleteMock).toHaveBeenCalledWith(API_ROUTES.INCOMES.DELETE(5));
    expect(result).toBe(true);
  });

  it("debe obtener un reporte de ingresos por categoría", async () => {
    const mockReport = [{ category: "Salario", total: 1000 }];
    getMock.mockResolvedValue(mockReport);

    const result = await service.getIncomeById("1", "2025", "04");

    expect(getMock).toHaveBeenCalledWith(API_ROUTES.REPORTS.GET_CATEGORY_REPORT_INCOME("1", "2025", "04"));
    expect(result).toEqual(mockReport);
  });

  it("debe manejar errores al obtener reporte de ingresos por categoría", async () => {
    getMock.mockRejectedValueOnce(new Error("API Error"));

    await expect(service.getIncomeById("1", "2025", "04")).rejects.toThrowError("API Error");
  });

  it("debe obtener el total de ingresos", async () => {
    const totalIncome = { total: 5000 };
    getMock.mockResolvedValue(totalIncome);

    const result = await service.getTotalIncomes("1", "2025", "04");

    expect(getMock).toHaveBeenCalledWith(API_ROUTES.INCOMES.GET_INCOMES("1", "2025", "04"));
    expect(result).toEqual(totalIncome);
  });

  it("debe manejar errores al obtener el total de ingresos", async () => {
    getMock.mockRejectedValueOnce(new Error("API Error"));

    await expect(service.getTotalIncomes("1", "2025", "04")).rejects.toThrowError("API Error");
  });
});
