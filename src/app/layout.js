import { Toaster } from "react-hot-toast";
import Wrapper from "./components/Wrapper";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Providers from "./components/Provider";
import ChatPlugin from "./components/ChatPlugin";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Hygee",
  description: "website Hygee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <ChatPlugin></ChatPlugin>
          <Wrapper>{children}</Wrapper>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
