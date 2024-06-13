import { NextResponse } from "next/server";
import { COOKIE_NAME } from "./constants/constants.mjs";
import { verifyToken } from "./utils/verifyToken.mjs";

export async function middleware(request) {
  let token = request.cookies.get(COOKIE_NAME)?.value.split("Bearer")[1];
  const pathName = request.nextUrl.pathname;
  if(pathName==="/admin/login" && token){
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (pathName.startsWith("/admin") && pathName !== "/admin/login") {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const isAdmin = await verifyToken();
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/dashboard/:path*"],
};
