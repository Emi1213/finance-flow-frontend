"use client";

import { Form, Formik } from "formik";
import { Button } from "@nextui-org/button";

import { useAuth } from "../../hooks/useAuth";
import { FMKInput } from "../../../../shared/components/formik/FormikInput";

export const LoginForm = () => {
  const { initialValues, handleSubmit, validationSchema } = useAuth();

  return (
    <Formik
      className="w-full"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="flex flex-col gap-4 justify-center w-full items-center px-12">
          <FMKInput label="Email" name="email" />
          <FMKInput label="Password" name="password" type="password" />
          <Button
            className="bg-sky-900 text-white p-8 text-base font-semibold mt-2"
            type="submit"
          >
            Iniciar sesión
          </Button>
        </Form>
      )}
    </Formik>
  );
};
