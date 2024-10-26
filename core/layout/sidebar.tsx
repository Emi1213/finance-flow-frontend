"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { FaPlus } from "react-icons/fa6";

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
    <div className="group flex flex-col gap-4 px-2 py-2 w-60 h-auto  ">
      <nav className="bg-gray-100 grid gap-1 px-2 ">
        <div className="p-10 w-full flex justify-center">
          <Button className="text-white bg-cyan-900 h-20 w-20" radius="full">
            <FaPlus size={25} />
          </Button>
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
                        pathname.includes(
                          module.alias === "dashboard"
                            ? `/dashboard`
                            : `/dashboard/${module.alias}`,
                        ) || selectedModule === module.alias
                          ? "bg-gray-300 text-black"
                          : "bg-gray-100 text-black",
                      )}
                    >
                      <div className="h-auto w-6">
                        <module.icon />
                      </div>
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
