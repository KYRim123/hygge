"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { avaReview1 } from "../../../public/assets";
import axios from "axios";
import { api_get_Check, api_get_ChamCong } from "@/app/lib/api";
import { useSession } from "next-auth/react";

const day = new Date();
const year = day.getFullYear();
const month = (day.getMonth() + 1).toString().padStart(2, "0");
const date = day.getDate().toString().padStart(2, "0");
const thang_nam = year + "/" + month;

export default function Home() {
  const [days, set_days] = useState([]);
  const { data: session } = useSession();
  const fetchDate = async () => {
    await axios
      .post(api_get_Check, { id: session?.admin?.id, month: thang_nam })
      .then((res) => {
        if (res.data?.status == true) {
          set_days(res?.data?.data?.cham_cong);
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (session?.admin?.id) {
      fetchDate();
    }
  }, [session?.admin?.id]);
  const handleOnClickChamCong = async () => {
    await axios
      .post(api_get_ChamCong, { id: session?.admin?.id, month: thang_nam, day: date })
      .then((res) => {
        if (res.data?.status == true) {
          fetchDate();
        }
      })
      .catch((err) => {});
  };
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="capitalize">Hey, {session?.admin?.name}</div>
        <div className="w-[50px] h-[50px] ">
          <Image
            src={avaReview1}
            width={100}
            height={100}
            className="object-cover"
            alt="aa"
          />
        </div>
      </div>
      <div className="mt-[120px] align-middle w-full grid items-center">
        {days && days.includes(date * 1) ? (
          <>
            {" "}
            <div className="mb-[30px] mx-auto">
              Ngày : {date} Tháng : {month} Năm : {year}
            </div>
            <div className="mx-auto mt-[40px] rounded px-[16px] py-[8px] bg-[#ccc] text-[#00cc98] cursor-pointer w-[200px] text-center">
              Đã Chấm Công
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="mb-[30px] mx-auto">
              Ngày : {date} Tháng : {month} Năm : {year}
            </div>
            <div
              className="mx-auto mt-[40px] rounded px-[16px] py-[8px] bg-[#00cc98] text-white cursor-pointer w-[200px] text-center"
              onClick={handleOnClickChamCong}
            >
              Chấm Công
            </div>
          </>
        )}
      </div>
    </div>
  );
}
