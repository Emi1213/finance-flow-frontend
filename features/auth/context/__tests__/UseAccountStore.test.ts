import { UseAccountStore } from "../useUserStore";
import { IUser, IAuth } from "../../models/IUser";
import { ISignUp } from "../../models/ISignUp";

// Mocks
const mockLogin = jest.fn();
const mockRegister = jest.fn();
const mockDeleteCookie = jest.fn();
const mockSuccessToast = jest.fn();
const mockErrorToast = jest.fn();

jest.mock("../../services/Datasource", () => ({
  UserDatasourceImpl: {
    getInstance: () => ({
      login: mockLogin,
      register: mockRegister,
    }),
  },
}));

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: (msg: string) => mockSuccessToast(msg),
    error: (msg: string) => mockErrorToast(msg),
  },
}));

jest.mock("@/core/utils/CookiesUtil", () => ({
  deleteCookie: mockDeleteCookie, // Asegúrate de que el mock es correcto
}));

describe("UseAccountStore", () => {
  beforeEach(() => {
    UseAccountStore.setState({ user: undefined, loading: true });
    jest.clearAllMocks();
  });

  it("Debe iniciar sesión y configurar el usuario si tiene éxito", async () => {
    const mockUser: IUser = {
      id: 1,
      name: "Juan",
      lastname: "Pérez",
    };

    mockLogin.mockResolvedValue(mockUser);

    await UseAccountStore.getState().login({ email: "test@test.com", password: "123" });

    const state = UseAccountStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(mockSuccessToast).toHaveBeenCalledWith("Bienvenid@ Juan!");
  });

  it("Debería mostrar un mensaje de error si falla el inicio de sesión.", async () => {
    mockLogin.mockResolvedValue(undefined);

    await UseAccountStore.getState().login({ email: "fail@test.com", password: "wrong" });

    expect(UseAccountStore.getState().user).toBeUndefined();
    expect(mockErrorToast).toHaveBeenCalledWith("Algo salió mal, por favor intente nuevamente.");
  });

  it("Debe registrarse y configurar el usuario si tiene éxito.", async () => {
    const mockUser: IUser = {
      id: 2,
      name: "Maria",
      lastname: "Lopez",
    };

    mockRegister.mockResolvedValue(mockUser);

    const credentials: ISignUp = {
      email: "maria@example.com",
      password: "123456",
      name: "Maria",
      lastname: "Lopez",
    };

    await UseAccountStore.getState().signUp(credentials);

    expect(UseAccountStore.getState().user).toEqual(mockUser);
    expect(mockSuccessToast).toHaveBeenCalledWith("Bienvenid@ Maria!");
  });

  it("Debería mostrarse un mensaje de error si falla el registro.", async () => {
    mockRegister.mockResolvedValue(undefined);

    const credentials: ISignUp = {
      email: "error@example.com",
      password: "123456",
      name: "Error",
      lastname: "Test",
    };

    await UseAccountStore.getState().signUp(credentials);

    expect(UseAccountStore.getState().user).toBeUndefined();
    expect(mockErrorToast).toHaveBeenCalledWith("Algo salió mal, por favor intente nuevamente.");
  });

  it("Debería configurar el usuario y la carga.", () => {
    const user: IUser = {
      id: 5,
      name: "Carlos",
      lastname: "Gomez",
    };

    UseAccountStore.getState().setUser(user);

    const state = UseAccountStore.getState();
    expect(state.user).toEqual(user);
    expect(state.loading).toBe(false);
  });

  it("Debería borrar el usuario en setUser(undefined)", () => {
    UseAccountStore.getState().setUser(undefined);

    const state = UseAccountStore.getState();
    expect(state.user).toBeUndefined();
    expect(state.loading).toBe(false);
  });

});
