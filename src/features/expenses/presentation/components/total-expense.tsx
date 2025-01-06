"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

import { ITotalExpense } from "../../models/IExpense";
import { ExpenseDatasourceImpl } from "../../services/Datasource";

export const TotalExpenseCard = ({
  userId,
  year,
  month,
}: {
  userId: string;
  year: string;
  month: string;
}) => {
  const [totalExpense, setTotalExpense] = useState<ITotalExpense | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTotalExpenses = async () => {
      try {
        setLoading(true);
        const expenses =
          await ExpenseDatasourceImpl.getInstance().getTotalExpenses(
            userId,
            year,
            month,
          );

        setTotalExpense(expenses);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchTotalExpenses();
  }, [userId, month, year]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!totalExpense) {
    return <div>No expense data available</div>;
  }

  return (
    <Card className="py-4 w-full h-full ">
      <div className="flex w-full h-full justify-center items-center">
        <div className="w-full h-full pb-6">
          <CardHeader className="pb-0 pt-2 px-8 flex-col items-start w-full">
            <p className="text-base uppercase font-bold">Gastos:</p>
            <p className="font-medium">${totalExpense.total}</p>
          </CardHeader>
        </div>
        <div className="w-full">
          <CardBody className=" w-full ">
            <div className="flex justify-center items-center">
              <div className="flex  rounded-full bg-red-600 h-20 w-20 justify-center items-center">
                <FaArrowUp color="white" size={25} />
              </div>
            </div>
          </CardBody>
        </div>
      </div>
    </Card>
  );
};
