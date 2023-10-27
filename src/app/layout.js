import { Toaster } from "react-hot-toast";
import Wrapper from "./components/Wrapper";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Providers from "./components/Provider";
import Script from "next/script";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Hygee",
  description: "website Hygee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* Add any global head elements here */}</head>
      <body>
        {/* <!-- Messenger Chat plugin Code --> */}
        <div id="fb-root"></div>

        {/* <!-- Your Chat plugin code --> */}
        <div className="fb-customerchat"></div>
        <Script
          id="messenger-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `{Code within first script tag}`,
          }}
        ></Script>
        <Script
          id="messenger-sdk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `{Code within second script tag}`,
          }}
        ></Script>
        <div className="montserrat">
          {" "}
          {/* Assuming 'montserrat' is a CSS class */}
          <Providers>
            <Wrapper>{children}</Wrapper>
          </Providers>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
