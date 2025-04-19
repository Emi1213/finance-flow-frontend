import { act } from "react-dom/test-utils";
import { useExpenseTypeStore } from "../../context/useExpenseTypeStore";
import { ExpenseTypeDatasourceImpl } from "../../services/Datasource";
import { ICreateExpenseType, IExpenseType } from "../../models/IExpenseType";

// Mocks
jest.mock("../../services/Datasource", () => ({
  ExpenseTypeDatasourceImpl: {
    getInstance: jest.fn(() => ({
      getExpenseTypes: jest.fn(),
      createExpenseType: jest.fn(),
    })),
  },
}));

describe("useExpenseTypeStore", () => {
  const mockTypes: IExpenseType[] = [
    { id: 1, name: "Alquiler", isGlobal: true, userId: 1 },
  ];

  const mockCreateType: ICreateExpenseType = {
    name: "Transporte",
    isGlobal: false,
    userId: 1,
  };

  beforeEach(() => {
    useExpenseTypeStore.setState({ types: [] });
    jest.clearAllMocks();
  });

  it("should fetch and set expense types", async () => {
    const mockGetExpenseTypes = jest.fn().mockResolvedValue(mockTypes);

    (ExpenseTypeDatasourceImpl.getInstance as jest.Mock).mockReturnValue({
      getExpenseTypes: mockGetExpenseTypes,
      createExpenseType: jest.fn(),
    });

    await act(async () => {
      await useExpenseTypeStore.getState().getAllTypes();
    });

    expect(mockGetExpenseTypes).toHaveBeenCalledWith("1");
    expect(useExpenseTypeStore.getState().types).toEqual(mockTypes);
  });

  it("should call createExpenseType", async () => {
    const mockCreateExpenseType = jest.fn().mockResolvedValue(undefined);

    (ExpenseTypeDatasourceImpl.getInstance as jest.Mock).mockReturnValue({
      getExpenseTypes: jest.fn(),
      createExpenseType: mockCreateExpenseType,
    });

    await act(async () => {
      await useExpenseTypeStore.getState().addType(mockCreateType);
    });

    expect(mockCreateExpenseType).toHaveBeenCalledWith(mockCreateType);
  });
});
