export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/search/:path*", "/products/:path*", "/shoppingCart/:path*", "/cart/:path*", "/admin/:path*"],
};
