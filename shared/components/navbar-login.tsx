import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import { ThemeSwitch } from "@/shared/components/theme-switch";

export const NavbarLogin = () => {
  return (
    <NextUINavbar className="w-full" maxWidth="xl" position="sticky">
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="start"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 " justify="start">
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};
