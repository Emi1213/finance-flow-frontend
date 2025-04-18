// features/incomes/context/__tests__/useIncomeStore.test.ts

import { useIncomeStore } from "../useIncomeStore";
import { IIncome } from "../../models/IIncome";

// Mock de datos de prueba
const mockIncomes: IIncome[] = [
  {
    id: 1,
    description: "Test income",
    value: 100,
    date: new Date(),                    // Date correcto
    status: true,
    type: { id: 1, name: "Test" },       // Puedes ajustar 'as IIncome' si tu tipo es más estricto
    observation: "",
  } as IIncome,
];

// Simulación del datasource: solo getIncomes
jest.mock("../../services/Datasource", () => ({
  IncomeDatasourceImpl: {
    getInstance: () => ({
      getIncomes: jest.fn().mockResolvedValue(mockIncomes),
    }),
  },
}));

describe("useIncomeStore (capa de datos simple)", () => {
  beforeEach(() => {
    // Reinicia el estado antes de cada test
    useIncomeStore.setState({ incomes: [] });
  });

  it("inicialmente tiene incomes como array vacío", () => {
    expect(useIncomeStore.getState().incomes).toEqual([]);
  });

  it("fetchAllIncomes() obtiene y asigna los ingresos mockeados", async () => {
    await useIncomeStore.getState().getAllIncomes();
    expect(useIncomeStore.getState().incomes).toEqual(mockIncomes);
  });
});
