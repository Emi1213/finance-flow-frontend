import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { Avatar } from "@nextui-org/avatar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";

import { ThemeSwitch } from "@/shared/components/theme-switch";
import { IModule } from "@/shared/interfaces/IModule";
import { cn } from "@/lib/utils";

// Define the type for icons if necessary
interface NavProps {
  isCollapsed: boolean;
  modules: IModule[];
}

export const Navbar = ({ modules, isCollapsed }: NavProps) => {
  const pathname = usePathname();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">FINANCE FLOW</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <Avatar
          showFallback
          size="sm"
          src="https://images.unsplash.com/broken"
        />
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {modules.map((module, moduleIndex) => (
            <div key={moduleIndex}>
              <h3
                className={cn(
                  "py-2 text-lg font-semibold text-muted-foreground",
                  isCollapsed && "text-sm",
                )}
              >
                {!isCollapsed ? module.name : module.alias.toUpperCase()}
              </h3>
              <ul className="flex flex-col gap-1">
                <li key={moduleIndex}>
                  <Tooltip
                    content={module.name}
                    isDisabled={!isCollapsed}
                    placement="right"
                  >
                    <Link href={`/dashboard/${module.alias}`}>
                      <Button
                        className={cn(
                          "h-12 w-full justify-start",
                          pathname.includes(`/dashboard/${module.alias}`)
                            ? "bg-primary text-white"
                            : "bg-secondary text-secondary-foreground",
                        )}
                        isIconOnly={isCollapsed}
                      >
                        <div className="h-auto w-6">
                          <module.icon />{" "}
                        </div>
                        {!isCollapsed && (
                          <span className="ml-2">{module.name}</span>
                        )}
                      </Button>
                    </Link>
                  </Tooltip>
                </li>
              </ul>
            </div>
          ))}
        </nav>
      </NavbarContent>
    </NextUINavbar>
  );
};
