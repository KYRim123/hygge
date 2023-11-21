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
import { AiOutlineProfile, AiOutlineShoppingCart } from "react-icons/ai";
import { IoClose, IoLogOutOutline, IoNotifications } from "react-icons/io5";
import styles from "./input.module.css";
import { useRouter } from "next/navigation";
import { MdOutlineRateReview } from "react-icons/md";
import { BiMessageRounded } from "react-icons/bi";
import Chatbox from "../chatbox";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { getDataCart } from "@/app/store/selector";
import { delItemCart } from "@/app/store/slide/cartSlide";
import axios from "axios";
import { api_post_UserThongBao } from "@/app/lib/api";

export default function Header() {
  const [showInput, setShowInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const header_cart = useSelector(getDataCart);
  const [notifications, setNotifications] = useState([]);
  const CountNewNotifi = notifications.filter(
    (notification) => notification.trang_thai_thong_bao == 0,
  ).length;
  const menuBtn = [
    { nameMenu: "profile", url: "/profile", Icon: AiOutlineProfile },
    { nameMenu: "my purchase", url: "/purchase", Icon: AiOutlineShoppingCart },
    { nameMenu: "chat hygee", Icon: BiMessageRounded, onClick: () => setShowChatBox(!showChatBox) },
    { nameMenu: "product reviews", url: "/product_reviews", Icon: MdOutlineRateReview },
    { nameMenu: "sign out", Icon: IoLogOutOutline, onClick: () => signOut() },
  ];

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

  const handleClickEditCart = () => {
    router.push("/shoppingCart");
  };
  const handleClickCheckout = () => {
    router.push("/checkout");
  };

  const RemoveItemCard = async (idItem) => {
    const idUser = session?.user?.id;
    dispatch(delItemCart({ idUser, idItem }));
  };

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.post(api_post_UserThongBao, {
          id: session?.user?.id,
        });
        if (response.data.status == true) {
          setNotifications(response.data.data);
        }
      } catch (error) {}
    };

    getNotifications();
  }, [session?.user?.id]);

  useEffect(() => {
    if (session?.user?.id) {
      Pusher.logToConsole = true;

      const pusher = new Pusher("186ee310c9ca72d2af51", {
        cluster: "ap1",
      });

      const channel = pusher.subscribe("notifications");
      channel.bind("notification", function (event) {
        if (event?.id_user == session?.user?.id) {
          setNotifications((prevNotifications) => {
            const isNotificationExists = prevNotifications.some((item) => item.id == event?.notification?.id);

            if (!isNotificationExists) {
              return [event?.notification, ...prevNotifications];
            } else {
              return prevNotifications;
            }
          });
        }
      });
    }
  }, [session?.user?.id]);

  // useEffect(() => {
  //   if (session?.user?.id) {
  //     const socket = io("https://xuantuyen1207.website:6001", {
  //       withCredentials: true,
  //       extraHeaders: {
  //         "X-Requested-With": "XMLHttpRequest",
  //       },
  //     });
  //     window.Echo = new Echo({
  //       broadcaster: "socket.io",
  //       host: "https://xuantuyen1207.website:6001",
  //       client: io,
  //     });

  //     window.Echo.channel("notifications").on("notification", (event) => {
  //       if (event?.id_user == session?.user?.id) {
  //         setNotifications((prevNotifications) => {
  //           const isNotificationExists = prevNotifications.some((item) => item.id == event?.notification?.id);

  //           if (!isNotificationExists) {
  //             return [event?.notification, ...prevNotifications];
  //           } else {
  //             return prevNotifications;
  //           }
  //         });
  //       }
  //     });
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }
  // }, [session?.user?.id]);
  return (
    <header className="relative flex items-center justify-between">
      {/* logo */}
      <LogoLink />
      {/* navbar */}
      {!showInput && <Navbar pathname={pathname} />}
      {/* button */}
      <div className="flex items-center gap-5">
        {/* search */}
        <div>
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
        {/* thong bao */}
        <div className={`${"cursor-pointer relative"} ${styles.icon_shopping_cart}`}>
          <div
            href={"/shoppingCart"}
            className={styles.link_shopping_cart}
          >
            <span
              className="absolute -right-1 bg-pink-500 rounded-full"
              style={{
                fontSize: "12px",
                width: "18px",
                height: "18px",
                color: "white",
                textAlign: "center",
                lineHeight: "18px",
              }}
            >
              {CountNewNotifi}
            </span>
            <IoNotifications size={25} />
          </div>
          <div className={styles.list_product_cart}>
            <div className={"flex flex-col gap-3 max-h-[250px] overflow-auto"}>
              {notifications?.length === 0 && (
                <h1 className="text-xl font-semibold text-center w-full">Notification is empty!</h1>
              )}
              {notifications?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center"
                >
                  <p style={item?.trang_thai_thong_bao == 0 ? { color: "blue" } : { color: "#ccc" }}>
                    {item?.thong_bao}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
            <div className={"flex flex-col gap-3"}>
              {header_cart?.length === 0 && (
                <h1 className="text-xl font-semibold text-center w-full">Cart is empty!</h1>
              )}
              {header_cart?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center"
                >
                  <div className="bg-gray-100 w-[80px] h-[80px] rounded-xl overflow-hidden flex items-center justify-center">
                    <Image
                      className="object-cover"
                      width={80}
                      height={80}
                      alt="img"
                      src={`${process.env.HTTPS_URL}/upload/${item?.san_pham?.hinh_anh[0]?.hinh_anh_san_pham}`}
                    />
                  </div>
                  <div className={"flex-grow pr-8"}>
                    <h1 className="font-semibold text-xl">{item?.san_pham?.ten_san_pham}</h1>
                    <span>{item?.san_pham?.gia} $</span>
                  </div>
                  <div
                    onClick={() => RemoveItemCard(item?.id)}
                    className="p-3 bg-gray-100 hover:bg-gray-300 rounded-full"
                  >
                    <IoClose />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <Button
                onClick={handleClickCheckout}
                className={"bg-main-100 text-white"}
              >
                Checkout
              </Button>
              <Button
                onClick={handleClickEditCart}
                className={"text-black border-[1px] border-gray-200"}
              >
                Edit cart
              </Button>
            </div>
          </div>
        </div>
        {/* account */}
        <div>
          {session ? (
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

              <div className="hidden group-hover:block w-max absolute top-full shadow-lg rounded-2xl overflow-hidden py-2  bg-gray-100 text-black-100">
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
      {showChatBox && (
        <div className="fixed bottom-0 right-0 z-10">
          <Chatbox showChatBox={() => setShowChatBox(!showChatBox)} />
        </div>
      )}
    </header>
  );
}
