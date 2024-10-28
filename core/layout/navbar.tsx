"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { Avatar } from "@nextui-org/avatar";

import { ThemeSwitch } from "@/shared/components/theme-switch";

export const Navbar = () => {
  return (
    <NextUINavbar className="shadow-md " maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">FINANCE FLOW</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className=" basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <Avatar
          showFallback
          size="sm"
          src="https://images.unsplash.com/broken"
        />
      </NavbarContent>
    </NextUINavbar>
  );
};
