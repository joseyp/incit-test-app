import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const userToken = request.cookies.get("auth_token")?.value;

//   if (!userToken) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   if (
//     request.nextUrl.pathname === "/" ||
//     request.nextUrl.pathname === "/sign-in" ||
//     request.nextUrl.pathname === "/sign-up"
//   ) {
//     if (userToken) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }
//   }

//   // return NextResponse.redirect(new URL("/profile", request.url));
//   return NextResponse.next();
// }

export function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request;
  const loginCookie = cookies.get("auth_token");

  if (
    !loginCookie &&
    !["/sign-in", "/sign-up", "/"].includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl.origin));
  }

  if (loginCookie && ["/sign-in", "/sign-up", "/"].includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
