import { UserDatasourceImpl } from "../Datasource";
import { AxiosClient } from "@/core/infraestructure/http/AxiosClient";
import { setCookie } from "@/core/utils/CookiesUtil";
import { API_ROUTES } from "@/shared/api-routes/api-routes";

// Mocks
jest.mock("@/core/infraestructure/http/AxiosClient", () => ({
  AxiosClient: {
    getInstance: jest.fn().mockReturnValue({
      post: jest.fn(),
    }),
  },
}));

jest.mock("@/core/utils/CookiesUtil", () => ({
  setCookie: jest.fn(),
}));

describe("UserDatasourceImpl", () => {
  const mockCredentials = { email: "test@example.com", password: "password123" };
  const mockSignUpCredentials = {
    email: "signup@example.com",
    password: "password456",
    name: "John",
    lastname: "Doe",
  };
  const mockApiUser = {
    token: "abc123",
    user: { id: 1, email: "test@example.com", name: "John", lastname: "Doe" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debería llamar al inicio de sesión y devolver una respuesta del usuario", async () => {
    const mockPost = AxiosClient.getInstance().post as jest.Mock;
    mockPost.mockResolvedValue(mockApiUser);

    const userDatasource = new UserDatasourceImpl();

    const result = await userDatasource.login(mockCredentials);

    expect(mockPost).toHaveBeenCalledWith(API_ROUTES.AUTH.LOGIN, mockCredentials);
    expect(setCookie).toHaveBeenCalledWith("access_token", mockApiUser.token);
    expect(result).toEqual(mockApiUser.user);
  });

  it("Debería llamar al registro y devolver una respuesta del usuario", async () => {
    const mockPost = AxiosClient.getInstance().post as jest.Mock;
    mockPost.mockResolvedValue(mockApiUser);

    const userDatasource = new UserDatasourceImpl();

    const result = await userDatasource.register(mockSignUpCredentials);

    expect(mockPost).toHaveBeenCalledWith(API_ROUTES.AUTH.REGISTER, mockSignUpCredentials);
    expect(setCookie).toHaveBeenCalledWith("access_token", mockApiUser.token);
    expect(result).toEqual(mockApiUser.user);
  });

  it("Debería gestionar los errores de inicio de sesión", async () => {
    const errorMessage = "Login error";
    const mockPost = AxiosClient.getInstance().post as jest.Mock;
    mockPost.mockRejectedValue(new Error(errorMessage));

    const userDatasource = new UserDatasourceImpl();

    await expect(userDatasource.login(mockCredentials)).rejects.toThrowError(errorMessage);

    expect(setCookie).not.toHaveBeenCalled();
  });

  it("Debería manejar errores de registro", async () => {
    const errorMessage = "Register error";
    const mockPost = AxiosClient.getInstance().post as jest.Mock;
    mockPost.mockRejectedValue(new Error(errorMessage));

    const userDatasource = new UserDatasourceImpl();

    await expect(userDatasource.register(mockSignUpCredentials)).rejects.toThrowError(errorMessage);

    expect(setCookie).not.toHaveBeenCalled();
  });
});
