"use client";
import style from "./index.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Editor from "@/app/components/hook/Editor";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { api_get_Category, api_get_ProductEdit, api_post_ProductUpdate } from "@/app/lib/api";

export default function EditProduct() {
  const [name_product, set_name_product] = useState("");
  const [price_product, set_price_product] = useState(null);
  const [id_category_product, set_id_category_product] = useState(null);
  const [short_description, set_short_description] = useState("");
  const [description, set_description] = useState("");
  const [sale, set_sale] = useState(null);
  const [image_product, set_image_product] = useState([]);
  const [list_category, set_list_category] = useState([]);
  const [list_delete_img, set_list_delete_img] = useState([]);
  const [list_image_api, set_list_image_api] = useState([]);
  const [selected_category, set_selected_category] = useState("");
  const [editorLoaded, setEditorLoaded] = useState(false);

  const PARAMS = useParams().id;

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api_get_ProductEdit}${PARAMS}/edit`);
        if (response.data.status == true) {
          const product = response.data.data;
          set_name_product(product.ten_san_pham);
          set_price_product(product.gia);
          set_id_category_product(product.id_loai_san_pham);
          set_short_description(product.mo_ta_ngan);
          set_description(product.mo_ta);
          set_sale(product.khuyen_mai);
          set_selected_category(response.data.category.ten_loai_san_pham);
          set_list_image_api(response.data.img);
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
    id_product: PARAMS,
    name: name_product,
    price: price_product,
    sale: sale,
    short_description: short_description,
    description: description,
    id_category: id_category_product,
    image: image_product,
    del_img: list_delete_img,
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

  const handleRemoveImgApi = (index) => {
    const new_list_image_api = [...list_image_api];
    new_list_image_api.splice(index, 1);
    set_list_image_api(new_list_image_api);
  };

  const handleDeleteImg = (id) => {
    const new_list_delete_img = [...list_delete_img];
    new_list_delete_img.push(id);
    set_list_delete_img(new_list_delete_img);
  };

  const handleClickEdit = async () => {
    try {
      const response = await axios.post(api_post_ProductUpdate, dataPost, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status == true) {
        toast.success("Successfully");
      } else {
        toast.error("Error");
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
              selectedItemProp={selected_category}
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
              {list_image_api.map((item, index) => (
                <div
                  className={style.img_body_list}
                  key={index}
                >
                  <p className={style.img_name}>{item.hinh_anh_san_pham}</p>
                  <Image
                    className={style.image_product}
                    src={`${process.env.HTTPS_URL}/upload/${item.hinh_anh_san_pham}`}
                    alt="â"
                    width={300}
                    height={250}
                  />
                  <AiOutlineCloseCircle
                    className={`${"absolute right-0 top-6 w-7 h-7 hover:text-red-600  cursor-pointer text-red-400"} ${
                      style.icon_remove_img
                    }`}
                    onClick={() => {
                      handleRemoveImgApi(index);
                      handleDeleteImg(item.id);
                    }}
                  ></AiOutlineCloseCircle>{" "}
                </div>
              ))}
              {image_product.map((item, index) => (
                <div
                  className={style.img_body_list}
                  key={index}
                >
                  <p className={style.img_name}>{item.name}</p>
                  <Image
                    className={style.image_product}
                    src={link_img(item)}
                    alt="â"
                    width={300}
                    height={300}
                  />
                  <AiOutlineCloseCircle
                    className={`${"absolute right-0 top-6 w-7 h-7 hover:text-red-600  cursor-pointer text-red-400"} ${
                      style.icon_remove_img
                    }`}
                    onClick={() => handleRemoveImg(index)}
                  ></AiOutlineCloseCircle>{" "}
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
              name="description"
              value={description}
              onChange={(data) => {
                set_description(data);
              }}
              editorLoaded={editorLoaded}
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
          onClick={handleClickEdit}
        >
          Save
        </div>
      </div>
    </div>
  );
}
