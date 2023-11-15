"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function MiddleWareAdmin({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "loading") {
      return;
    }
    if (!session?.admin && location.pathname != "/admin/login") {
      if (session?.user) {
        router.push("/");
      } else {
        router.push("/login");
      }
    }
    if (session?.admin && location.pathname == "/admin/login") {
      router.push("/admin");
    }
  }, [status, router]);

  return status == "loading" ? null : children;
}

export default MiddleWareAdmin;
