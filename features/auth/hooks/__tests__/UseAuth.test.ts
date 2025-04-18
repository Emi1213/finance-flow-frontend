import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth } from "../useAuth";
import { UseAccountStore } from "../../context/useUserStore";
import { IAuth } from "../../models/IUser";

// Mocks
const mockLogin = jest.fn();
const mockPush = jest.fn();

jest.mock("../../context/useUserStore", () => ({
  UseAccountStore: jest.fn(() => ({
    login: mockLogin,
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("useAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle login error", async () => {
    const mockUser: IAuth = {
      email: "test@test.com",
      password: "wrongpassword",
    };

    // Simula un error en el login
    mockLogin.mockRejectedValue(new Error("Login failed"));

    const { result } = renderHook(() => useAuth());

    // Llama a handleSubmit
    await act(async () => {
      await result.current.handleSubmit(mockUser);
    });

    // Verifica que mockLogin haya sido llamado con los datos de login
    expect(mockLogin).toHaveBeenCalledWith(mockUser);

    // Verifica que no haya redirección a /dashboard
    expect(mockPush).not.toHaveBeenCalled();

    // Verifica que el estado de carga se haya desactivado
    expect(result.current.isLoading).toBe(false);
  });

  // Otros tests pueden ir aquí
});
