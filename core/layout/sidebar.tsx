"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import clsx from "clsx";

import { IModule } from "@/shared/interfaces/IModule";
import { cn } from "@/lib/utils";

interface SidebarProps {
  modules: IModule[];
}

export function Sidebar({ modules }: SidebarProps) {
  const pathname = usePathname();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleModuleClick = (alias: string) => {
    setSelectedModule(alias);
  };

  return (
    <div className="group flex flex-col gap-4  w-60 h-full">
      <nav className={clsx("flex flex-col gap-2 px-2 h-full")}>
        <div className="p-10 w-full flex justify-center">
          <div className="h-20 w-20  " />
        </div>
        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex}>
            <ul className="flex flex-col gap-1">
              <li key={moduleIndex}>
                <Tooltip content={module.name} placement="right">
                  <Link
                    href={
                      module.alias === "dashboard"
                        ? `/dashboard`
                        : `/dashboard/${module.alias}`
                    }
                    onClick={() => handleModuleClick(module.alias)}
                  >
                    <Button
                      className={cn(
                        "h-12 w-full justify-start",
                        pathname === "/dashboard" &&
                          module.alias === "dashboard"
                          ? "bg-gray-400 text-white"
                          : pathname.includes(`/dashboard/${module.alias}`) ||
                              selectedModule === module.alias
                            ? "bg-gray-400 text-black"
                            : "bg-gray-50 text-black",
                      )}
                    >
                      <div className="h-auto w-6" />
                      <span className="ml-2">{module.name}</span>
                    </Button>
                  </Link>
                </Tooltip>
              </li>
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
