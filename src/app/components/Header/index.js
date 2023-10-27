"use client";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { usePathname } from "next/navigation";
import LogoLink from "../LogoLink";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { avaReview1 } from "../../../../public/assets";
import { AiOutlineProfile } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import styles from "./input.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Header() {
  const [showInput, setShowInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [header_cart, set_header_cart] = useState();

  useEffect(() => {
    if (session?.user?.id != null) {
      const fetchData = async () => {
        await axios
          .post(`${process.env.HTTPS_URL}/api/cart/my-cart`, { id: session?.user?.id })
          .then((res) => {
            if (res.data.status == true) {
              set_header_cart(res.data.data?.chi_tiet_gio_hang);
            } else {
            }
          });
      };
      fetchData();
    }
  }, [session?.user?.id]);

 
  const handleShowInput = () => {
    setShowInput(!showInput);
  };
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickSearch = () => {
    if (inputSearch !== "") {
      localStorage.setItem("search", inputSearch);
      router.push("/search");
      router.refresh();
    } else {
      setShowInput(!showInput);
    }
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
                onClick={handleClickSearch}
              />
              <input
                type="text"
                placeholder="Search your products"
                className="outline-none"
                onChange={(e) => setInputSearch(e.target.value)}
              />
            </div>
          )}
        </div>
        {/* cart */}
        <div className={`${"cursor-pointer relative"} ${styles.icon_shopping_cart}`}>
          <Link
            href={"/shoppingCart"}
            className={styles.link_shopping_cart}
          >
            <span className="absolute -right-1 bg-pink-500 p-[6.5px] rounded-full"></span>
            <LuShoppingCart size={25} />
          </Link>
          <div className={styles.list_product_cart}>
            <b className="text-teal-500">Giỏ Hàng Của Bạn</b>
            <hr className="pb-1"></hr>
            <div className={styles.body_cart_header}>
              {header_cart?.map((item, index) => (
                <div
                  key={index}
                  className="pt-1 flex "
                >
                  <Image
                    className="object-cover mr-1 rounded-[4px]"
                    width={20}
                    height={20}
                    alt="img"
                    src={`${process.env.HTTPS_URL}/upload/${item.san_pham.hinh_anh.hinh_anh_san_pham}`}
                  />
                  <div className={styles.text_inline}>{item.san_pham.ten_san_pham}</div>
                </div>
              ))}
            </div>
            <hr className="pb-1"></hr>
            <Link href={"/shoppingCart"}>
              <div className="text-cyan-600 text-end">Xem Giỏ Hàng</div>
            </Link>
          </div>
        </div>
        {/* account */}
        <div>
          {session ? (
            <div
              className="flex items-center w-12 h-12 cursor-pointer relative"
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
