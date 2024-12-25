"use client";
import * as React from "react";
import Link from "next/link";

import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOutButton from "../auth/signout-button";

interface AuthDropdownProps
  extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger>,
    ButtonProps {
  user: any | null;
}

export function AuthDropdown({ className, ...props }: AuthDropdownProps) {
  // const session = await getServerSession(authOptions);

  // const handleSignOut = async () => {
  //   try {
  //     await signOut();
  //   } catch (error) {
  //     console.error("Sign out failed:", error);

  //     alert("Sign-out failed, please try again.");
  //   }
  // };

  return (
    <div className="flex gap-2">
      {props.user ? (
        <>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <DropDownMenu user={props.user} />
          </div>
        </>
      ) : (
        <Button
          asChild
          aria-label="Login"
          variant="outline"
          size="icon"
          className="relative"
        >
          <Link href="/signin">
            <Icons.users className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      )}
    </div>
  );
}

async function AuthDropdownGroup() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem asChild>
        <Link href={"/onboarding"}>
          <DashboardIcon className="mr-2 size-4" aria-hidden="true" />
          Dashboard
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dashboard/billing">
          <Icons.credit className="mr-2 size-4" aria-hidden="true" />
          Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dashboard/settings">
          <GearIcon className="mr-2 size-4" aria-hidden="true" />
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}

export default function DropDownMenu({ user }: any) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            asChild
            aria-label="Login"
            variant="outline"
            size="icon"
            className="relative"
          >
            <Link href="/auth/signin">
              <Icons.users className="size-4 " aria-hidden="true" />
            </Link>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            My Account
            <div className="text-muted-foreground text-xs font-normal">
              Hi, {user.token.name}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {user.token.role === "ADMIN" ? (
              <DropdownMenuItem>
                <Link href={"/admin"}>Administration </Link>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            ) : (
              <></>
            )}

            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            {/* <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub> */}
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
