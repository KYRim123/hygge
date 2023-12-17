"use client";
import style from "./index.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api_get_Category, api_post_ProductCreate } from "@/app/lib/api";
import Editor from "@/app/components/EditorQuill/Editor";

export default function CreateProduct() {
  const [name_product, set_name_product] = useState("");
  const [price_product, set_price_product] = useState("");
  const [id_category_product, set_id_category_product] = useState("");
  const [short_description, set_short_description] = useState("");
  const [description, set_description] = useState("");
  const [sale, set_sale] = useState("");
  const [image_product, set_image_product] = useState([]);
  const [list_category, set_list_category] = useState([]);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const dataPost = {
    name: name_product,
    price: price_product,
    sale: sale,
    short_description: short_description,
    description: description,
    id_category: id_category_product,
    image: image_product,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api_get_Category);
        const originalData = response.data.data;

        const transformedData = originalData.map((item) => ({
          id: item.id,
          name: item.ten_loai_san_pham,
        }));

        set_list_category(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data.");
      }
    };
    fetchData();
  }, []);
  const chooseImage = (e) => {
    const files = Array.from(e.target.files);
    const areAllImages = files.every((file) => {
      return type_img.includes(file.type);
    });
    if (areAllImages) {
      set_image_product([...image_product, ...files]);
    } else {
      toast.error("Error: Some files are not in the allowed format.");
    }
  };

  const link_img = (file) => {
    if (file) {
      const path = URL.createObjectURL(file);
      return path;
    }
  };

  const handleSelectCategory = (id, name) => {
    set_id_category_product(id);
  };

  const handleRemoveImg = (index) => {
    const new_image_product = [...image_product];
    new_image_product.splice(index, 1);
    set_image_product(new_image_product);
  };

  const handleClickAddNew = async () => {
    try {
      const response = await axios.post(api_post_ProductCreate, dataPost, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status == true) {
        router.push("/admin/products/list");
      } else {
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu: ", error);
    }
  };

  return (
    <div className="px-6">
      <div className={style.body_create_product}>
        <div>
          <div>
            <label
              htmlFor="name_product"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Name Product
            </label>
            <input
              id="name_product"
              type="text"
              className={style.input_create}
              value={name_product}
              onChange={(e) => set_name_product(e.target.value)}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-4">
          <div>
            <label
              htmlFor="price_product"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              id="price_product"
              type="number"
              className={style.input_create}
              value={price_product}
              onChange={(e) => set_price_product(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="sale"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Sale
            </label>
            <input
              id="sale"
              type="number"
              className={style.input_create}
              value={sale}
              onChange={(e) => set_sale(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="id_category_product"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <SelectDropdownAdmin
              items={list_category}
              title_select=""
              handleSelect={handleSelectCategory}
            ></SelectDropdownAdmin>
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="short_description"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Short Description
            </label>
            <textarea
              id="short_description"
              rows="3"
              className={style.input_create}
              value={short_description}
              onChange={(e) => set_short_description(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="image_product"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
              id="image_product"
              type="file"
              className={style.input_create}
              onChange={chooseImage}
            />
            <div className={style.list_img}>
              {image_product?.map((item, index) => (
                <div
                  className={style.img_body_list}
                  key={index}
                >
                  <p className={style.img_name}>{item.name}</p>
                  <Image
                    className={style.image_product}
                    width={300}
                    height={250}
                    src={link_img(item)}
                    alt="aa"
                  />
                  <AiOutlineCloseCircle
                    className={`${"absolute right-0 top-6 w-7 h-7 hover:text-red-600  cursor-pointer text-red-400"} ${
                      style.icon_remove_img
                    }`}
                    onClick={() => handleRemoveImg(index)}
                  ></AiOutlineCloseCircle>
                </div>
              ))}
            </div>
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
            <Editor
              value={description}
              onChange={(data) => {
                set_description(data);
              }}
            />
          </div>
        </div>
      </div>
      <div className={style.footer_btn}>
        <Link href={"/admin/products/list"}>
          <div className={style.btn_close}>Close</div>
        </Link>
        <div
          className={style.btn_save}
          onClick={handleClickAddNew}
        >
          Add New
        </div>
      </div>
    </div>
  );
}
