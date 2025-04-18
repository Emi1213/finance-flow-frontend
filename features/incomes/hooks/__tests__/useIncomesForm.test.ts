// features/incomes/hooks/__tests__/useIncomesForm.test.ts

import { renderHook, act } from "@testing-library/react-hooks";
import { useIncomesForm } from "../use-incomes-form";
import { ICreateIncome } from "../../models/IIncome";


// Mock de store y router
const createIncomeMock = jest.fn();
jest.mock("../../context/useIncomeStore", () => ({
  useIncomeStore: () => ({
    createIncome: createIncomeMock,
    updateIncome: jest.fn(),
  }),
}));

jest.mock("@/features/auth/context/useUserStore", () => ({
  UseAccountStore: () => ({
    user: { id: 1 },
  }),
}));

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: mockRouterPush }),
    usePathname: () => "/incomes/new", // ✅ Así tu hook hará push("/incomes")
  }));
  

describe("useIncomesForm", () => {
  beforeEach(() => {
    createIncomeMock.mockClear();
    mockRouterPush.mockClear();
  });

  it("debe tener valores iniciales por defecto", () => {
    const { result } = renderHook(() => useIncomesForm());
    expect(result.current.initialValues.description).toBe("");
    expect(result.current.initialValues.status).toBe(true);
  });

  it("debe llamar a createIncome y redirigir", async () => {
    const { result } = renderHook(() => useIncomesForm());

    const mockData = {
        description: "Prueba",
        value: 100,
        date: new Date(),
        status: true,
        typeId: 1,
        observation: "",
        userId: 1,
      };
      

    await act(async () => {
      await result.current.handleSubmit(mockData);
    });

    expect(createIncomeMock).toHaveBeenCalledWith({
      ...mockData,
      userId: 1,
    });

    expect(mockRouterPush).toHaveBeenCalledWith("/incomes");
  });
});
