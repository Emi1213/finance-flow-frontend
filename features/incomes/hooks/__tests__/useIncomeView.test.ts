// features/incomes/hooks/__tests__/useIncomeView.test.ts

import { renderHook, act } from "@testing-library/react-hooks";
import { useIncomeView } from "../use-incomes-view"; // Asegúrate de que la ruta sea correcta

// Mock de dependencias
const deleteIncomeMock = jest.fn();
const getAllIncomesMock = jest.fn();

jest.mock("../../context/useIncomeStore", () => ({
  useIncomeStore: () => ({
    deleteIncome: deleteIncomeMock,
    getAllIncomes: getAllIncomesMock,
    incomes: [
      {
        id: 1,
        description: "Salary",
        value: 1000,
        date: new Date(),
        status: true,
        type: { id: 1, name: "Fixed" },
        observation: "",
      },
    ],
  }),
}));

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
  usePathname: () => "/incomes",
}));

describe("useIncomeView", () => {
  beforeEach(() => {
    deleteIncomeMock.mockClear();
    getAllIncomesMock.mockClear();
    mockRouterPush.mockClear();
  });

  it("debe llamar a getAllIncomes al montarse", () => {
    renderHook(() => useIncomeView());
    expect(getAllIncomesMock).toHaveBeenCalledTimes(1);
  });

  it("debe aplicar los filtros de búsqueda correctamente", () => {
    const { result } = renderHook(() => useIncomeView());

    act(() => {
      result.current.setFilterValue("Salary");
    });

    expect(result.current.filterValue).toBe("Salary");
  });
});
