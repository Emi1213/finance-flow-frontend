// features/expenses/hooks/__tests__/useExpensesForm.test.ts

import { renderHook, act } from "@testing-library/react-hooks";
import { useExpensesForm } from "../use-expenses-form";
import { ICreateExpense } from "./../../models/IExpense";

// — Mocks — 
const mockCreateExpense = jest.fn();
const mockUpdateExpense = jest.fn();
const mockPush = jest.fn();

jest.mock("../../context/useExpenseStore", () => ({
  useExpenseStore: () => ({
    createExpense: mockCreateExpense,
    updateExpense: mockUpdateExpense,
  }),
}));

jest.mock("@/features/auth/context/useUserStore", () => ({
  UseAccountStore: () => ({ user: { id: 1 } }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/expenses/new",
}));

describe("useExpensesForm", () => {
  beforeEach(() => jest.clearAllMocks());

  it("initialValues por defecto (creación)", () => {
    const { result } = renderHook(() => useExpensesForm());
    const iv = result.current.initialValues;

    expect(iv.description).toBe("");
    expect(iv.value).toBe("");
    expect(iv.status).toBe(true);
    expect(iv.typeId).toBeNull();
    expect(iv.observation).toBe("");
    expect(iv.date).toBeInstanceOf(Date);
  });

  it("handleSubmit → createExpense y navegación", async () => {
    const { result } = renderHook(() => useExpensesForm());

    const data: ICreateExpense = {
      description: "Transporte",
      value: 50,
      date: new Date(),
      status: true,
      typeId: 3,
      observation: "Taxi",
      userId: 1,
    };

    await act(async () => {
      await result.current.handleSubmit(data);
    });

    expect(mockCreateExpense).toHaveBeenCalledWith({
      ...data,
      userId: 1,
      typeId: 3,
    });
    expect(mockPush).toHaveBeenCalledWith("/expenses");
  });
});
