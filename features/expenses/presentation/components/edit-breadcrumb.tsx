"use client";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { usePathname } from "next/navigation";

export const EditBreadcrumb = () => {
  const pathname = usePathname();

  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
      <BreadcrumbItem href={pathname.split("/").slice(0, -2).join("/")}>
        Expenses
      </BreadcrumbItem>
      <BreadcrumbItem href={pathname}>Edit</BreadcrumbItem>
    </Breadcrumbs>
  );
};
