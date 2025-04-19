import { IncomeTypeDatasourceImpl } from "../../services/Datasource";
import { API_ROUTES } from "@/shared/api-routes/api-routes";
import { IIncomeType, ICreateIncomeType } from "../../models/IIncomeType";

// Mock de AxiosClient
jest.mock("@/core/infraestructure/http/AxiosClient", () => ({
  AxiosClient: {
    getInstance: jest.fn(() => mockHttpClient),
  },
}));

const mockHttpClient = {
  get: jest.fn(),
  post: jest.fn(),
};

describe("IncomeTypeDatasourceImpl", () => {
  const datasource = IncomeTypeDatasourceImpl.getInstance();

  const mockIncomeTypes: IIncomeType[] = [
    { id: 1, name: "Salario", isGlobal: false, userId: 1 },
  ];

  const mockNewType: ICreateIncomeType = {
    name: "Freelance",
    isGlobal: false,
    userId: 1,
  };

  const mockCreatedType: IIncomeType = {
    id: 2,
    ...mockNewType,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debería obtener los tipos de ingresos utilizando el punto final correcto", async () => {
    mockHttpClient.get.mockResolvedValue(mockIncomeTypes);

    const result = await datasource.getIncomeTypes("1");

    expect(mockHttpClient.get).toHaveBeenCalledWith(API_ROUTES.INCOME_TYPES.GET_ALL("1"));
    expect(result).toEqual(mockIncomeTypes);
  });

  it("Debería crear un nuevo tipo de ingreso utilizando el punto final correcto", async () => {
    mockHttpClient.post.mockResolvedValue(mockCreatedType);

    const result = await datasource.createIncomeType(mockNewType);

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      API_ROUTES.INCOME_TYPES.CREATE,
      mockNewType
    );
    expect(result).toEqual(mockCreatedType);
  });
});
