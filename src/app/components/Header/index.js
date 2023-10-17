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
import Image from "next/image";
import { avaReview1 } from "../../../../public/assets";
import { AiOutlineProfile } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";

export default function Header() {
  const [showInput, setShowInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleShowInput = () => {
    setShowInput(!showInput);
  };
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="relative flex items-center justify-between">
      {/* logo */}
      <LogoLink />
      {/* navbar */}
      {!showInput && <Navbar pathname={pathname} />}
      {/* button */}
      <div className="flex items-center gap-3">
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
        <div>
          {session ? (
            // <button
            //   onClick={() => {
            //     signOut();
            //   }}
            // >
            //   sigout
            // </button>
            <div
              className="flex items-center w-12 h-12 cursor-pointer relative"
              onClick={handleShowMenu}
            >
              <Image
                src={avaReview1}
                width={35}
                height={35}
                alt="avatar"
                className="object-cover"
              />
              {showMenu && (
                <div className="w-32 py-2 bg-gray-100 text-black-100 absolute -bottom-[132%] rounded-xl transition-all">
                  <Link
                    href={"/profile"}
                    className="flex gap-2 hover:bg-gray-200"
                  >
                    <AiOutlineProfile size={25} />
                    <span>Profile</span>
                  </Link>

                  <div
                    className="flex gap-2 hover:bg-gray-200"
                    onClick={signOut}
                  >
                    <IoLogOutOutline size={25} />
                    <span>Sign out</span>
                  </div>
                </div>
              )}
            </div>
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
