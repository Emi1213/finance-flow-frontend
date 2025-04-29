import { TotalDatasourceImpl } from "../../services/Datasource";
import { API_ROUTES } from "@/shared/api-routes/api-routes";
import { ITotal } from "../../models/ITotal";

// Mock de AxiosClient y HttpHandler
jest.mock("@/core/infraestructure/http/AxiosClient", () => ({
    AxiosClient: {
      getInstance: () => ({
        get: jest.fn(),
      }),
    },
  }));
  
  describe("TotalDatasourceImpl", () => {
    const mockUserId = "123";
    const mockYear = "2024";
    const mockMonth = "03";
  
    const mockResponse: ITotal = {
      total: 1500,
      month: 3,
      year: 2024,
    };
  
    it("debería llamar al endpoint correcto y retornar los datos correctos", async () => {
      const instance = TotalDatasourceImpl.getInstance();
  
      // Obtener referencia al mock de get
      const mockedGet = (instance as any).httplClient.get as jest.Mock;
  
      // Configurar respuesta mock
      mockedGet.mockResolvedValue(mockResponse);
  
      const data = await instance.getTotal(mockUserId, mockYear, mockMonth);
  
      expect(mockedGet).toHaveBeenCalledWith(
        API_ROUTES.TOTAL.GET_TOTAL(mockUserId, mockYear, mockMonth)
      );
  
      expect(data).toEqual(mockResponse);
    });
  });