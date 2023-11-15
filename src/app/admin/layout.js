"use client";
import Sidebar from "@/app/components/Sidebar";
import { useSession } from "next-auth/react";

export default function AdminLayout({ children }) {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between bg-slate-100">
      {session?.admin != null ? <Sidebar /> : ""}
      <div className="w-full bg-white flex-grow">
        <div className="h-[60px] w-full bg-[#00cc96]"></div>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
