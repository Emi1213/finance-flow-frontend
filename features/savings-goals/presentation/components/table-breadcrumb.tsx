"use client";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { usePathname } from "next/navigation";

export const TableBreadcrumb = () => {
  const pathname = usePathname();

  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
      <BreadcrumbItem href={pathname.split("/").slice(0, -2).join("/")}>
        Metas de ahorro
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};
