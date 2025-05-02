"use client";

import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import NextLink from "next/link";

import LanguageSwitch from "./language-switch";

import { siteConfig } from "@/config/site";
import { useTranslation } from "@/hooks/useTranslation";

export const Navbar = ({
  logo,
  className,
}: Readonly<{
  logo: React.ReactNode;
  className: string;
}>) => {
  const { t, isLoaded } = useTranslation();

  if (!isLoaded) return null;

  return (
    <HeroUINavbar className={clsx(className)} maxWidth="xl" position="static">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1 noselect"
            href="/"
          >
            {logo}
            <h1 className={clsx(`text-xl font-space-crusaders`)}>VNExos</h1>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:flex gap-4 justify-start mx-10">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium uppercase",
                )}
                color="foreground"
                href={item.href}
              >
                {t(item.label)}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2" />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="uppercase" color="foreground" href="#" size="lg">
                {t(item.label)}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
      <div className="ml-auto">
        <LanguageSwitch />
      </div>
    </HeroUINavbar>
  );
};
