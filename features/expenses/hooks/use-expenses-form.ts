import { usePathname, useRouter } from "next/navigation";
import * as yup from "yup";

import { useExpenseStore } from "../context/useExpenseStore";
import { ICreateExpense, IExpense, IUpdateExpense } from "../models/IExpense";

import { UseAccountStore } from "@/features/auth/context/useUserStore";

/**
 * Hook que gestiona el formulario de creación y edición de gastos.
 *
 * - Define valores iniciales del formulario basados en `currentExpense` (si se está editando).
 * - Valida los campos usando Yup (requeridos: descripción, valor, fecha, estado, tipo).
 * - Maneja el envío del formulario, diferenciando entre crear o actualizar un gasto.
 * - Redirige al usuario al listado de gastos tras la operación.
 *
 * @param {IExpense} [currentExpense] - Objeto gasto actual (para editar).
 * @returns {{
 *   initialValues: {
 *     description: string;
 *     value: string | number;
 *     date: Date;
 *     status: boolean;
 *     typeId: number | null;
 *     observation: string;
 *   },
 *   validationSchema: yup.ObjectSchema<any>,
 *   handleSubmit: (data: ICreateExpense | IUpdateExpense) => Promise<void>
 * }}
 */
export function useExpensesForm(currentExpense?: IExpense) {
  const user = UseAccountStore((state) => state.user);
  const { createExpense, updateExpense } = useExpenseStore();
  const router = useRouter();
  const pathname = usePathname();

  // Valores iniciales del formulario (nuevos o existentes)
  const initialValues = {
    description: currentExpense?.description || "",
    value: currentExpense?.value || "",
    date: currentExpense?.date || new Date(),
    status: currentExpense?.status ?? true,
    typeId: currentExpense?.type.id || null,
    observation: currentExpense?.observation || "",
  };

  // Esquema de validación para los campos del formulario
  const validationSchema = yup.object().shape({
    description: yup.string().required("Description is required"),
    value: yup.number().required("Value is required"),
    date: yup.date().required("Date is required"),
    status: yup.boolean().required("Status is required"),
    typeId: yup.number().required("Type is required"),
  });

  /**
   * Envía los datos del formulario:
   * - Convierte `typeId` y `userId` a número.
   * - Si `currentExpense` existe, actualiza el gasto y redirige un nivel arriba.
   * - Si no, crea un nuevo gasto y redirige al listado.
   *
   * @param {ICreateExpense | IUpdateExpense} data - Datos a crear o actualizar.
   */
  const handleSubmit = async (data: ICreateExpense | IUpdateExpense) => {
    const formattedData = {
      ...data,
      typeId: Number(data.typeId),
      userId: user?.id ?? 1,
    };

    if (currentExpense) {
      await updateExpense(currentExpense.id, formattedData as IUpdateExpense);
      router.push(pathname.split("/").slice(0, -2).join("/"));
      return;
    }

    await createExpense(formattedData as ICreateExpense);
    router.push(pathname.split("/").slice(0, -1).join("/"));
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
  };
}
