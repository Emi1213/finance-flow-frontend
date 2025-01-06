import { useRouter } from "next/navigation";
import * as yup from "yup";

import { UseAccountStore } from "../context/useUserStore";
import { ISignUp } from "../models/ISignUp";

export function useSignUpForm() {
  const { signUp } = UseAccountStore();
  const router = useRouter();

  const initialValues: ISignUp = {
    email: "",
    password: "",
    name: "",
    lastname: "",
  };

  const handleSubmit = async (values: ISignUp) => {
    await signUp(values);
    router.push("/dashboard");
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("El correo electrónico es requerido"),
    password: yup.string().required("La contraseña es requerida"),
    name: yup.string().required("El nombre es requerido"),
    lastname: yup.string().required("El apellido es requerido"),
  });

  return { initialValues, handleSubmit, validationSchema };
}
