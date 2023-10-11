"use client";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import style from "./category.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalAddCategory from "@/app/components/ModalAddCategory";
import ModalAddChildCategory from "@/app/components/ModalAddChildCategory";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import ModalEditCategory from "@/app/components/ModalEditCategory";
import ModalEditChildCategory from "@/app/components/ModalEditChildCategory";

export default function PageAdminCategory() {
  const [categories, set_categories] = useState([]);
  const [categories_children, set_categories_children] = useState([]);
  const [show_modal_add_category, set_show_modal_add_category] = useState(false);
  const [show_modal_add_category_child, set_show_modal_add_category_child] = useState(false);
  const [show_modal_edit_category, set_show_modal_edit_category] = useState(false);
  const [show_modal_edit_child_category, set_show_modal_edit_child_category] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response1 = await axios.get("http://xuantuyen1207.website/api/product-types/list");
        set_categories(response1.data.data);
  
        const response2 = await axios.get("http://xuantuyen1207.website/api/category-types/list");
        set_categories_children(response2.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data.");
      }
    };
  
    fetchData();
  }, []);
  
  const [title_children_category, set_title_children_category] = useState(
    categories[0]?.ten_dong_san_pham || "Child Category",
  );
  const [id_category, set_id_category] = useState(categories[0]?.id || 0);
  const [data_edit_category, set_data_edit_category] = useState({})
  const [data_edit_child_category, set_data_edit_child_category] = useState({})
  const chooseCategory = (item) => {
    set_id_category(item.id);
    set_title_children_category(item.ten_dong_san_pham);
  };

  const handleAddNewCategoryChild = async (name_new_category_child, id_dong_san_pham ,name) => {
    await axios
      .post("http://xuantuyen1207.website/api/category-types/create", {
        ten_loai_san_pham: name_new_category_child,
        id_dong_san_pham: id_dong_san_pham,
      })
      .then((res) => {
        if (res.data.status == true) {
          set_categories_children(res.data.data);
          if(name != '' && id_dong_san_pham != 0){
            set_id_category(id_dong_san_pham);
            set_title_children_category(name);
          }
          toast.success("ADD NEW SUCCESSFUL");
        } else {
          toast.error("ALREADY EXISTS");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API: ", error);
      });
  };

  const handleEditChildCategory = async (ten_loai_san_pham , id_dong_san_pham,name) => {
    await axios
      .post("http://xuantuyen1207.website/api/category-types/edit", { id : data_edit_child_category.id ,ten_loai_san_pham ,id_dong_san_pham})
      .then((response) => {
        if (response.data.status == true) {
          set_categories_children(response.data.data);
          if(name != '' && id_dong_san_pham != 0){
            set_id_category(id_dong_san_pham);
            set_title_children_category(name);
          }
          toast.success("EDIT SUCCESSFUL");
        } else {
          toast.error("EDIT ERROR");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API: ", error);
      });
  };

  const handleRemoveChildCategory = async (id) => {
    await axios
    .post("http://xuantuyen1207.website/api/category-types/destroy", {id})
    .then((response) => {
      if (response.data.status == true) {
        set_categories_children(response.data.data);
        toast.success("REMOVE SUCCESSFUL");
      } else {
        toast.error("REMOVE ERROR");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API: ", error);
    });
  };

  const handleAddNewCategory = async (ten_dong_san_pham) => {
    await axios
      .post("http://xuantuyen1207.website/api/product-types/create", { ten_dong_san_pham })
      .then((response) => {
        if (response.data.status == true) {
          set_categories(response.data.data);
          toast.success("ADD NEW SUCCESSFUL");
        } else {
          toast.error("ALREADY EXISTS");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API: ", error);
      });
  };

  const handleEditCategory = async (ten_dong_san_pham) => {
    await axios
      .post("http://xuantuyen1207.website/api/product-types/edit", { id : data_edit_category.id ,ten_dong_san_pham })
      .then((response) => {
        if (response.data.status == true) {
          set_categories(response.data.data);
          if(data_edit_category.id == id_category){
            set_title_children_category(ten_dong_san_pham);
          }
          toast.success("EDIT SUCCESSFUL");
        } else {
          toast.error("EDIT ERROR");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API: ", error);
      });
  };

  const handleRemoveCategory = async (id) => {
    await axios
      .post("http://xuantuyen1207.website/api/product-types/destroy", { id })
      .then((response) => {
        if (response.data.status == true) {
          set_categories(response.data.data);
          set_categories_children(response.data.data_child);
          set_title_children_category('Child Category');
          set_id_category(0);
          toast.success("REMOVE SUCCESSFUL");
        } else {
          toast.error("REMOVE ERROR");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API: ", error);
      });
  };
   return (
    <div className="px-1">
      {show_modal_add_category ? (
        <ModalAddCategory
          setShowModal={set_show_modal_add_category}
          handleAddNewCategory={handleAddNewCategory}
        ></ModalAddCategory>
      ) : (
        ""
      )}
      {show_modal_edit_category ? (
        <ModalEditCategory
          setShowModal={set_show_modal_edit_category}
          handleEditCategory={handleEditCategory}
          nameItem={data_edit_category?.ten_dong_san_pham}
        ></ModalEditCategory>
      ) : (
        ""
      )}

      {show_modal_add_category_child ? (
        <ModalAddChildCategory
          setShowModal={set_show_modal_add_category_child}
          handleAddNewCategoryChild={handleAddNewCategoryChild}
          categories={categories}
          idCategory={id_category}
          titleCategory={title_children_category}
        ></ModalAddChildCategory>
      ) : (
        ""
      )}

      {show_modal_edit_child_category ? (
        <ModalEditChildCategory
          setShowModal={set_show_modal_edit_child_category}
          handleEditCategoryChild={handleEditChildCategory}
          categories={categories}
          idCategory={id_category}
          titleCategory={title_children_category}
          nameItem={data_edit_child_category.ten_loai_san_pham}
        ></ModalEditChildCategory>
      ) : (
        ""
      )}

      <p className="font-bold text-base my-2">Category</p>
      <div className="relative border-t mt-4">
        <div className="absolute right-2/4 bottom-2/4 translate-x-2/4 translate-y-2/4 bg-white px-2"></div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 ml-1 mr-1">
        <div className="grid-cols-1 border divide-y rounded shadow-md ">
          <div className="relative flex">
            <div className="font-semibold px-3 py-2">Category</div>
            <AiOutlinePlusCircle
              className="w-6 h-6 absolute right-2 top-2 text-green-400 hover:text-green-600  cursor-pointer hover:scale-125"
              onClick={() => set_show_modal_add_category(true)}
            ></AiOutlinePlusCircle>
          </div>
          <div className={style.body_category}>
            {categories?.map((category) => (
              <div
                key={category.id}
                onClick={() => chooseCategory(category)}
                className={`flex relative w-full items-center px-3 cursor-pointer hover:bg-blue-50 ${
                  title_children_category === category.ten_dong_san_pham ? "bg-blue-100" : ""
                } `}
              >
                <span className={style.open_icon}>{category.ten_dong_san_pham}</span>
                <div
                  className={`${"absolute right-20 to-3 w-5 h-5 hover:text-blue-600  cursor-pointer text-blue-400"} ${
                    style.icon_edit
                  }`}
                >
                  <BiEdit
                    className={`${"absolute right-12 to-3 w-5 h-5 hover:text-blue-600  cursor-pointer text-blue-400"}`}
                    onClick={() => {set_show_modal_edit_category(true);set_data_edit_category({id:category.id,ten_dong_san_pham:category.ten_dong_san_pham})}}
                  ></BiEdit>
                  <AiOutlineCloseCircle
                    className={`${"absolute right-5 to-3 w-5 h-5 hover:text-red-600  cursor-pointer text-red-400"}`}
                    onClick={() => {
                      handleRemoveCategory(category.id);
                    }}
                  ></AiOutlineCloseCircle>
                </div>
                <div className="absolute right-2 to-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5  hover:text-blue-400  cursor-pointer hover:scale-125"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid-cols-1 border divide-y rounded shadow-md">
          <div className="relative flex">
            <div className="font-semibold px-3 py-2">{title_children_category}</div>
            <AiOutlinePlusCircle
              className="w-6 h-6 absolute right-2 top-2 text-green-400 hover:text-green-600  cursor-pointer hover:scale-125"
              onClick={() => set_show_modal_add_category_child(true)}
            ></AiOutlinePlusCircle>
          </div>
          <div className={style.body_category}>
            {categories_children
              .filter((category) => category.id_dong_san_pham == id_category)
              .map((category) => (
                <div
                  key={category.id}
                  className="flex relative w-full items-center px-3 hover:bg-blue-50"
                >
                  <span className={style.open_icon}>{category.ten_loai_san_pham}</span>
                <div
                  className={`${"absolute right-20 to-3 w-5 h-5 hover:text-blue-600  cursor-pointer text-blue-400"} ${
                    style.icon_edit
                  }`}
                >
                  <BiEdit
                    className={`${"absolute right-12 to-3 w-5 h-5 hover:text-blue-600  cursor-pointer text-blue-400"}`}
                    onClick={() => {set_show_modal_edit_child_category(true);set_data_edit_child_category({id:category.id,ten_loai_san_pham:category.ten_loai_san_pham})}}
                  ></BiEdit>
                  <AiOutlineCloseCircle
                    className={`${"absolute right-5 to-3 w-5 h-5 hover:text-red-600  cursor-pointer text-red-400"}`}
                    onClick={() => {
                      handleRemoveChildCategory(category.id);
                    }}
                  ></AiOutlineCloseCircle>
                </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
