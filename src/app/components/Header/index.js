"use client";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { useState } from "react";
import Navbar from "../Navbar";
import { usePathname } from "next/navigation";
import LogoLink from "../LogoLink";
import { signOut, useSession } from "next-auth/react";
 
export default function Header() {
  const [showInput, setShowInput] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  return (
    <header className="relative flex items-center justify-between">
      {/* logo */}
      <LogoLink />
      {/* navbar */}
      {!showInput && <Navbar pathname={pathname} />}
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
          <Link href={"/shoppingCart"}>
            <span className="absolute -right-1 bg-pink-500 p-[6.5px] rounded-full"></span>
            <LuShoppingCart size={25} />
          </Link>
        </div>
        {/* account */}
        <div className="cursor-pointer">
          {session ? (
            <button
              onClick={() => {
                signOut();
              }}
            >
              sigout
            </button>
          ) : (
            <Link href={"/login"}>
              <GoPerson size={25} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
