"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// icons
import { BiSolidDashboard, BiSitemap, BiSolidCategory, BiLogOut } from "react-icons/bi";
import { BsFillInboxFill, BsFillFilePersonFill, BsFillPersonFill, BsQuestionDiamond } from "react-icons/bs";
import { RiBillLine, RiAdminFill } from "react-icons/ri";
import { GiNotebook } from "react-icons/gi";
import { AiFillMessage } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";
import { PiNewspaperFill } from "react-icons/pi";
import { iconLogo } from "../../../public/assets";
import { Fragment, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";

const Sidebar = () => {
  const pathname = usePathname();
  const listSideBar = [
    { name: "Bảng điều khiển", link: "/admin", Icon: BiSolidDashboard },
    { name: "Quản lý danh mục", link: "/admin/category", Icon: BiSolidCategory },
    {
      name: "Quản lý sản phẩm",
      link: "/admin/products/list",
      Icon: BiSitemap,
      child: [{ name: "Tạo Mới Sản Phẩm", link: "/admin/products/create", Icon: GrFormNextLink }],
    },
    { name: "Quản lý hóa đơn", link: "/admin/bill/list", Icon: RiBillLine },
    {
      name: "Quản lý nhân viên",
      link: "/admin/staff/list",
      Icon: BsFillFilePersonFill,
      child: [{ name: "Thêm Nhân Viên", link: "/admin/staff/create", Icon: GrFormNextLink }],
    },
    { name: "Quản lý chức vụ", link: "/admin/position", Icon: RiAdminFill },
    {
      name: "Quản lý kho",
      link: "/admin/warehouse/list",
      Icon: BsFillInboxFill,
      child: [
        { name: "Quản lý nhập kho", link: "/admin/warehouse/warehouse", Icon: GrFormNextLink },
        { name: "Nhập kho", link: "/admin/warehouse/create", Icon: GrFormNextLink },
      ],
    },
    { name: "Quản lý người dùng", link: "/admin/user/list", Icon: BsFillPersonFill },
    { name: "Thống kê", link: "/admin/thongke/list", Icon: GiNotebook },
    { name: "Tin nhắn", link: "/admin/chat", Icon: AiFillMessage },
    { name: "Bảng lương", link: "/admin/salary/list", Icon: FaMoneyCheck },
    { name: "Quản lý FAQ", link: "/admin/faq", Icon: BsQuestionDiamond },
    {
      name: "Tin tức",
      link: "/admin/news/list",
      Icon: PiNewspaperFill,
      child: [
        { name: "Thêm Tin Tức", link: "/admin/news/create", Icon: GrFormNextLink },
      ],
    },
    { name: "Thoát", link: "/admin/signOut", Icon: BiLogOut },
  ];
  const [is_show, set_is_show] = useState(false);
  const handleMouseEnter = () => {
    set_is_show(true);
  };

  const handleMouseLeave = () => {
    set_is_show(false);
  };

  return (
    <div
      className={`"bg-[#a9f7ebad] flex-shrink py-3 shadow-emerald-500 transition-width duration-500 ease-in-out ${
        is_show ? "w-[420px]" : "w-[100px]"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
          <Fragment key={index}>
            <Link
              href={item.link}
              className={`flex gap-2 items-center capitalize px-3 py-2 text-lg ${
                pathname == item.link
                  ? "text-main-100 font-semibold bg-slate-300 border-l-4 border-main-100"
                  : ""
              }`}
            >
              <item.Icon style={!is_show && { margin: "auto" }} />
              {is_show && <span className="hover:text-[#00cc98]">{item.name}</span>}
            </Link>
            <div>
              {is_show &&
                item?.child?.map((item_child, index_child) => (
                  <Link
                    key={index_child}
                    href={item_child.link}
                    className="ml-4 flex"
                  >
                    <item_child.Icon style={{ marginTop: "auto", marginBottom: "auto" }} />
                    <span className="hover:text-[#00cc98] pl-1">{item_child.name}</span>
                  </Link>
                ))}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
