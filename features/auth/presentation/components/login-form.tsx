"use client";

import { Form, Formik } from "formik";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";

import { useAuth } from "../../hooks/useAuth";
import { FMKInput } from "../../../../shared/components/formik/FormikInput";

export const LoginForm = () => {
  const { initialValues, handleSubmit, validationSchema, handleRegister } =
    useAuth();

  return (
    <Formik
      className="w-full"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="flex flex-col gap-1 justify-center w-full h-full items-center px-12 mt-6">
          <FMKInput label="Email" name="email" />
          <FMKInput label="Password" name="password" type="password" />

          <Button
            className="bg-sky-900 text-white p-6 text-base font-semibold mt-9"
            type="submit"
          >
            Iniciar sesión
          </Button>

          <Chip
            className="mt-4"
            color="primary"
            variant="bordered"
            onClick={handleRegister}
          >
            Registrarse ahora
          </Chip>
        </Form>
      )}
    </Formik>
  );
};
