"use client ";

import { Form, Formik } from "formik";
import { Button } from "@nextui-org/button";

import { useSignUpForm } from "../../hooks/useSignUpForm";

import { FMKInput } from "@/shared/components/formik/FormikInput";

export const SignUpForm = () => {
  const { handleSubmit, initialValues, validationSchema } = useSignUpForm();

  return (
    <Formik
      className="w-full"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="w-full mx-16 flex flex-col gap-1 ">
          <FMKInput label="Email" name="email" type="email" />
          <FMKInput label="Password" name="password" type="password" />
          <FMKInput label="Name" name="name" />
          <FMKInput label="Lastname" name="lastname" />
          <Button
            className="bg-sky-900 text-white text-center p-6 text-base font-semibold mt-4"
            type="submit"
          >
            Registrarse
          </Button>
        </Form>
      )}
    </Formik>
  );
};
