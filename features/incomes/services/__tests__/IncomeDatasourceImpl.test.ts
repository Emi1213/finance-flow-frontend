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

  it("debe eliminar un ingreso", async () => {
    deleteMock.mockResolvedValue(true);

    const result = await service.deleteIncome(5);

    expect(deleteMock).toHaveBeenCalledWith(API_ROUTES.INCOMES.DELETE(5));
    expect(result).toBe(true);
  });
});
