import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import SignOutButton from "../auth/signout-button";

export function HeaderNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="w-full mx-auto px-10 py-4 border-b border-border">
      <div className="flex justify-between items-center">
        <nav
          className={cn(
            "flex items-center space-x-4 lg:space-x-6 inset-x-0 top-0 z-50 bg-white",
            className
          )}
          {...props}
        >
          <Link
            href="/examples/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Overview
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Customers
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
