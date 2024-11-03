"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import toast from "react-hot-toast";

import { ITotalIncome } from "../../models/IIncome";
import { IncomeDatasourceImpl } from "../../services/Datasource";

export const TotalIncomeCard = ({
  userId,
  year,
  month,
}: {
  userId: string;
  year: string;
  month: string;
}) => {
  const [totalIncome, setTotalIncome] = useState<ITotalIncome | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        setLoading(true);
        const incomes =
          await IncomeDatasourceImpl.getInstance().getTotalIncomes(
            userId,
            year,
            month,
          );

        setTotalIncome(incomes);
      } catch (error) {
        toast.error("Error fetching total income" + error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalIncome();
  }, [userId, month, year]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!totalIncome) {
    return <div>No income data available</div>;
  }

  return (
    <Card className="py-4 w-full h-full ">
      <div className="flex w-full h-full justify-center items-center">
        <div className="w-full h-full pb-6">
          <CardHeader className="pb-0 pt-2 px-8 flex-col items-start w-full">
            <p className="text-base uppercase font-bold">Ingresos:</p>
            <p className="font-medium">${totalIncome.total}</p>
          </CardHeader>
        </div>
        <div className="w-full">
          <CardBody className="w-full">
            <div className="flex justify-center items-center">
              <div className="flex rounded-full bg-green-600 h-20 w-20 justify-center items-center">
                <FaArrowDown color="white" size={25} />
              </div>
            </div>
          </CardBody>
        </div>
      </div>
    </Card>
  );
};
