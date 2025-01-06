"use client";

import { Card } from "@nextui-org/card";
import { Form, Formik } from "formik";
import { Button } from "@nextui-org/button";

import { IGoal } from "../../models/IGoal";
import { useExpensesForm } from "../../hooks/use-expenses-form";
import { FMKInput } from "../../../../shared/components/formik/FormikInput";
import { FMKSwitch } from "../../../../shared/components/formik/FormikSwitch";
import { FMKDatePicker } from "../../../../shared/components/formik/FormikDatPicker";

export const NewEditForm = ({ currentGoal }: { currentGoal?: IGoal }) => {
  const { initialValues, handleSubmit, validationSchema } =
    useExpensesForm(currentGoal);

  return (
    <div className="m-4">
      <Card>
        <Formik
          enableReinitialize
          initialValues={initialValues as any}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="flex flex-col gap-5 py-12 px-14">
                <FMKInput
                  label="Sueldo que percibe en el mes"
                  name="value"
                  type="number"
                  onChange={(e) => {
                    const newValue = e.target.value;

                    if (values.percentaje) {
                      const calculatedAmount =
                        (Number(newValue) * Number(values.percentaje)) / 100;

                      setFieldValue("amount", calculatedAmount);
                    }
                  }}
                />
                <div className="flex gap-10">
                  <FMKInput
                    label="Porcentaje de ahorro"
                    name="percentaje"
                    type="number"
                    onChange={(e) => {
                      const newPercentage = e.target.value;

                      if (values.value) {
                        const calculatedAmount =
                          (Number(values.value) * Number(newPercentage)) / 100;

                        setFieldValue("amount", calculatedAmount);
                      }
                    }}
                  />
                  <FMKInput
                    disabled
                    label="Monto de Ahorro"
                    name="amount"
                    type="number"
                  />
                  <FMKDatePicker label="Fecha" name="date" />
                </div>
                <FMKSwitch label="Cumplido" name="status" />

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
