import { usePathname, useRouter } from "next/navigation";
import * as yup from "yup";

import { useGoalStore } from "../context/useGoalStore";
import { ICreateGoal, IGoal, IUpdateGoal } from "../models/IGoal";

import { UseAccountStore } from "@/features/auth/context/useUserStore";

/**
 * Hook que gestiona el formulario de creación y edición de metas (expenses).
 *
 * - Proporciona valores iniciales para el formulario de creación o edición.
 * - Valida el valor y el estado de la meta utilizando Yup.
 * - Permite enviar el formulario para crear o actualizar una meta.
 * - Redirige al usuario a la ruta anterior una vez completado el envío.
 *
 * @param {IGoal} [currentExpense] - Objeto de meta actual (si se está editando).
 * @returns {{
 *   initialValues: Object,
 *   validationSchema: yup.ObjectSchema,
 *   handleSubmit: Function
 * }}
 */
export function useExpensesForm(currentExpense?: IGoal) {
  const user = UseAccountStore((state) => state.user);
  const { createGoal, updateGoal } = useGoalStore();
  const router = useRouter();
  const pathname = usePathname();

  // Valores iniciales del formulario (basados en la meta actual si existe)
  const initialValues = {
    value: currentExpense?.value || "",
    date: currentExpense?.date || new Date(),
    status: currentExpense?.status ?? true,
    percentaje: currentExpense?.percentaje || 0,
  };

  // Esquema de validación para el formulario de metas
  const validationSchema = yup.object().shape({
    value: yup.number().required("Value is required"),
    status: yup.boolean().required("Status is required"),
  });

  /**
   * Envía los datos del formulario.
   * - Si `currentExpense` existe, se actualiza la meta.
   * - Si no existe, se crea una nueva meta.
   * - Redirige al usuario a la ruta anterior después de enviar los datos.
   *
   * @param {ICreateGoal | IUpdateGoal} data - Los datos del formulario para crear o actualizar la meta.
   */
  const handleSubmit = async (data: ICreateGoal | IUpdateGoal) => {
    const formattedData = {
      value: Number(data.value),
      status: data.status,
      percentaje: Number(data.percentaje),
      date: new Date(),
      userId: user?.id ?? 1,
    };

    if (currentExpense) {
      await updateGoal(currentExpense.id, formattedData as IUpdateGoal);
      router.push(pathname.split("/").slice(0, -2).join("/"));
      return;
    }

    await createGoal(formattedData as ICreateGoal);
    router.push(pathname.split("/").slice(0, -1).join("/"));
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
  };
}
