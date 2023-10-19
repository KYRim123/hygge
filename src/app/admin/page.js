"use client";
import Image from "next/image";
import { useState } from "react";
import { avaReview1 } from "../../../public/assets";

export default function Home() {
  const [nameUser, setName] = useState("luong");
  return (
    <div className="flex items-center gap-2">
      <div className="capitalize">Hey, {nameUser}</div>
      <div className="w-[50px] h-[50px] ">
        <Image
          src={avaReview1}
          width={100}
          height={100}
          className="object-cover"
          alt="aa"
        />
      </div>
    </div>
  );
}
