"use client";

import { Card } from "@nextui-org/card";
import { Form, Formik } from "formik";
import { Button } from "@nextui-org/button";

import { IExpense } from "../../models/IExpense";
import { useExpensesForm } from "../../hooks/use-expenses-form";
import { FMKInput } from "../../../../shared/components/formik/FormikInput";
import { FMKSwitch } from "../../../../shared/components/formik/FormikSwitch";
import { FMKSelect } from "../../../../shared/components/formik/FormikSelect";
import { useExpenseTypeStore } from "../../../expenses-types/context/useExpenseTypeStore";

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

  const { types } = useExpenseTypeStore();

  console.log("deweee" + types);

  return (
    <div>
      <Card>
        <Formik
          enableReinitialize
          initialValues={initialValues as any}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <FMKInput label="Descripción" name="description" />
              <FMKInput label="Valor" name="value" type="number" />
              <FMKInput label="Fecha" name="date" type="date" />
              <FMKInput label="Observación" name="observation" />
              <FMKSelect
                label="Tipo"
                name="type"
                options={types}
                onCreateCategory={handleCreateCategory}
              />
              <FMKSwitch label="Pagado" name="status" />

              <Button type="submit">Guardar</Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};
