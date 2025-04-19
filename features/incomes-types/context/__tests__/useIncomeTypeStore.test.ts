import { act } from "react-dom/test-utils";
import { useIncomeTypeStore } from "../../context/useIncomeTypeStore";
import { IncomeTypeDatasourceImpl } from "../../services/Datasource";
import { ICreateIncomeType, IIncomeType } from "../../models/IIncomeType";

// Mocks
jest.mock("../../services/Datasource", () => ({
  IncomeTypeDatasourceImpl: {
    getInstance: jest.fn(() => ({
      getIncomeTypes: jest.fn(),
      createIncomeType: jest.fn(),
    })),
  },
}));

describe("useIncomeTypeStore", () => {
  const mockTypes: IIncomeType[] = [
    { id: 1, name: "Salario", isGlobal: false, userId: 1 },
  ];

  const mockCreateType: ICreateIncomeType = {
    name: "Freelance",
    isGlobal: false,
    userId: 1,
  };

  beforeEach(() => {
    useIncomeTypeStore.setState({ types: [] });
    jest.clearAllMocks();
  });

  it("Debe obtener y establecer los tipos de ingresos", async () => {
    const mockGetIncomeTypes = jest.fn().mockResolvedValue(mockTypes);

    (IncomeTypeDatasourceImpl.getInstance as jest.Mock).mockReturnValue({
      getIncomeTypes: mockGetIncomeTypes,
      createIncomeType: jest.fn(),
    });

    await act(async () => {
      await useIncomeTypeStore.getState().getAllTypes();
    });

    expect(mockGetIncomeTypes).toHaveBeenCalledWith("1");
    expect(useIncomeTypeStore.getState().types).toEqual(mockTypes);
  });

  it("Debería llamar a createIncomeType", async () => {
    const mockCreateIncomeType = jest.fn().mockResolvedValue(undefined);

    (IncomeTypeDatasourceImpl.getInstance as jest.Mock).mockReturnValue({
      getIncomeTypes: jest.fn(),
      createIncomeType: mockCreateIncomeType,
    });

    await act(async () => {
      await useIncomeTypeStore.getState().addType(mockCreateType);
    });

    expect(mockCreateIncomeType).toHaveBeenCalledWith(mockCreateType);
  });
});
