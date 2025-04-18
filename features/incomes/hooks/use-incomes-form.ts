import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import * as yup from "yup";

import { ICreateIncome, IIncome, IUpdateIncome } from "../models/IIncome";
import { useIncomeStore } from "../context/useIncomeStore";

import { UseAccountStore } from "@/features/auth/context/useUserStore";

/**
 * Hook que gestiona el formulario de creación y edición de ingresos.
 *
 * - Define los valores iniciales del formulario con base en `currentIncome` (si existe).
 * - Valida los campos usando Yup (requeridos: descripción, valor, fecha, estado, tipo).
 * - Maneja el envío del formulario, diferenciando entre crear o actualizar ingresos.
 * - Redirige al usuario al finalizar según el path actual.
 *
 * @param {IIncome} [currentIncome] - Objeto de ingreso actual (si se está editando).
 * @returns {{
 *   initialValues: Object,
 *   validationSchema: yup.ObjectSchema,
 *   handleSubmit: Function
 * }}
 */
export function useIncomesForm(currentIncome?: IIncome) {
  const user = UseAccountStore((state) => state.user);
  const { createIncome, updateIncome } = useIncomeStore();

  const router = useRouter();
  const pathname = usePathname();

  const initialValues = {
    description: currentIncome?.description || "",
    value: currentIncome?.value || "",
    date: currentIncome?.date || new Date(),
    status: currentIncome?.status ?? true,
    typeId: currentIncome?.type.id || null,
    observation: currentIncome?.observation || "",
  };

  const validationSchema = yup.object().shape({
    description: yup.string().required("Description is required"),
    value: yup.number().required("Value is required"),
    date: yup.date().required("Date is required"),
    status: yup.boolean().required("Status is required"),
    typeId: yup.number().required("Type is required"),
  });

  const handleSubmit = async (data: ICreateIncome | IUpdateIncome) => {
    const formattedData = {
      ...data,
      typeId: Number(data.typeId),
      userId: user?.id ?? 1,
    };

    if (currentIncome) {
      await updateIncome(currentIncome.id, formattedData as IUpdateIncome);
      router.push(pathname.split("/").slice(0, -2).join("/"));
      return;
    }

    await createIncome(formattedData as ICreateIncome);
    router.push(pathname.split("/").slice(0, -1).join("/"));
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
  };
}
