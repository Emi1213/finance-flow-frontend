"use client";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { usePathname } from "next/navigation";

export const CreateBreadcrumb = () => {
  const pathname = usePathname();

  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
      <BreadcrumbItem href={pathname.slice(0, pathname.lastIndexOf("/"))}>
        Metas de Ahorro
      </BreadcrumbItem>
      <BreadcrumbItem href={pathname}>Create</BreadcrumbItem>
    </Breadcrumbs>
  );
};
