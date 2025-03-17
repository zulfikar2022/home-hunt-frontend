/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../utils/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const publicRoutes = ["/login", "/signup"];
  const defaultRoutes = ["/", "/about", "/contact"];

  const roleRoutes: Record<string, string> = {
    "/admin": "admin",
    "/tenant": "tenant",
    "/landlord": "landlord",
  };

  if (!token) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    if (defaultRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(`/login`, req.url));
  }

  try {
    const user = verifyToken(token);
    const userRole = user.role;

    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }

    if (defaultRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL(`/${userRole}${pathname}`, req.url));
    }

    for (const [routePrefix, requiredRole] of Object.entries(roleRoutes)) {
      if (pathname.startsWith(routePrefix) && userRole !== requiredRole) {
        return NextResponse.redirect(new URL(`/${userRole}`, req.url));
      }
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/about",
    "/contact",
    "/login",
    "/signup",
    "/admin/:path*",
    "/tenant/:path*",
    "/landlord/:path*",
  ],
};
