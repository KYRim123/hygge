"use client";
import style from "./index.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@/app/ckeditor-custom.css'

export default function CreateProduct() {
  const [name_product, set_name_product] = useState("");
  const [price_product, set_price_product] = useState(null);
  const [id_category_product, set_id_category_product] = useState(null);
  const [short_description, set_short_description] = useState("");
  const [description, set_description] = useState("");
  const [sale, set_sale] = useState(null);
  const [image_product, set_image_product] = useState([]);
  const [list_category, set_list_category] = useState([]);

  const dataPost = {
    name : name_product,
    price : price_product,
    sale : sale,
    short_description : short_description,
    description : description,
    id_category : id_category_product,
    image : image_product
  }

  const type_img = [
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/gif',
    'image/tif',
    'image/bmp',
    'image/ico',
    'image/psd',
    'image/WebP',
    'image/jpg'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://xuantuyen1207.website/api/category-types/list");
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
      toast.error('Error: Some files are not in the allowed format.');
    }
  };

  const link_img = (file) => {
    if (file) {
      const path = URL.createObjectURL(file);
      return path;
    }
  };

  const handleCKEditorChange = (event, editor) => {
    const data = editor.getData();
    set_description(data);
  };

  const handleSelectCategory = (id, name) => {
    set_id_category_product(id);
  };

  const handleClickClose = () => {

  }

  const handleClickAddNew = async () => {
    console.log(dataPost);
  }

  return (
    <div className="px-6">
      <div className={style.body_create_product}>
        <div>
          <div>
            <label
              for="name_product"
              class="block mt-2 text-base font-medium text-gray-900 dark:text-white"
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
              for="price_product"
              class="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              id="price_product"
              inputmode="numeric"
              type="number"
              className={style.input_create}
              value={price_product}
              onChange={(e) => set_price_product(e.target.value)}
            />
          </div>
          <div>
            <label
              for="sale"
              class="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Sale
            </label>
            <input
              id="sale"
              inputmode="numeric"
              type="number"
              className={style.input_create}
              value={sale}
              onChange={(e) => set_sale(e.target.value)}
            />
          </div>
          <div>
            <label
              for="id_category_product"
              class="block mt-2 text-base font-medium text-gray-900 dark:text-white"
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
              for="short_description"
              class="block mt-2 text-base font-medium text-gray-900 dark:text-white"
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
              for="image_product"
              class="block mt-2 text-base font-medium text-gray-900 dark:text-white"
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
            {image_product.map((item, index) => (
              <div className={style.img_body_list} key={index}>
                <p className={style.img_name}>{item.name}</p>
                <img className={style.image_product} src={link_img(item)} />
                <AiOutlineCloseCircle
                    className={`${"absolute right-0 top-6 w-7 h-7 hover:text-red-600  cursor-pointer text-red-400"} ${style.icon_remove_img}`}  
                  ></AiOutlineCloseCircle>
              </div>
            ))}
            </div>
          </div>
        </div>
        <div>
          <div>
            <label
              for="description"
              class="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={handleCKEditorChange}
            />
          </div>
        </div>
      </div>
      <div className={style.footer_btn}>
              <div
                className={style.btn_close}
                onClick={handleClickClose}
              >
                Close
              </div>
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