import { usePathname, useRouter } from "next/navigation";
import * as yup from "yup";

import { useExpenseStore } from "../context/useExpenseStore";
import { ICreateExpense, IExpense, IUpdateExpense } from "../models/IExpense";

export function useExpensesForm(currentExpense?: IExpense) {
  const { createExpense, updateExpense } = useExpenseStore();
  const router = useRouter();
  const pathname = usePathname();

  const initialValues = {
    description: currentExpense?.description || "",
    value: currentExpense?.value || 0,
    date: currentExpense?.date || new Date().toISOString(),
    status: currentExpense?.status || false,
    typeId: currentExpense?.type.id || undefined,
    observation: currentExpense?.observation || "",
  };

  const validationSchema = yup.object().shape({
    description: yup.string().required("Description is required"),
    value: yup.number().required("Value is required"),
    date: yup.string().required("Date is required"),
    status: yup.boolean().required("Status is required"),
    typeId: yup.number().required("Type is required"),
  });

  const handleSubmit = async (data: ICreateExpense | IUpdateExpense) => {
    const formattedData = {
      ...data,
      typeId: Number(data.typeId),
    };

    if (currentExpense) {
      await updateExpense(currentExpense.id, formattedData as IUpdateExpense);
      router.push(pathname.split("/").slice(0, -2).join("/"));

      return;
    }

    await createExpense(formattedData as ICreateExpense);
    router.push(pathname.split("/").slice(0, -1).join("/"));
  };

  const handleCreateCategory = async (name: string) => {};

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    handleCreateCategory,
  };
}
