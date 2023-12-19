import { Toaster } from "react-hot-toast";
import Wrapper from "./components/Wrapper";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Providers from "./components/Provider";
import ChatPlugin from "./components/ChatPlugin";
import MiddleWareUser from "./components/middleware/middlewareuser";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "KB&H",
  description: "website Hygee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <ChatPlugin></ChatPlugin>
          <MiddleWareUser>
            <Wrapper>{children}</Wrapper>
          </MiddleWareUser>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
