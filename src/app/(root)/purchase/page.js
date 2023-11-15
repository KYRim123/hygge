"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import style from "./index.module.css";
import Link from "next/link";

const Purchase = () => {
  const tabAll = 0;
  const [crTab, setCrTab] = useState(tabAll);
  const tabs = [
    { id: 0, nameTab: "all", status: [0] },
    { id: 1, nameTab: "Prepare orders", status: [1, 2, 3, 4] },
    { id: 2, nameTab: "Being transported", status: [5] },
    { id: 3, nameTab: "Shipping", status: [6] },
    { id: 4, nameTab: "Delivered", status: [7] },
    { id: 5, nameTab: "return/refund", status: [8, 9, 10, 11, 12] },
  ];
  const { data: session } = useSession();
  const [data, set_data] = useState([]);
  const handleClickTab = (index) => {
    setCrTab(index);
  };
  useEffect(() => {
    if (session?.user?.id != null) {
      const fetchData = async () => {
        await axios
          .post(`${process.env.HTTPS_URL}/api/hoa-don/list-hoa-don`, { id: session?.user?.id })
          .then((res) => {
            if (res.data.status == true) {
              set_data(res.data.data);
            } else {
            }
          })
          .catch((err) => {});
      };

      fetchData();
    }
  }, [session?.user?.id]);

  return (
    <div>
      <div className="flex items-center justify-between">
        {tabs.length > 0 &&
          tabs.map((tab, index) => (
            <div
              key={index}
              className={`flex-grow text-center capitalize text-lg cursor-pointer border-b-[2px] transition-all ${
                tab.id === crTab ? "text-main-100 border-main-100 " : "border-gray-100"
              }`}
              onClick={() => handleClickTab(tab.id)}
            >
              <span className="py-2 block">{tab.nameTab}</span>
            </div>
          ))}
      </div>
      <div className=" mt-2 h-[500px]">
        <div className="h-full overflow-y-scroll">
          <div>
            {data
              ?.filter((item) => (crTab == 0 ? true : tabs[crTab].status.includes(item.id_trang_thai)))
              .map((item_child, index) => (
                <div
                  key={index}
                  className={style.body_order}
                >
                  <div className="text-teal-400">Code Orders : {item_child.id}</div>

                  <div className="ml-10">
                    {item_child?.chi_tiet_hoa_don?.map((item_chi_tiet, key_chi_tiet) => (
                      <div
                        key={key_chi_tiet}
                        className="flex"
                      >
                        <Image
                          src={`${process.env.HTTPS_URL}/upload/${item_chi_tiet?.san_pham?.hinh_anh[0]?.hinh_anh_san_pham}`}
                          width={50}
                          height={50}
                          alt="imageSlide"
                          style={{ objectFit: "cover" }}
                          priority={true}
                        />
                        <div className="flex items-center">
                          <div className="ml-10">Name Item : {item_chi_tiet?.san_pham?.ten_san_pham}</div>
                          <div className="ml-10">Quantity : {item_chi_tiet?.so_luong}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href={`/bill/status/${item_child.id}`}>
                    <div className="ml-10 underline text-teal-400">View Status</div>
                  </Link>
                  <Link href={`/invoice/${item_child.id}`}>
                    <div className="ml-10 underline text-teal-400">View Invoice</div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
