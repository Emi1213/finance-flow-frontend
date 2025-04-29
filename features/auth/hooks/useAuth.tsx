"use client";

import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { IAuth } from "../models/IUser";
import { UseAccountStore } from "../context/useUserStore";

/**
 * Hook que gestiona la autenticación de usuarios.
 *
 * - Proporciona valores iniciales para el formulario de login.
 * - Valida el correo y la contraseña usando Yup.
 * - Controla el estado de carga (`isLoading`) durante la petición.
 * - Ejecuta el login y redirige a `/dashboard` en caso de éxito.
 * - Permite navegar a la página de registro.
 *
 * @returns {{
 *   initialValues: IAuth,
 *   handleSubmit: (values: IAuth) => Promise<void>,
 *   validationSchema: yup.ObjectSchema,
 *   handleRegister: () => void,
 *   isLoading: boolean
 * }}
 */
export function useAuth() {
  const { login } = UseAccountStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Valores iniciales del formulario de autenticación
  const initialValues: IAuth = {
    email: "",
    password: "",
  };

  /**
   * Envía los datos de login.
   * - Muestra el spinner de carga.
   * - Llama a la acción `login` del store.
   * - Redirige a la ruta /dashboard si el login es exitoso.
   * - Oculta el spinner al finalizar.
   *
   * @param {IAuth} values - Objeto con email y password.
   */
  const handleSubmit = async (values: IAuth) => {
    setIsLoading(true);
    try {
      await login(values);
      router.push("/dashboard");
    } catch (error) {
      // Aquí podrías manejar errores (p.ej. notificar al usuario)
    } finally {
      setIsLoading(false);
    }
  };

  // Esquema de validación para el formulario de login
  const validationSchema = yup.object().shape({
    email: yup.string().required("El correo electrónico es requerido"),
    password: yup.string().min(6).required("La contraseña es requerida"),
  });

  /**
   * Redirige a la página de registro (/signup).
   */
  const handleRegister = () => {
    router.push("/signup");
  };

  return {
    initialValues,
    handleSubmit,
    validationSchema,
    handleRegister,
    isLoading,
  };
}
