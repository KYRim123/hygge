"use client";
import Image from "next/image";
import Link from "next/link";
import { iconLogo } from "../../../../public/assets";

export default function LogoLink() {
  return (
    <div>
      <Link
        href={"/"}
        className="block w-[100px] h-[100px]"
      >
        <Image
          src={iconLogo}
          width={100}
          height={100}
          alt="logo"
          className="object-cover"
          priority={true}
        />
      </Link>
    </div>
  );
}
