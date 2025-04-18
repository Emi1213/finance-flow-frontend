import { UseAccountStore } from "../../context/useUserStore"; 
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
      register: mockRegister, // Aquí mockeamos la función register
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
  deleteCookie: mockDeleteCookie, // Mock de deleteCookie
}));

describe("UseAccountStore", () => {
  beforeEach(() => {
    UseAccountStore.setState({ user: undefined, loading: true }); // Limpiamos el estado antes de cada prueba
    jest.clearAllMocks();  // Limpiamos los mocks
  });

  it("should login and set user if successful", async () => {
    const mockUser: IUser = {
      id: 1,
      name: "Juan",
      lastname: "Pérez",
    };

    mockLogin.mockResolvedValue(mockUser);  // Simulamos un login exitoso

    await UseAccountStore.getState().login({ email: "test@test.com", password: "123" });

    const state = UseAccountStore.getState();
    expect(state.user).toEqual(mockUser);  // Verifica que el usuario se ha seteado
    expect(mockSuccessToast).toHaveBeenCalledWith("Bienvenid@ Juan!");  // Verifica que el mensaje de éxito se ha llamado
  });

  it("should show error toast if login fails", async () => {
    mockLogin.mockResolvedValue(undefined);  // Simulamos un login fallido

    await UseAccountStore.getState().login({ email: "fail@test.com", password: "wrong" });

    expect(UseAccountStore.getState().user).toBeUndefined();  // Verifica que no se haya seteado el usuario
    expect(mockErrorToast).toHaveBeenCalledWith("Algo salió mal, por favor intente nuevamente.");
  });

  it("should sign up and set user if successful", async () => {
    const mockUser: IUser = {
      id: 2,
      name: "Maria",
      lastname: "Lopez",
    };

    mockRegister.mockResolvedValue(mockUser);  // Simulamos un registro exitoso

    const credentials: ISignUp = {
      email: "maria@example.com",
      password: "123456",
      name: "Maria",
      lastname: "Lopez",
    };

    await UseAccountStore.getState().signUp(credentials);  // Llamamos al signUp

    // Verificamos que el estado del usuario se haya seteado correctamente
    const state = UseAccountStore.getState();
    expect(state.user).toEqual(mockUser);  
    expect(mockSuccessToast).toHaveBeenCalledWith("Bienvenid@ Maria!");  // Verificamos que el mensaje de éxito se haya llamado
  });

  it("should show error toast if sign up fails", async () => {
    mockRegister.mockResolvedValue(undefined);  // Simulamos un registro fallido

    const credentials: ISignUp = {
      email: "error@example.com",
      password: "123456",
      name: "Error",
      lastname: "Test",
    };

    await UseAccountStore.getState().signUp(credentials);  // Llamamos al signUp

    // Verificamos que no se haya seteado el usuario y que el mensaje de error se haya mostrado
    expect(UseAccountStore.getState().user).toBeUndefined();
    expect(mockErrorToast).toHaveBeenCalledWith("Algo salió mal, por favor intente nuevamente.");
  });

  it("should set user and loading", () => {
    const user: IUser = {
      id: 5,
      name: "Carlos",
      lastname: "Gomez",
    };

    UseAccountStore.getState().setUser(user);  // Llamamos a setUser

    const state = UseAccountStore.getState();
    expect(state.user).toEqual(user);  // Verifica que el usuario se haya seteado
    expect(state.loading).toBe(false);  // Verifica que el estado de carga sea falso
  });

  it("should clear user on setUser(undefined)", () => {
    UseAccountStore.getState().setUser(undefined);  // Llamamos a setUser con undefined

    const state = UseAccountStore.getState();
    expect(state.user).toBeUndefined();  // Verifica que el usuario se haya eliminado
    expect(state.loading).toBe(false);  // Verifica que el estado de carga sea falso
  });
});
