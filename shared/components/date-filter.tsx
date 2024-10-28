"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface DateFilterProps {
  onMonthYearChange: (date: { month: number; year: number }) => void;
}

export const DateFilter = ({ onMonthYearChange }: DateFilterProps) => {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handleMonthChange = (direction: "prev" | "next") => {
    setMonth((prevMonth) => {
      if (direction === "next") {
        return prevMonth === 12 ? 1 : prevMonth + 1;
      } else {
        return prevMonth === 1 ? 12 : prevMonth - 1;
      }
    });

    setYear((prevYear) => {
      if (direction === "next" && month === 12) return prevYear + 1;
      if (direction === "prev" && month === 1) return prevYear - 1;

      return prevYear;
    });
  };

  useEffect(() => {
    onMonthYearChange({ month, year });
  }, [month, year, onMonthYearChange]);

  return (
    <div className="flex items-center gap-4">
      <Button isIconOnly onPress={() => handleMonthChange("prev")}>
        <FaArrowLeft />
      </Button>

      <span className="text-xl font-semibold">
        {monthNames[month - 1]} {year}
      </span>

      <Button isIconOnly onPress={() => handleMonthChange("next")}>
        <FaArrowRight />
      </Button>
    </div>
  );
};
