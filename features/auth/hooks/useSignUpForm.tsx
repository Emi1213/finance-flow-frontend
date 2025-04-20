import { useRouter } from "next/navigation";
import * as yup from "yup";

import { UseAccountStore } from "../context/useUserStore";
import { ISignUp } from "../models/ISignUp";

/**
 * Hook que gestiona el formulario de registro de usuarios.
 *
 * - Proporciona los valores iniciales para el formulario de registro.
 * - Valida el correo, contraseña, nombre y apellido del usuario utilizando Yup.
 * - Ejecuta la acción `signUp` para registrar un nuevo usuario.
 * - Redirige al usuario al dashboard después de un registro exitoso.
 *
 * @returns {{
 *   initialValues: ISignUp,
 *   handleSubmit: (values: ISignUp) => Promise<void>,
 *   validationSchema: yup.ObjectSchema
 * }}
 */
export function useSignUpForm() {
  const { signUp } = UseAccountStore();
  const router = useRouter();

  // Valores iniciales para el formulario de registro
  const initialValues: ISignUp = {
    email: "",
    password: "",
    name: "",
    lastname: "",
  };

  /**
   * Envia los datos de registro.
   * - Llama a la acción `signUp` del store.
   * - Redirige al dashboard en caso de éxito.
   *
   * @param {ISignUp} values - Objeto con los datos del nuevo usuario.
   */
  const handleSubmit = async (values: ISignUp) => {
    await signUp(values);
    router.push("/dashboard");
  };

  // Esquema de validación para el formulario de registro
  const validationSchema = yup.object().shape({
    email: yup.string().email().required("El correo electrónico es requerido"),
    password: yup.string().min(6).required("La contraseña es requerida"),
    name: yup.string().required("El nombre es requerido"),
    lastname: yup.string().required("El apellido es requerido"),
  });

  return { initialValues, handleSubmit, validationSchema };
}
