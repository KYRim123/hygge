"use client";
import React, { useEffect, useState } from "react";
import { api_get_news } from "@/app/lib/api";
import axios from "axios";
import { useParams } from "next/navigation";
import DisplayHTMLString from "@/app/components/hook/displayhtmlstring";

export default function NewsPage() {
  const [data, setData] = useState();
  const idNews = useParams();

  useEffect(() => {
    axios
      .get(`${api_get_news}${idNews.id}`)
      .then((res) => setData(res?.data?.data))
      .catch((err) => err);
  }, [idNews?.id]);

  return (
    <div className="text-center flex flex-col gap-2">
      <h1 className="title-1">{data?.tieu_de_1}</h1>
      <h1 className="title-1">{data?.tieu_de_2}</h1>
      <DisplayHTMLString htmlString={data?.tin_tuc} />
    </div>
  );
}
