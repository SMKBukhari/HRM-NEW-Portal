import { NextRequest, NextResponse } from "next/server";

// 1. Define strictly public paths (Static)
const publicPaths = ["/", "/signIn", "/signUp"];

export async function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value;
  const { pathname } = request.nextUrl;

  // 2. Bypass static assets/API immediately
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.[a-zA-Z0-9]+$/)
  ) {
    return NextResponse.next();
  }

  // 3. Check if the current path is public
  const isPublicPath = publicPaths.includes(pathname);

  // 4. AUTHENTICATION CHECK
  // If user is NOT logged in and tries to access a protected route
  if (!userId && !isPublicPath) {
    const url = new URL("/signIn", request.url);
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  // 5. REDIRECT LOGGED-IN USERS FROM PUBLIC PAGES
  // If user IS logged in but tries to access /signIn or /signUp, send them to dashboard
  if (userId && isPublicPath && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 6. Allow the request to proceed.
  // Next.js will now try to render the page.
  // If the route doesn't exist (typo), Next.js handles the 404.
  // If the user lacks permission (dynamic route), the Layout handles it.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
