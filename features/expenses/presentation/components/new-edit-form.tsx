"use client";

import { Card } from "@nextui-org/card";
import { Form, Formik } from "formik";
import { Button } from "@nextui-org/button";
import { useEffect } from "react";

import { IExpense } from "../../models/IExpense";
import { useExpensesForm } from "../../hooks/use-expenses-form";
import { FMKInput } from "../../../../shared/components/formik/FormikInput";
import { FMKSwitch } from "../../../../shared/components/formik/FormikSwitch";
import { FMKTextArea } from "../../../../shared/components/formik/FormikTextArea";
import { FMKDatePicker } from "../../../../shared/components/formik/FormikDatPicker";
import { FMKSelect } from "../../../../shared/components/formik/FormikSelect";

import { useExpenseTypeStore } from "@/features/expenses-types/context/useExpenseTypeStore";
import { IExpenseType } from "@/features/expenses-types/models/IExpenseType";

export const NewEditForm = ({
  currentExpense,
}: {
  currentExpense?: IExpense;
}) => {
  const { initialValues, handleSubmit, validationSchema } =
    useExpensesForm(currentExpense);

  const { types, getAllTypes } = useExpenseTypeStore();

  useEffect(() => {
    getAllTypes();
  }, []);

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
                  <FMKDatePicker label="Fecha" name="date" />
                </div>
                <FMKSelect
                  label="Categoria"
                  name="typeId"
                  options={types.map((type: IExpenseType) => ({
                    label: type.name,
                    value: type.id,
                  }))}
                />
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
