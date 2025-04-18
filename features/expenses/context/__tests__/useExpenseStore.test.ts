// features/expenses/context/__tests__/useExpenseStore.test.ts

import { useExpenseStore } from "../useExpenseStore";

describe("useExpenseStore (mínimo)", () => {
  beforeEach(() => {
    // Reiniciamos el store a un array vacío
    useExpenseStore.getState().setExpenses([]);
  });

  it("inicialmente debe estar vacío", () => {
    expect(useExpenseStore.getState().expenses).toEqual([]);
  });

  it("setExpenses() añade un item correctamente", () => {
    // Dummy lo casteamos a any para evitar errores de tipo
    const dummy = ({ id: 42 } as any);

    // Llamamos a tu método público setExpenses
    useExpenseStore.getState().setExpenses([dummy]);

    // Verificamos que el estado ahora contiene nuestro dummy
    const all = useExpenseStore.getState().expenses;
    expect(all).toHaveLength(1);
    expect(all[0].id).toBe(42);
  });
});
