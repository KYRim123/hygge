export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/search/:path*",
    "/category/:path*",
    "/product/:path*",
    "/shoppingCart/:path*",
    "/cart/:path*",
  ],
};
