import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("vendor_token");
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/vendor") && pathname !== "/vendor/login") {
    if (!token) {
      return NextResponse.redirect(new URL("/vendor/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vendor/:path*"],
};