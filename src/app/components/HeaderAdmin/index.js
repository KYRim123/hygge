"use client";
import Link from "next/link";
import { GoPerson } from "react-icons/go";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { avaReview1 } from "../../../../public/assets";
import { AiOutlineProfile} from "react-icons/ai";
import { IoLogOutOutline, IoNotifications } from "react-icons/io5";
import styles from "./input.module.css";
import axios from "axios";

export default function HeaderAdmin() {
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const menuBtn = [
    { nameMenu: "profile", url: "/profile", Icon: AiOutlineProfile },
    { nameMenu: "sign out", Icon: IoLogOutOutline, onClick: () => signOut() },
  ];
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="relative flex items-center justify-end pr-[80px] shadow-md">
      <div className="flex items-center gap-3">
        <div className={`${"cursor-pointer relative"} ${styles.icon_shopping_cart}`}>
          <Link
            href={"/shoppingCart"}
            className={styles.link_shopping_cart}
          >
            <span className="absolute -right-1 bg-pink-500 p-[6.5px] rounded-full"></span>
            <IoNotifications size={25}  style={{color: "rebeccapurple"}}/>
          </Link>
          <div className={styles.list_product_cart}>
            <b className="text-teal-500">Thông Báo</b>
            <hr className="pb-1"></hr>
            <hr className="pb-1"></hr>
            <Link href={"/shoppingCart"}>
              <div className="text-cyan-600 text-end">Xem Thông Báo</div>
            </Link>
          </div>
        </div>
        <div>
          {session?.admin ? (
            <div
              className="group flex items-center w-12 h-12 cursor-pointer relative"
              onClick={handleShowMenu}
            >
              <Image
                src={avaReview1}
                width={35}
                height={35}
                alt="avatar"
                className="object-cover rounded-full"
                priority={true}
              />

              <div className="hidden group-hover:block w-max absolute top-full shadow-lg rounded-2xl overflow-hidden py-2  bg-gray-100 text-black-100 -right-[28px]">
                {menuBtn.length > 0 &&
                  menuBtn.map((item, index) =>
                    item.url ? (
                      <Link
                        key={index}
                        href={item.url}
                        className="flex gap-2 hover:text-main-100 px-2 my-1 font-medium"
                      >
                        <item.Icon size={25} />
                        <span className="capitalize">{item.nameMenu}</span>
                      </Link>
                    ) : (
                      <button
                        key={index}
                        className="flex gap-2 hover:text-main-100 px-2 my-1 font-medium"
                        onClick={item.onClick}
                      >
                        <item.Icon size={25} />
                        <span className="capitalize">{item.nameMenu}</span>
                      </button>
                    ),
                  )}
              </div>
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
