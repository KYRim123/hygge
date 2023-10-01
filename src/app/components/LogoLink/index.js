"use client";
import Image from "next/image";
import Link from "next/link";
import { iconLogo } from "../../../../public/assets";

export default function LogoLink() {
  return (
    <div>
      <Link href={"/"}>
        <Image
          src={iconLogo}
          width={150}
          height={50}
          alt="logo"
          style={{ objectFit: "contain", width: "auto", height: "auto" }}
          priority={false}
        />
      </Link>
    </div>
  );
}
