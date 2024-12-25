import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { roles } from "./db/schema/users";

export async function middleware(request: NextRequest) {
  const { pathname }: { pathname: string } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect to login page if there's no token
  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Redirect to /page if request url /signin
  // if (pathname.startsWith("/signin") && token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // Redirect if user does not have admin access
  // if (
  //   (!token.role && pathname.startsWith("/admin/")) ||
  //   pathname.startsWith("/admin/")
  // ) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }

  // // Redirect if user does not have admin access
  // if (userRole !== 'admin' && adminRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // // Redirect if user does not have user access
  // if (userRole !== 'user' && userRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  if (token.role !== "ADMIN" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
};
