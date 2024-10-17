import * as yup from "yup";

import { IAuth } from "../models/IUser";

export function useAuth() {
  const initialValues: IAuth = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: IAuth) => {
    console.log("HOLAA");
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required("El correo electrónico es reuqerido"),
    password: yup.string().required("La contrseña es requerida"),
  });

  return { initialValues, handleSubmit, validationSchema };
}
