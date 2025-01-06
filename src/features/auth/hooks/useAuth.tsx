"use client";

import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { IAuth } from "../models/IUser";
import { UseAccountStore } from "../context/useUserStore";

export function useAuth() {
  const { login } = UseAccountStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const initialValues: IAuth = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: IAuth) => {
    setIsLoading(true);
    try {
      await login(values);
      router.push("/dashboard");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required("El correo electrónico es requerido"),
    password: yup.string().required("La contraseña es requerida"),
  });

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
