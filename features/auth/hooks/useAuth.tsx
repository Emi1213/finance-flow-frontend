import * as yup from "yup";
import { useRouter } from "next/navigation";

import { IAuth } from "../models/IUser";
import { UseAccountStore } from "../context/useUserStore";

export function useAuth() {
  const { login } = UseAccountStore();
  const router = useRouter();
  const initialValues: IAuth = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: IAuth) => {
    await login(values);
    router.push("/dashboard");
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required("El correo electrónico es reuqerido"),
    password: yup.string().required("La contrseña es requerida"),
  });

  return { initialValues, handleSubmit, validationSchema };
}
