"use client";

import * as React from "react";
import Link from "next/link";
import type { MainNavItem } from "@/types";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icons } from "@/components/icons";

interface MainNavProps {
  items?: MainNavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <Icons.logo className="size-7" aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
        <span className="sr-only">Home</span>
      </Link>

      <NavigationMenu className="text-left">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-auto">
              Skin Care
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <Icons.logo className="size-6" aria-hidden="true" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Skin Care
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Description of Skin care products
                      </p>
                      <span className="sr-only">Skin Care</span>
                    </Link>
                  </NavigationMenuLink>
                </li>

                <ListItem key={"Anti Acne1"} title={"Anti Acne"} href={`#`}>
                  dsxv
                </ListItem>
                <ListItem key={"Anti Acne2"} title={"Anti Acne"} href={`#`}>
                  dsxv
                </ListItem>
                <ListItem key={"Anti Acne3"} title={"Anti Acne"} href={`#`}>
                  dsxv
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* ------ */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-auto">
              Other
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <Icons.logo className="size-6" aria-hidden="true" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Skin Care
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Description of Skin care products
                      </p>
                      <span className="sr-only">Skin Care</span>
                    </Link>
                  </NavigationMenuLink>
                </li>

                <ListItem key={"Anti Acne1"} title={"Anti Acne"} href={`#`}>
                  dsxv
                </ListItem>
                <ListItem key={"Anti Acne2"} title={"Anti Acne"} href={`#`}>
                  dsxv
                </ListItem>
                <ListItem key={"Anti Acne3"} title={"Anti Acne"} href={`#`}>
                  dsxv
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* ======== */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
