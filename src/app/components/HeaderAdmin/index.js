"use client";
import Link from "next/link";
import { GoPerson } from "react-icons/go";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { avaReview1 } from "../../../../public/assets";
import { AiOutlineProfile } from "react-icons/ai";
import { IoLogOutOutline, IoNotifications } from "react-icons/io5";
import styles from "./input.module.css";
import axios from "axios";
import { api_get_ThongBaoAdmin } from "@/app/lib/api";

export default function HeaderAdmin() {
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const [notifications, setNotifications] = useState([]);
  const CountNewNotifi = notifications.filter(
    (notification) => notification.trang_thai_thong_bao == 0,
  ).length;

  const menuBtn = [
    { nameMenu: "profile", url: "/profile", Icon: AiOutlineProfile },
    { nameMenu: "sign out", Icon: IoLogOutOutline, onClick: () => signOut() },
  ];
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get(api_get_ThongBaoAdmin);
        if (response.data.status == true) {
          setNotifications(response.data.data);
        }
      } catch (error) {}
    };
    getNotifications();
  }, [session?.admin?.id]);

  useEffect(() => {
    if (session?.admin?.id) {
      Pusher.logToConsole = true;

      const pusher = new Pusher("186ee310c9ca72d2af51", {
        cluster: "ap1",
      });

      const channel = pusher.subscribe("adminnotifications");
      channel.bind("adminnotification", function (event) {
        if (event?.id_admin == 1) {
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
  }, [session?.admin?.id]);

  // useEffect(() => {
  //   if (session?.admin?.id) {
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

  //     socket.on("connect", () => {
  //       console.log("Connected to Socket.IO");
  //     });

  //     window.Echo.channel("adminnotifications").on("adminnotification", (event) => {
  //       if (event?.id_admin == 1) {
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
  // }, [session?.admin?.id]);

  return (
    <header className="relative flex items-center justify-end pr-[80px] shadow-md min-h-[48px]">
      <div className="flex items-center gap-3">
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
