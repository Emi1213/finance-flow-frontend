// features/incomes/context/__tests__/useIncomeStore.test.ts

import { useIncomeStore } from "../useIncomeStore";
import { IIncome, ICreateIncome, IUpdateIncome } from "../../models/IIncome";

// Mock de datos de prueba
const mockIncomes: IIncome[] = [
  {
    id: 1,
    description: "Test income",
    value: 100,
    date: new Date(),
    status: true,
    type: { id: 1, name: "Test" },
    observation: "",
  } as IIncome,
];

const mockCreateIncome: ICreateIncome = {
  description: "New Income",
  value: 150,
  date: new Date(),
  status: true,
  typeId: 1,
  observation: "",
  userId: 1,
};

const mockUpdateIncome: IUpdateIncome = {
  description: "Updated Income",
  value: 200,
  date: new Date(),
  status: false,
  typeId: 2,
  observation: "Updated",
};

// Simulación del datasource: todos los métodos necesarios
jest.mock("../../services/Datasource", () => ({
  IncomeDatasourceImpl: {
    getInstance: () => ({
      getIncomes: jest.fn().mockResolvedValue(mockIncomes),
      createIncome: jest.fn().mockResolvedValue(mockCreateIncome),
      updateIncome: jest.fn().mockResolvedValue(mockUpdateIncome),
      deleteIncome: jest.fn().mockResolvedValue(true),
    }),
  },
}));

describe("useIncomeStore (capa de datos)", () => {
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

  it("setIncomes() debe establecer ingresos correctamente", () => {
    useIncomeStore.getState().setIncomes(mockIncomes);
    expect(useIncomeStore.getState().incomes).toEqual(mockIncomes);
  });

  it("deleteIncome() elimina un ingreso correctamente", async () => {
    // Antes de eliminar, agregamos el ingreso
    useIncomeStore.getState().setIncomes(mockIncomes);
    
    // Simulamos la eliminación
    await useIncomeStore.getState().deleteIncome(1);
    
    // Verificamos que el ingreso haya sido eliminado
    expect(useIncomeStore.getState().incomes).toEqual([]);
  });

  it("createIncome() crea un nuevo ingreso correctamente", async () => {
    // Simulamos la creación de un nuevo ingreso
    await useIncomeStore.getState().createIncome(mockCreateIncome);
    
    // Verificamos que el ingreso ha sido creado y se encuentra en el estado
    expect(useIncomeStore.getState().incomes).toContainEqual(expect.objectContaining(mockCreateIncome));
  });

  it("updateIncome() actualiza un ingreso correctamente", async () => {
    // Agregamos el ingreso inicial
    useIncomeStore.getState().setIncomes(mockIncomes);

    // Simulamos la actualización de un ingreso
    await useIncomeStore.getState().updateIncome(1, mockUpdateIncome);

    // Verificamos que el ingreso se ha actualizado correctamente
    expect(useIncomeStore.getState().incomes[0].description).toBe(mockUpdateIncome.description);
    expect(useIncomeStore.getState().incomes[0].value).toBe(mockUpdateIncome.value);
  });
});
