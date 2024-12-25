import { siteConfig } from "@/config/site";
import { MainNav } from "./main.nav";
import { MobileNav } from "./mobile-nav";
import { Button } from "../ui/button";
import Link from "next/link";
import { Icons } from "../icons";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { AuthDropdown } from "./auth-dropdown";
import SignoutButton from "../auth/signout-button";
import SignOutButton from "../auth/signout-button";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const BaseHeader = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto items-center gap-2 text-center">
        <div className="flex h-16 items-center lg:px-10 px-5">
          <MainNav items={siteConfig.mainNav} />
          <MobileNav items={siteConfig.mainNav} />

          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button
              variant="outline"
              className="relative size-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
            >
              <MagnifyingGlassIcon
                className="size-4 xl:mr-2"
                aria-hidden="true"
              />
              <span className="hidden xl:inline-flex">Search products...</span>
              <span className="sr-only">Search products</span>
            </Button>
            {/* ------ */}
            <Button
              aria-label="Open cart"
              variant="outline"
              size="icon"
              className="relative"
            >
              <Icons.cart className="size-4" aria-hidden="true" />
            </Button>
            {/* ------ */}
            <nav className="flex items-center space-x-2">
              <AuthDropdown user={session} />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
