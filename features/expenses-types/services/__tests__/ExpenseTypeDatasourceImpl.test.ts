import { ExpenseTypeDatasourceImpl } from "../../services/Datasource";
import { API_ROUTES } from "@/shared/api-routes/api-routes";
import { ICreateExpenseType, IExpenseType } from "../../models/IExpenseType";

// Mock AxiosClient
jest.mock("@/core/infraestructure/http/AxiosClient", () => ({
  AxiosClient: {
    getInstance: jest.fn(),
  },
}));

describe("ExpenseTypeDatasourceImpl", () => {
  const mockHttpClient = {
    get: jest.fn(),
    post: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Forzar que AxiosClient.getInstance() retorne el mockHttpClient
    const { AxiosClient } = require("@/core/infraestructure/http/AxiosClient");
    AxiosClient.getInstance.mockReturnValue(mockHttpClient);
  });

  it("should fetch expense types", async () => {
    const userId = "1";
    const mockResponse: IExpenseType[] = [
      { id: 1, name: "Renta", isGlobal: false, userId: 1 },
    ];

    mockHttpClient.get.mockResolvedValue(mockResponse);

    const datasource = new ExpenseTypeDatasourceImpl();
    const result = await datasource.getExpenseTypes(userId);

    expect(mockHttpClient.get).toHaveBeenCalledWith(API_ROUTES.EXPENSE_TYPES.GET_ALL(userId));
    expect(result).toEqual(mockResponse);
  });

  it("should create a new expense type", async () => {
    const newType: ICreateExpenseType = {
      name: "Servicios",
      isGlobal: false,
      userId: 1,
    };

    const createdType: IExpenseType = {
      id: 2,
      name: "Servicios",
      isGlobal: false,
      userId: 1,
    };

    mockHttpClient.post.mockResolvedValue(createdType);

    const datasource = new ExpenseTypeDatasourceImpl();
    const result = await datasource.createExpenseType(newType);

    expect(mockHttpClient.post).toHaveBeenCalledWith(API_ROUTES.EXPENSE_TYPES.CREATE, newType);
    expect(result).toEqual(createdType);
  });
});
