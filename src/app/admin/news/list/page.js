"use client";
import style from "./index.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api_get_listNews, api_post_deleteNews } from "@/app/lib/api";

export default function EditNew() {
  const [data, set_data] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api_get_listNews);
        if (response.data.status == true) {
          set_data(response.data.data);
        }
      } catch (error) {
        toast.error("An error occurred while fetching data.");
      }
    };
    fetchData();
  }, []);

  const handleRemoveNews = async (id) => {
    axios.post(api_post_deleteNews, { id: id }).then((res) => {
      if (res?.data?.status == true) {
        set_data(res?.data?.data);
        toast.success("Removed News Success");
      } else {
        toast.error("Removed News Error");
      }
    });
  };
  return (
    <div className="px-6">
      {data?.map((item, index) => (
        <div
          key={index}
          className="my-5 flex relative"
        >
          <Image
            className="w-[500px] h-[180px]"
            width={1000}
            height={400}
            alt="aa"
            src={`${process.env.HTTPS_URL}/upload/${item?.anh_tin_tuc}`}
          />
          <div className={style.title}>
            <div>{item?.tieu_de_1}</div>
            <div>{item?.tieu_de_2}</div>
          </div>
          <div className={style.body_button}>
            <Link href={`/admin/news/edit/${item?.id}`}>
              <div className={style.button_new}>Edit</div>
            </Link>
            <div
              className={style.button_new}
              onClick={() => handleRemoveNews(item?.id)}
            >
              Remove
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
