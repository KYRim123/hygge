"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// icons
import { BiSolidDashboard, BiSitemap, BiSolidCategory, BiLogOut } from "react-icons/bi";
import { BsFillInboxFill, BsFillFilePersonFill, BsFillPersonFill } from "react-icons/bs";
import { RiBillLine, RiAdminFill } from "react-icons/ri";
import { GiNotebook } from "react-icons/gi";
import { AiFillMessage } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";
import { PiNewspaperFill } from "react-icons/pi";
import { iconLogo } from "../../../public/assets";

const Sidebar = () => {
  const pathname = usePathname();
  const listSideBar = [
    { name: "Bảng điều khiển", link: "/admin", Icon: BiSolidDashboard },
    { name: "QL danh mục sản phẩm", link: "/admin/category", Icon: BiSolidCategory },
    { name: "QL sản phẩm", link: "/admin/products/list", Icon: BiSitemap },
    { name: "QL hóa đơn", link: "/admin/bill/list", Icon: RiBillLine },
    { name: "QL nhân viên", link: "/admin/staffs", Icon: BsFillFilePersonFill },
    { name: "QL chức vụ và quyền hạn", link: "/admin/abc", Icon: RiAdminFill },
    { name: "QL kho", link: "/admin/kho", Icon: BsFillInboxFill },
    { name: "QL người dùng", link: "/admin/user/list", Icon: BsFillPersonFill },
    { name: "thống kê", link: "/admin/thongke", Icon: GiNotebook },
    { name: "tin nhắn", link: "/admin/message", Icon: AiFillMessage },
    { name: "bảng lương", link: "/admin/luong", Icon: FaMoneyCheck },
    { name: "tin tức", link: "/admin/news", Icon: PiNewspaperFill },
    { name: "thoát", link: "/admin/signOut", Icon: BiLogOut },
  ];

  return (
    <div className="bg-white rounded-2xl flex-shrink py-3 shadow-md">
      <div className="mb-6 px-3">
        <Image
          src={iconLogo}
          width={130}
          height={300}
          className="object-cover"
          alt="aa"
        />
      </div>
      <div className="flex gap-3 flex-col">
        {listSideBar?.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={`flex gap-2 items-center capitalize px-3 py-2  text-xl ${
              pathname == item.link
                ? "text-main-100 font-semibold bg-slate-300 border-l-4 border-main-100"
                : ""
            }`}
          >
            <item.Icon />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
