"use client";

import { Card } from "@nextui-org/card";
import { Form, Formik } from "formik";
import { Button } from "@nextui-org/button";

import { IExpense } from "../../models/IExpense";
import { useExpensesForm } from "../../hooks/use-expenses-form";
import { FMKInput } from "../../../../shared/components/formik/FormikInput";
import { FMKSwitch } from "../../../../shared/components/formik/FormikSwitch";
import { FMKTextArea } from "../../../../shared/components/formik/FormikTextArea";

export const NewEditForm = ({
  currentExpense,
}: {
  currentExpense?: IExpense;
}) => {
  const {
    initialValues,
    handleSubmit,
    validationSchema,
    handleCreateCategory,
  } = useExpensesForm(currentExpense);

  return (
    <div className="m-4">
      <Card>
        <Formik
          enableReinitialize
          initialValues={initialValues as any}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="flex flex-col gap-5 py-12 px-14">
                <FMKInput label="Descripción" name="description" />
                <div className="flex gap-10">
                  <FMKInput label="Valor" name="value" type="number" />
                  <FMKInput label="Fecha" name="date" type="date" />
                </div>
                {/* <FMKSelect
                label="Tipo"
                name="type"
                options={types}
                onCreateCategory={handleCreateCategory}
              /> */}
                <FMKSwitch label="Pagado" name="status" />
                <FMKTextArea label="Observación" name="observation" />

                <div className="flex gap-8">
                  <Button className="w-1/2" type="submit">
                    Guardar
                  </Button>
                  <Button className="w-1/2">Cancelar</Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};
