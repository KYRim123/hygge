"use client";
import style from "./index.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Editor from "@/app/components/hook/Editor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api_get_editNews, api_post_updateNews } from "@/app/lib/api";
import { useParams } from "next/navigation";

export default function EditNew() {
  const [first_title, set_first_title] = useState("");
  const [last_title, set_last_title] = useState("");
  const [description, set_description] = useState("");
  const [news, set_news] = useState("");
  const [image_news, set_image_news] = useState();
  const [image_pre, set_image_pre] = useState("");
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [validate, set_validate] = useState(false);
  const router = useRouter();
  const PARAMS = useParams().id;

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api_get_editNews}${PARAMS}`);
        if (response.data.status == true) {
          const news = response.data.data;
          set_first_title(news?.tieu_de_1);
          set_last_title(news?.tieu_de_2);
          set_description(news?.mo_ta);
          set_image_pre(news?.anh_tin_tuc);
          set_news(news?.tin_tuc);
        } else {
          toast.error("An error occurred while fetching data.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching data.");
      }
    };
    fetchData();
  }, [PARAMS]);

  const dataPost = {
    id: PARAMS,
    first_title: first_title,
    last_title: last_title,
    description: description,
    image: image_news,
    news: news,
  };

  const type_img = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/gif",
    "image/tif",
    "image/bmp",
    "image/ico",
    "image/psd",
    "image/WebP",
    "image/jpg",
  ];

  const chooseImage = (e) => {
    const files = e.target.files[0];
    set_image_news(files);
    set_image_pre("");
  };

  const link_img = (file) => {
    if (file) {
      const path = URL.createObjectURL(file);
      return path;
    }
  };

  const handleClickEdit = async () => {
    try {
      if (first_title == "" || last_title == "" || description == "" || news == "") {
        set_validate(true);
        return;
      }
      set_validate(false);
      const response = await axios.post(api_post_updateNews, dataPost, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status == true) {
        toast.success("Update successfully");
        router.push("/admin/news/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu: ", error);
    }
  };

  return (
    <div className="px-6">
      <div className={style.body_create_product}>
        <div className="grid md:grid-cols-2 md:gap-4">
          <div>
            <label
              htmlFor="first_title"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              First Title
            </label>
            <input
              id="first_title"
              type="text"
              className={style.input_create}
              value={first_title}
              onChange={(e) => set_first_title(e.target.value)}
            />
            {validate && first_title == "" && <p style={{ color: "red" }}>* Please Input First Title</p>}
          </div>
          <div>
            <label
              htmlFor="second_title"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Last Title
            </label>
            <input
              id="last_title"
              type="text"
              className={style.input_create}
              value={last_title}
              onChange={(e) => set_last_title(e.target.value)}
            />
            {validate && last_title == "" && <p style={{ color: "red" }}>* Please Input Last Title</p>}
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="description"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              className={style.input_create}
              value={description}
              onChange={(e) => set_description(e.target.value)}
            />
            {validate && description == "" && <p style={{ color: "red" }}>* Please Input Description</p>}
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="image_news"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
              id="image_news"
              type="file"
              className={style.input_create}
              onChange={chooseImage}
            />
            <div className={style.list_img}>
              {(image_news || image_pre != "") && (
                <div className={style.img_body_list}>
                  <Image
                    className={style.image_news}
                    width={750}
                    height={270}
                    src={
                      image_pre != "" ? `${process.env.HTTPS_URL}/upload/${image_pre}` : link_img(image_news)
                    }
                    alt="aa"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="description"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              News
            </label>
            <Editor
              name="description"
              value={news}
              onChange={(data) => {
                set_news(data);
              }}
              editorLoaded={editorLoaded}
            />
            {validate && news == "" && <p style={{ color: "red" }}>* Please Input News</p>}
          </div>
        </div>
      </div>
      <div className={style.footer_btn}>
        <Link href={"/admin/news/list"}>
          <div className={style.btn_close}>Close</div>
        </Link>
        <div
          className={style.btn_save}
          onClick={handleClickEdit}
        >
          Update
        </div>
      </div>
    </div>
  );
}
