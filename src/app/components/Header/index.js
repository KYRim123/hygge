"use client";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { useState } from "react";
import { iconLogo } from "../../../../public/assets";

export default function Header() {
  const [showInput, setShowInput] = useState(false);

  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  return (
    <div className="relative flex items-center justify-between">
      {/* logo */}
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
      {/* menu */}
      <div className="flex flex-col gap-1 bg-gray-100 h-[50px] w-[50px] items-center justify-center rounded-full cursor-pointer">
        <span className="w-7 h-[3px] bg-black-100 "></span>
        <span className="w-7 h-[3px] bg-black-100 "></span>
      </div>
      {/* button */}
      <div className="flex items-center gap-5">
        {/* search */}
        <div className="absolute right-24">
          {!showInput && (
            <FiSearch
              size={25}
              className="cursor-pointer"
              onClick={handleShowInput}
            />
          )}
          {showInput && (
            <div className="flex gap-1 px-5 py-2 border-2 rounded-3xl border-gray-100 animate-showInput">
              <FiSearch
                size={25}
                className="cursor-pointer"
                onClick={handleShowInput}
              />
              <input
                type="text"
                placeholder="Search your products"
                className="outline-none"
              />
            </div>
          )}
        </div>
        {/* cart */}
        <div className="cursor-pointer relative">
          <span className="absolute -right-1 bg-pink-500 p-[6.5px] rounded-full"></span>
          <LuShoppingCart size={25} />
        </div>
        {/* account */}
        <div className="cursor-pointer">
          <Link href={"/sign-in"}>
            <GoPerson size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
}
