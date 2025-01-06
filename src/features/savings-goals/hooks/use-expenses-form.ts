import { usePathname, useRouter } from "next/navigation";
import * as yup from "yup";

import { useGoalStore } from "../context/useGoalStore";
import { ICreateGoal, IGoal, IUpdateGoal } from "../models/IGoal";

import { UseAccountStore } from "@/features/auth/context/useUserStore";

export function useExpensesForm(currentExpense?: IGoal) {
  const user = UseAccountStore((state) => state.user);
  const { createGoal, updateGoal } = useGoalStore();
  const router = useRouter();
  const pathname = usePathname();

  const initialValues = {
    value: currentExpense?.value || "",
    date: currentExpense?.date || new Date(),
    status: currentExpense?.status ?? true,
    percentaje: currentExpense?.percentaje || 0,
  };

  const validationSchema = yup.object().shape({
    value: yup.number().required("Value is required"),
    status: yup.boolean().required("Status is required"),
  });

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
