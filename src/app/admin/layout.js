"use client";
import Sidebar from "@/app/components/Sidebar";
import { useSession } from "next-auth/react";
import MiddleWareAdmin from "../components/middleware/middlewareadmin";
import HeaderAdmin from "../components/HeaderAdmin";

export default function AdminLayout({ children }) {
  const { data: session } = useSession();
  return (
    <MiddleWareAdmin>
      <div className="flex justify-between bg-slate-100">
        {session?.admin != null ? <Sidebar /> : ""}
        <div className="w-full bg-white flex-grow">
          <HeaderAdmin></HeaderAdmin>
          <div className="">{children}</div>
        </div>
      </div>
    </MiddleWareAdmin>
  );
}
