import { usePathname, useRouter } from "next/navigation";
import * as yup from "yup";

import { useExpenseStore } from "../context/useExpenseStore";
import { ICreateExpense, IExpense, IUpdateExpense } from "../models/IExpense";

import { UseAccountStore } from "@/features/auth/context/useUserStore";

export function useExpensesForm(currentExpense?: IExpense) {
  const user = UseAccountStore((state) => state.user);
  const { createExpense, updateExpense } = useExpenseStore();
  const router = useRouter();
  const pathname = usePathname();

  const initialValues = {
    description: currentExpense?.description || "",
    value: currentExpense?.value || "",
    date: currentExpense?.date || new Date().toISOString(),
    status: currentExpense?.status ?? true,
    typeId: currentExpense?.type.id || null,
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

  const handleCreateCategory = async (name: string) => {};

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    handleCreateCategory,
  };
}
