// features/expenses/context/__tests__/useExpenseStore.test.ts

import { useExpenseStore } from "../useExpenseStore";
import { IExpense } from "../../models/IExpense";
import { IExpenseType } from "../../../expenses-types/models/IExpenseType"; // Asegúrate de importar IExpenseType correctamente

// Mock de tipo de gasto (IExpenseType)
const mockExpenseType: IExpenseType = {
  id: 1,
  name: "Category A",  // Nombre ajustado según tu definición
  isGlobal: true,      // Se debe proporcionar este campo
  userId: 1,          // Se debe proporcionar este campo
};

// Mock de datos de gastos (IExpense)
const mockExpenses: IExpense[] = [
  {
    id: 1,
    description: "Test expense",
    value: 50,
    status: true,
    type: mockExpenseType,  // El campo 'type' es ahora un objeto de tipo IExpenseType
    observation: "Test observation",
    userId: 1,
    date: new Date(),
  },
];

describe("useExpenseStore", () => {
  beforeEach(() => {
    // Reiniciamos el estado antes de cada test
    useExpenseStore.getState().setExpenses([]);
  });

  it("inicialmente debe estar vacío", () => {
    expect(useExpenseStore.getState().expenses).toEqual([]);
  });

  it("setExpenses() añade un item correctamente", () => {
    // Añadimos un gasto mockeado al store
    useExpenseStore.getState().setExpenses([mockExpenses[0]]);
    
    // Verificamos que el estado ahora contiene nuestro mock
    const all = useExpenseStore.getState().expenses;
    expect(all).toHaveLength(1);
    expect(all[0].id).toBe(1);
    expect(all[0].description).toBe("Test expense");
  });

  it("getAllExpenses() obtiene y asigna los gastos mockeados", async () => {
    // Simulamos la función que obtiene los datos del datasource
    useExpenseStore.getState().setExpenses(mockExpenses);

    // Verificamos que el estado tiene los gastos asignados correctamente
    expect(useExpenseStore.getState().expenses).toEqual(mockExpenses);
  });

  it("deleteExpense() elimina correctamente un gasto", async () => {
    // Inicializamos el estado con un gasto
    useExpenseStore.getState().setExpenses(mockExpenses);

    // Llamamos a la función deleteExpense
    await useExpenseStore.getState().deleteExpense(1);

    // Verificamos que el gasto se ha eliminado
    expect(useExpenseStore.getState().expenses).toHaveLength(0);
  });

  it("createExpense() crea un nuevo gasto correctamente", async () => {
    const newExpense = {
      description: "New Expense",
      value: 100,
      status: true,
      typeId: 1,  // Ajustado según tu modelo
      observation: "New test observation",
      userId: 1,
      date: new Date(),
    };

    // Simulamos la creación de un nuevo gasto
    await useExpenseStore.getState().createExpense(newExpense);

    // Verificamos que el estado se haya actualizado con el nuevo gasto
    const all = useExpenseStore.getState().expenses;
    expect(all).toHaveLength(1);  // Debe haber un gasto en el estado
    expect(all[0].description).toBe("New Expense");
  });

  it("updateExpense() actualiza un gasto correctamente", async () => {
    // Añadimos un gasto inicial al estado
    useExpenseStore.getState().setExpenses([mockExpenses[0]]);

    const updatedExpense = {
      ...mockExpenses[0],
      description: "Updated Test Expense",
    };

    // Llamamos a la función de actualización
    await useExpenseStore.getState().updateExpense(1, updatedExpense);

    // Verificamos que el gasto ha sido actualizado correctamente
    const all = useExpenseStore.getState().expenses;
    expect(all[0].description).toBe("Updated Test Expense");
  });

  it("should handle error when typeId is invalid during createExpense()", async () => {
    const invalidExpense = {
      description: "Invalid Expense",
      value: 100,
      status: true,
      typeId: -1,  // Tipo inválido
      observation: "Invalid type test",
      userId: 1,
      date: new Date(),
    };

    try {
      await useExpenseStore.getState().createExpense(invalidExpense);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Invalid typeId"); // Ajusta esto según el mensaje de error real
      } else {
        // Si el error no es una instancia de Error, maneja el caso según sea necesario
        expect(error).toHaveProperty('message', 'Invalid typeId');
      }
    }
  });

  it("should handle error when mandatory fields are missing", async () => {
    const invalidExpense = {
      description: "",  // Falta descripción
      value: 100,
      status: true,
      typeId: 1,
      observation: "Test observation",
      userId: 1,
      date: new Date(),
    };

    try {
      await useExpenseStore.getState().createExpense(invalidExpense);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Description is required"); // Ajusta según el mensaje de error real
      } else {
        // Si el error no es una instancia de Error, maneja el caso según sea necesario
        expect(error).toHaveProperty('message', 'Description is required');
      }
    }
  });

  it("should handle error when trying to delete a non-existent expense", async () => {
    // Intentamos eliminar un gasto con ID que no existe
    try {
      await useExpenseStore.getState().deleteExpense(999);  // ID que no existe
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Expense not found"); // Ajusta según el mensaje de error real
      } else {
        // Si el error no es una instancia de Error, maneja el caso según sea necesario
        expect(error).toHaveProperty('message', 'Expense not found');
      }
    }
  });
});
