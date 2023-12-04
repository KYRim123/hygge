export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/bill/:path*",
    "/purchase",
    "/shoppingCart",
    "/admin",
    "/checkout",
    "/((?!login|search||products|about|contact|faq|api|_next|static|favicon.ico).*)",
    "/admin/((?!login).*)",
  ],
};