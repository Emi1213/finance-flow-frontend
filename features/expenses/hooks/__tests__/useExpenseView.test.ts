import { renderHook, act } from "@testing-library/react-hooks";
import { useExpenseView } from "../use-expenses-view"; // Asegúrate de que la ruta sea la correcta
import { useExpenseStore } from "../../context/useExpenseStore"; // O la ruta correcta

// Mocks
const mockGetAllExpenses = jest.fn();
const mockDeleteExpense = jest.fn();
const mockPush = jest.fn();

// Mocks para los hooks contextuales
jest.mock("../../context/useExpenseStore", () => ({
  useExpenseStore: () => ({
    expenses: [
      { id: 1, description: "Comida", date: "2025-04-01", value: 20 },
      { id: 2, description: "Transporte", date: "2025-04-02", value: 50 },
      { id: 3, description: "Salud", date: "2025-04-03", value: 100 },
    ],
    getAllExpenses: mockGetAllExpenses,
    deleteExpense: mockDeleteExpense,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/expenses",
}));

describe("useExpenseView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe cargar los gastos al montarse", async () => {
    renderHook(() => useExpenseView());
    expect(mockGetAllExpenses).toHaveBeenCalledTimes(1);
  });

  it("debe eliminar un gasto", async () => {
    const { result } = renderHook(() => useExpenseView());
    const expenseIdToDelete = 1;

    await act(async () => {
      await result.current.handleDelete(expenseIdToDelete); // Llamada para eliminar el gasto
    });

    expect(mockDeleteExpense).toHaveBeenCalledWith(expenseIdToDelete);
  });

  it("debe navegar al formulario de edición de un gasto", () => {
    const { result } = renderHook(() => useExpenseView());
    const expenseIdToEdit = 1;

    act(() => {
      result.current.handleEdit(expenseIdToEdit); // Llamada para navegar al formulario de edición
    });

    expect(mockPush).toHaveBeenCalledWith("/expenses/edit/1");
  });

  it("debe navegar al formulario de creación de un nuevo gasto", () => {
    const { result } = renderHook(() => useExpenseView());

    act(() => {
      result.current.handleAdd(); // Llamada para navegar al formulario de creación
    });

    expect(mockPush).toHaveBeenCalledWith("/expenses/new");
  });
});
