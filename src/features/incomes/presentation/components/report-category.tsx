"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import toast from "react-hot-toast";

import { IncomeDatasourceImpl } from "../../services/Datasource";
import { IIncomeCategoryReport } from "../../models/IIncome";

import { options } from "@/shared/utils/report-utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategoryReport = ({
  userId,
  year,
  month,
}: {
  userId: string;
  year: string;
  month: string;
}) => {
  const [data, setData] = useState<{ labels: string[]; datasets: any[] }>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await IncomeDatasourceImpl.getInstance().getIncomeById(
          userId,
          year,
          month,
        );
        const labels = result.map(
          (item: IIncomeCategoryReport) => item.type.name,
        );
        const totals = result.map((item: IIncomeCategoryReport) => item.total);

        setData({
          labels,
          datasets: [
            {
              label: "Ingresos por Categoría",
              data: totals,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FFCD56",
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FFCD56",
              ],
            },
          ],
        });
      } catch (error) {
        toast.error("Error fetching income data: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, year, month]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="w-full min-h-full flex justify-center items-center bg-white rounded-lg p-6 ">
      <Pie data={data} options={options} />
    </div>
  );
};
