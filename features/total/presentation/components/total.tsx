"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useEffect, useState } from "react";
import { FaBalanceScale } from "react-icons/fa";

import { TotalDatasourceImpl } from "../../services/Datasource";
import { ITotal } from "../../models/ITotal";

export const TotalCard = ({
  userId,
  year,
  month,
}: {
  userId: string;
  year: string;
  month: string;
}) => {
  const [total, setTotal] = useState<ITotal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        setLoading(true);
        const total = await TotalDatasourceImpl.getInstance().getTotal(
          userId,
          year,
          month,
        );

        setTotal(total);
      } catch (error) {
        console.error("Error fetching total incomes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotal();
  }, [userId, month, year]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!total) {
    return <div>No total data available</div>;
  }

  return (
    <Card className="py-4 w-full h-full ">
      <div className="flex w-full h-full justify-center items-center">
        <div className="w-full h-full pb-6">
          <CardHeader className="pb-0 pt-2 px-8 flex-col items-start w-full">
            <p className="text-base uppercase font-bold">Balance:</p>
            <p className="font-medium">${total.total}</p>
          </CardHeader>
        </div>
        <div className="w-full">
          <CardBody className="w-full">
            <div className="flex justify-center items-center">
              <div className="flex rounded-full bg-blue-900 h-20 w-20 justify-center items-center">
                <FaBalanceScale color="white" size={26} />
              </div>
            </div>
          </CardBody>
        </div>
      </div>
    </Card>
  );
};
