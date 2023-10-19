"use client";
import style from "./index.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

export default function StatusBill() {
  const [data, set_data] = useState();
  console.log(data);
  const PARAMS = useParams().id;
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://xuantuyen1207.website/api/hoa-don/trang-thai/" + PARAMS)
        .then((res) => {
          if (res.data.status == true) {
            set_data(res.data.data);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    };
    if (PARAMS != null) {
      fetchData();
    }
  }, [PARAMS]);

  return <div>111111</div>;
}
