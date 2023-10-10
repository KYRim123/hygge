import WrapperAdmin from "@/app/components/WrapperAdmin";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <WrapperAdmin>{children}</WrapperAdmin>
        <Toaster />
      </body>
    </html>
  );
}
