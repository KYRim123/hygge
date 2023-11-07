"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import MarginY from "./MarginY";
import { usePathname } from "next/navigation";
import Chatbox from "./chatbox";

export default function Wrapper({ children }) {
  const pathname = usePathname();

  if (pathname.includes("admin")) {
    return children;
  }

  return (
    <div className="flex justify-center py-10 px-5 overflow-x-hidden">
      <div className="w-[1250px]">
        <Header />
        <MarginY>{children}</MarginY>
        <Chatbox />
        <Footer />
      </div>
    </div>
  );
}
