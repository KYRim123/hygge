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
    const firstSegment = location?.pathname?.split("/")[1];
    if (session?.admin && firstSegment != "admin") {
      router.push("/admin");
    } else if (session?.user && location?.pathname == "/login") {
      router.push("/");
      return null;
    }
  }, [status, router]);

  return status == "loading" ? null : children;
}

export default MiddleWareAdmin;
